import { Component, OnInit } from '@angular/core';
import { BikesService } from 'src/app/services/bikes.service';
import { EquipmentTypeService } from 'src/app/services/equipmentType.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
})
export class BikeComponent implements OnInit {
  propertiesInfo = [
    {
      type: 'Group',
      title: 'Allgemein',
      properties: [
        { name: 'name', translation: 'Name' },
        { name: 'id', translation: 'ID', readonly: true },
        { name: 'Group', translation: 'Gruppe' },
        { name: 'modelName', translation: 'Modell' },
      ],
    },
    {
      type: 'Group',
      title: 'Versicherungsdaten',
      properties: [
        {
          name: 'insuranceData.billing',
          translation: 'Versicherung Abrechnung',
        },
        { name: 'insuranceData.hasFixedRate', translation: 'Pauschale j/n' },
        { name: 'insuranceData.fixedRate', translation: 'Pauschale Betrag' },
        { name: 'insuranceData.name', translation: 'Versicherer' },
        { name: 'insuranceData.benefactor', translation: 'Kostenträger' },
        { name: 'insuranceData.noPnP', translation: 'Nr. P&P' },
        {
          name: 'insuranceData.maintenanceResponsible',
          translation: 'Wartung zuständig',
        },
        {
          name: 'insuranceData.maintenanceBenefactor',
          translation: 'Wartung Kostenträger',
        },
        {
          name: 'insuranceData.maintenanceAgreement',
          translation: 'Wartungsvereinbarung',
        },
        {
          name: 'insuranceData.projectAllowance',
          translation: 'Projektzuschuss',
        },
        { name: 'insuranceData.notes', translation: 'Sonstiges' },
      ],
    },
    {
      type: 'Group',
      title: 'Maße und Ladungen',
      properties: [
        { name: 'dimensionsAndLoad.bikeLength', translation: 'Länge' },
        { name: 'dimensionsAndLoad.bikeWeight', translation: 'Gewicht' },
        { name: 'dimensionsAndLoad.bikeHeight', translation: 'Höhe' },
        { name: 'dimensionsAndLoad.bikeWidth', translation: 'Breite' },
        { name: 'dimensionsAndLoad.boxHeight', translation: 'Boxhöhe' },
        { name: 'dimensionsAndLoad.boxLength', translation: 'Boxlänge' },
        { name: 'dimensionsAndLoad.boxWidth', translation: 'Boxbreite' },
        {
          name: 'dimensionsAndLoad.hasCoverBox',
          translation: 'Boxabdeckung j/n',
        },
        { name: 'dimensionsAndLoad.lockable', translation: 'Box abschließbar' },
        {
          name: 'dimensionsAndLoad.maxWeightBox',
          translation: 'max Zuladung Box',
        },
        {
          name: 'dimensionsAndLoad.maxWeightLuggageRack',
          translation: 'max Zuladung Gepäckträger',
        },
        {
          name: 'dimensionsAndLoad.maxWeightTotal',
          translation: 'max Gesamtgewicht',
        },
        { name: 'numberOfChildren', translation: 'Anzahl Kinder' },
        { name: 'numberOfWheels', translation: 'Anzahl Räder' },
        { name: 'forCargo', translation: 'für Lasten j/n' },
        { name: 'forChildren', translation: 'für Kinder j/n' },
      ],
    },
    {
      type: 'Group',
      title: 'Sicherheitsinformationen',
      properties: [
        { name: 'security.frameNumber', translation: 'Rahmennummer' },
        { name: 'security.adfcCoding', translation: 'ADFC Codierung' },
        {
          name: 'security.keyNumberAXAChain',
          translation: 'Schlüsselnrummer Rahmenschloss',
        },
        {
          name: 'security.keyNumberFrameLock',
          translation: 'Schlüsselnrummer AXA-Kette',
        },
        { name: 'security.policeCoding', translation: 'Polizei Codierung' },
      ],
    },
    {
      type: 'Group',
      title: 'Ausstattung',
      properties: [
        { name: 'technicalEquipment.bicycleShift', translation: 'Schaltung' },
        { name: 'technicalEquipment.isEBike', translation: 'E-Bike j/n' },
        {
          name: 'technicalEquipment.hasLightSystem',
          translation: 'Lichtanlage j/n',
        },
        {
          name: 'technicalEquipment.specialFeatures',
          translation: 'Besonderheiten',
        },
      ],
    },
    {
      type: 'Group',
      title: 'Sonstiges',
      properties: [
        { name: 'stickerBikeNameState', translation: 'Aufkleber Status' },
        { name: 'note', translation: 'Aufkleber Kommentar' },
        { name: 'taxes.costCenter', translation: 'Steuern Kostenstelle' },
        {
          name: 'taxes.organisationArea',
          translation: 'Steuern Vereinsbereich',
        },
      ],
    },
    {
      type: 'Group',
      title: 'provider',
      properties: [
        { name: 'provider.id', translation: '' },
        { name: 'provider.formName', translation: '' },
        { name: 'provider.privatePerson.id', translation: '' },
        { name: 'provider.privatePerson.person.id', translation: '' },
        { name: 'provider.privatePerson.person.name', translation: '' },
        { name: 'provider.privatePerson.person.firstName', translation: '' },
        {
          name: 'provider.privatePerson.person.contactInformation.email',
          translation: '',
        },
      ],
    },
    {
      type: 'Group',
      title: 'lendingstation',
      properties: [
        { name: 'lendingStation.id', translation: '' },
        { name: 'lendingStation.name', translation: '' },
        { name: 'lendingStation.address.number', translation: '' },
        { name: 'lendingStation.address.street', translation: '' },
        { name: 'lendingStation.address.zip', translation: '' },
      ],
    },
    {
      type: 'ReferenceTable',
      title: 'Equipmenttypen',
      name: 'equipmentType',
      dataService: null,
      columnInfo: [{name: 'name', translation: "Name"}, {name: 'description', translation: "Beschreibung"}],
      nameToShowInSelection: (element) => {return element.name},
      propertyNameOfUpdateInput: "equipmentTypeIds"
    },
  ];

  headlineDataPath = 'name';
  pageDataGQLType: string = 'CargoBike';
  pageDataGQLUpdateInputType: string = 'CargoBikeUpdateInput';

  dataService: any;

  constructor(
    private bikesService: BikesService,
    private equipmentTypeService: EquipmentTypeService
  ) {
    this.propertiesInfo.find(
      (prop) => prop.name === 'equipmentType'
    ).dataService = this.equipmentTypeService;
  }

  ngOnInit(): void {
    this.dataService = this.bikesService;
  }

  lock(row: any) {
    this.bikesService.lockBike({ id: row.id });
  }

  save(row: any) {
    this.bikesService.updateBike({ bike: row });
  }

  cancel(row: any) {
    this.bikesService.unlockBike({ id: row.id });
  }
}
