import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete-select',
  templateUrl: './autocomplete-select.component.html',
  styleUrls: ['./autocomplete-select.component.scss'],
})
export class AutocompleteSelectComponent implements OnInit {
  @Input()
  set possibleObjects(objects: any[]) {
    this._possibleObjects = objects;
    this.filterPossibleObjects();
  }
  get possibleObjects(): any[] {
    return this._possibleObjects;
  }
  _possibleObjects: any[];

  @Input()
  set idsOfObjectsToHide(value) {
    this._idsOfObjectsToHide = value;
    setTimeout(() => this.filterPossibleObjects());
  }
  get idsOfObjectsToHide(): string[] {
    return this._idsOfObjectsToHide;
  }
  _idsOfObjectsToHide: string[] = [];

  @Input()
  set editable(value: boolean) {
    this._editable = value;
    value
      ? this.addForm.get('addGroup').enable()
      : this.addForm.get('addGroup').disable();
  }
  get editable() {
    return this._editable;
  }
  _editable: boolean = false;

  /** function that returns  the string that should be displayed in the selection */
  @Input()
  nameToShowInSelection;

  @Input()
  keepAutocompleteOpenAfterClick: boolean = false;

  @Output() selectedElementChange = new EventEmitter();

  addForm: FormGroup = new FormGroup({ addGroup: new FormControl() });

  filteredPossibleObjects: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.addForm
      .get('addGroup')
      .valueChanges.subscribe(() => this.filterPossibleObjects());
  }

  onOptionClicked(event: Event, element: any, trigger: MatAutocompleteTrigger) {
    event.stopPropagation();
    if (this.keepAutocompleteOpenAfterClick) {
      trigger.openPanel();
    }
    this.addForm.get('addGroup').reset();
    this.selectedElementChange.emit(element);
  }

  filterPossibleObjects() {
    this.filteredPossibleObjects = this.possibleObjects.filter(
      (element) =>
        this.idsOfObjectsToHide.findIndex((id) => id === element.id) === -1
    );
    let searchString = this.addForm.get('addGroup').value;
    if (!searchString) {
      return;
    }
    searchString = searchString.toLocaleLowerCase();
    this.filteredPossibleObjects = this.filteredPossibleObjects.filter(
      (element) =>
        this.nameToShowInSelection(element)
          .toLocaleLowerCase()
          .includes(searchString)
    );
  }
}
