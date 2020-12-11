import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  GetParticipantsGQL,
  ReloadParticipantByIdGQL,
  ReloadParticipantByIdQueryVariables,
  UpdateParticipantGQL,
  UpdateParticipantMutationVariables,
  LockParticipantGQL,
  LockParticipantMutationVariables,
  UnlockParticipantGQL,
  UnlockParticipantMutationVariables,
  CreateParticipantGQL,
  CreateParticipantMutationVariables,
  DeleteParticipantGQL,
  DeleteParticipantMutationVariables,
  GetParticipantByIdGQL,
  GetParticipantByIdQueryVariables,
} from '../../generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ParticipantsService {
  /** Participants Array */
  tableData: BehaviorSubject<any[]> = new BehaviorSubject(null);
  loadingRowIds: BehaviorSubject<string[]> = new BehaviorSubject([]);
  successfullyCreatedRowWithId: Subject<string> = new Subject();
  pageData: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoadingPageData: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private getParticipantsGQL: GetParticipantsGQL,
    private getParticipantByIdGQL: GetParticipantByIdGQL,
    private reloadParticipantByIdGQL: ReloadParticipantByIdGQL,
    private updateParticipantGQL: UpdateParticipantGQL,
    private lockParticipantGQL: LockParticipantGQL,
    private unlockParticipantGQL: UnlockParticipantGQL,
    private createParticipantGQL: CreateParticipantGQL,
    private deleteParticipantGQL: DeleteParticipantGQL
  ) {}

  addLoadingRowId(id: string) {
    this.loadingRowIds.next([...this.loadingRowIds.value, id]);
  }

  removeLoadingRowId(id: string) {
    this.loadingRowIds.value.forEach((item, index) => {
      if (item === id) {
        this.loadingRowIds.value.splice(index, 1);
      }
    });
    this.loadingRowIds.next(this.loadingRowIds.value);
  }

  loadTableData() {
    this.tableData.next(null);
    this.getParticipantsGQL.fetch().subscribe((result) => {
      this.tableData.next(result.data?.participants);
    });
  }

  loadPageData(variables: GetParticipantByIdQueryVariables) {
    this.pageData.next(null);
    this.isLoadingPageData.next(true);
    this.getParticipantByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.pageData.next(result.data.participantById);
      })
      .add(() => {
        this.isLoadingPageData.next(false);
      });
  }

  reloadParticipant(variables: ReloadParticipantByIdQueryVariables) {
    this.addLoadingRowId(variables.id);
    this.reloadParticipantByIdGQL
      .fetch(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.participantById);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  createParticipant(currentId: string, variables: CreateParticipantMutationVariables) {
    this.createParticipantGQL.mutate(variables).subscribe((result) => {
      const newParticipant = result.data.createParticipant;
      this.tableData.next([newParticipant, ...this.tableData.value]);
      this.successfullyCreatedRowWithId.next(currentId);
    });
  }

  updateParticipant(variables: UpdateParticipantMutationVariables) {
    this.addLoadingRowId(variables.participant.id);
    this.updateParticipantGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.updateParticipant);
      })
      .add(() => {
        this.removeLoadingRowId(variables.participant.id);
      });
  }

  lockParticipant(variables: LockParticipantMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.lockParticipantGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.lockParticipant);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  unlockParticipant(variables: UnlockParticipantMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.unlockParticipantGQL
      .mutate(variables)
      .subscribe((result) => {
        this.updateDataRowFromResponse(result.data.unlockParticipant);
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  deleteParticipant(variables: DeleteParticipantMutationVariables) {
    this.addLoadingRowId(variables.id);
    this.deleteParticipantGQL
      .mutate(variables)
      .subscribe((result) => {
        if (result.data) {
          this.tableData.next(
            [...this.tableData.value].filter((participant) => participant.id !== variables.id)
          );
        }
      })
      .add(() => {
        this.removeLoadingRowId(variables.id);
      });
  }

  private updateDataRowFromResponse(rowFromResponse: any) {
    if (this.tableData.value) {
      const newTableData = this.tableData.value.map((row) =>
        rowFromResponse.id === row.id ? rowFromResponse : row
      );
      this.tableData.next(newTableData);
    }
    if (rowFromResponse.id === this.pageData?.value?.id) {
      this.pageData.next(rowFromResponse);
    }
  }
}

