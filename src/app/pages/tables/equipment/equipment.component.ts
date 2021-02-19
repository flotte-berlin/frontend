import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
  headline = 'Equipments';
  headlineIconName = 'battery_full';

  columnInfo = [
    { dataPath: 'id', translation: 'ID', readonly: true },
    { dataPath: 'serialNo', translation: 'Seriennummer' },
    { dataPath: 'title', translation: 'Name' },
    { dataPath: 'description', translation: 'Beschreibung' },
    { dataPath: 'availableForSupply', translation: 'verfügbares Zubehör' },
    {
      dataPath: 'cargoBike.name',
      translation: 'Lastenrad',
      link: (element) => {
        return '/bike/' + element['cargoBike.id'];
      },
    },
  ];

  dataService: EquipmentService;

  tableDataGQLType: string = 'Equipment';
  tableDataGQLCreateInputType: string = 'EquipmentCreateInput';
  tableDataGQLUpdateInputType: string = 'EquipmentUpdateInput';

  loadingRowIds: string[] = [];
  constructor(private service: EquipmentService) {}

  ngOnInit() {
    this.dataService = this.service;
  }

  create(value: { currentId: string; row: any }) {
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
