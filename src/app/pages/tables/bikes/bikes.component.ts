import { Component, OnInit } from '@angular/core';
import { BikesService } from 'src/app/services/bikes.service';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent implements OnInit {
  columnInfo = [
    {
      dataPath: 'name',
      translation: 'Name',
      sticky: true,
      link: (row: any) => {
        return '/bike/' + row.id;
      },
    },
    { dataPath: 'group', translation: 'Gruppe' },
    { dataPath: 'modelName', translation: 'Modell' },
    { dataPath: 'state', translation: 'Status' },
    { dataPath: 'insuranceData.name', translation: 'Versicherer' },
    { dataPath: 'insuranceData.benefactor', translation: 'Kostenträger' },
    { dataPath: 'insuranceData.noPnP', translation: 'Nr. P&P' },
    {
      dataPath: 'insuranceData.billing',
      translation: 'Versicherung Abrechnung',
    },
    { dataPath: 'insuranceData.hasFixedRate', translation: 'Pauschale j/n' },
    { dataPath: 'insuranceData.fixedRate', translation: 'Pauschale Betrag' },
    {
      dataPath: 'insuranceData.maintenanceResponsible',
      translation: 'Wartung zuständig',
    },
    {
      dataPath: 'insuranceData.maintenanceBenefactor',
      translation: 'Wartung Kostenträger',
    },
    {
      dataPath: 'insuranceData.maintenanceAgreement',
      translation: 'Wartungsvereinbarung',
    },
    {
      dataPath: 'insuranceData.projectAllowance',
      translation: 'Projektzuschuss',
    },
    { dataPath: 'insuranceData.notes', translation: 'Sonstiges' },
    { dataPath: 'dimensionsAndLoad.bikeLength', translation: 'Länge' },
    { dataPath: 'dimensionsAndLoad.bikeWeight', translation: 'Gewicht' },
    { dataPath: 'dimensionsAndLoad.bikeHeight', translation: 'Höhe' },
    { dataPath: 'dimensionsAndLoad.bikeWidth', translation: 'Breite' },
    { dataPath: 'dimensionsAndLoad.boxHeightRange', translation: 'Boxhöhe' },
    { dataPath: 'dimensionsAndLoad.boxLengthRange', translation: 'Boxlänge' },
    { dataPath: 'dimensionsAndLoad.boxWidthRange', translation: 'Boxbreite' },
    {
      dataPath: 'dimensionsAndLoad.hasCoverBox',
      translation: 'Boxabdeckung j/n',
    },
    { dataPath: 'dimensionsAndLoad.lockable', translation: 'Box abschließbar' },
    {
      dataPath: 'dimensionsAndLoad.maxWeightBox',
      translation: 'max Zuladung Box',
    },
    {
      dataPath: 'dimensionsAndLoad.maxWeightLuggageRack',
      translation: 'max Zuladung Gepäckträger',
    },
    {
      dataPath: 'dimensionsAndLoad.maxWeightTotal',
      translation: 'max Gesamtgewicht',
    },
    { dataPath: 'numberOfChildren', translation: 'Anzahl Kinder' },
    { dataPath: 'numberOfWheels', translation: 'Anzahl Räder' },
    { dataPath: 'forCargo', translation: 'für Lasten j/n' },
    { dataPath: 'forChildren', translation: 'für Kinder j/n' },
    { dataPath: 'security.frameNumber', translation: 'Rahmennummer' },
    { dataPath: 'security.adfcCoding', translation: 'ADFC Codierung' },
    {
      dataPath: 'security.keyNumberAXAChain',
      translation: 'Schlüsselnrummer Rahmenschloss',
    },
    {
      dataPath: 'security.keyNumberFrameLock',
      translation: 'Schlüsselnrummer AXA-Kette',
    },
    { dataPath: 'security.policeCoding', translation: 'Polizei Codierung' },
    { dataPath: 'technicalEquipment.bicycleShift', translation: 'Schaltung' },
    { dataPath: 'technicalEquipment.isEBike', translation: 'E-Bike j/n' },
    {
      dataPath: 'technicalEquipment.hasLightSystem',
      translation: 'Lichtanlage j/n',
    },
    {
      dataPath: 'technicalEquipment.specialFeatures',
      translation: 'Besonderheiten',
    },
    { dataPath: 'stickerBikeNameState', translation: 'Aufkleber Status' },
    { dataPath: 'note', translation: 'Aufkleber Kommentar' },
    { dataPath: 'taxes.costCenter', translation: 'Steuern Kostenstelle' },
    {
      dataPath: 'taxes.organisationArea',
      translation: 'Steuern Vereinsbereich',
    },
    { dataPath: 'provider.id', translation: '' },
    { dataPath: 'provider.formName', translation: '' },
    { dataPath: 'provider.privatePerson.id', translation: '' },
    { dataPath: 'provider.privatePerson.person.id', translation: '' },
    { dataPath: 'provider.privatePerson.person.name', translation: '' },
    { dataPath: 'provider.privatePerson.person.firstName', translation: '' },
    {
      dataPath: 'provider.privatePerson.person.contactInformation.email',
      translation: '',
    },
    {
      dataPath: 'lendingStation.name',
      translation: 'Standort',
      link: (row: any) => {
        return '/lendingStation/' + row['lendingStation.id'];
      },
    },
    { dataPath: 'lendingStation.address.street', translation: 'Straße' },
    { dataPath: 'lendingStation.address.number', translation: 'Hausnummer' },
    { dataPath: 'lendingStation.address.zip', translation: 'PLZ' },
    { dataPath: 'lendingStation.address.city', translation: 'Ort' },
  ];

  dataService: any;

  tableDataGQLType: string = 'CargoBike';
  tableDataGQLCreateInputType: string = 'CargoBikeCreateInput';
  tableDataGQLUpdateInputType: string = 'CargoBikeUpdateInput';

  headline = 'Lastenräder';
  headlineIconName = 'directions_bike';
  copyableRows = true;

  loadingRowIds: string[] = [];
  constructor(private bikesService: BikesService) {}

  ngOnInit() {
    this.dataService = this.bikesService;
  }

  create(object: { currentId: string; row: any }) {
    this.bikesService.createBike(object.currentId, { bike: object.row });
  }

  lock(row: any) {
    this.bikesService.lockBike({ id: row.id });
  }

  save(row: any) {
    this.bikesService.updateBike({ bike: row });
  }

  copy(row: any) {
    this.bikesService.copyBikeById({ id: row.id });
  }

  cancel(row: any) {
    this.bikesService.unlockBike({ id: row.id });
  }

  delete(row: any) {
    this.bikesService.deleteBike({ id: row.id });
  }
}
