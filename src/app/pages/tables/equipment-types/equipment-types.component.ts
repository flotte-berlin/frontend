import { Component, OnInit } from '@angular/core';
import {EquipmentTypeService} from 'src/app/services/equipmentType.service'

@Component({
  selector: 'app-equipment-types',
  templateUrl: './equipment-types.component.html',
  styleUrls: ['./equipment-types.component.scss']
})
export class EquipmentTypesComponent implements OnInit {
  headline = 'Equipmenttypen';

  columnInfo = [
    { dataPath: 'id', translation: 'ID', readonly: true },
    { dataPath: 'name', translation: 'Name', requiredForCreation: true },
    { dataPath: 'description', translation: 'Beschreibung' },
  ];

  dataService: EquipmentTypeService;

  tableDataGQLType: string = 'EquipmentType';
  tableDataGQLCreateInputType: string = 'EquipmentTypeCreateInput';
  tableDataGQLUpdateInputType: string = 'EquipmentTypeUpdateInput';

  loadingRowIds: string[] = [];
  constructor(
    private service: EquipmentTypeService
  ) {}

  ngOnInit() {
    this.dataService = this.service;
  }

  create(value: {currentId: string, row: any}) {
    this.dataService.create(value.currentId, { equipmentType: value.row });
  }

  lock(row: any) {
    this.dataService.lock({ id: row.id });
  }

  save(row: any) {
    this.dataService.update({ equipmentType: row });
  }

  cancel(row: any) {
    this.dataService.unlock({ id: row.id });
  }

  delete(row: any) {
    this.dataService.delete({ id: row.id });
  }
}