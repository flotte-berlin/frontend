import { Component, OnInit } from '@angular/core';
import { BikesService } from 'src/app/services/bikes.service';
import { EquipmentService } from 'src/app/services/equipment.service';
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
        { dataPath: 'name', translation: 'Name' },
        { dataPath: 'group', translation: 'Gruppe' },
        { dataPath: 'modelName', translation: 'Modell' },
        { dataPath: 'state', translation: 'Status' },
      ],
    },
    {
      type: 'Group',
      title: 'Maße und Ladung',
      properties: [
        { dataPath: 'dimensionsAndLoad.bikeLength', translation: 'Länge' },
        { dataPath: 'dimensionsAndLoad.bikeWeight', translation: 'Gewicht' },
        { dataPath: 'dimensionsAndLoad.bikeHeight', translation: 'Höhe' },
        { dataPath: 'dimensionsAndLoad.bikeWidth', translation: 'Breite' },
        {
          dataPath: 'dimensionsAndLoad.boxHeightRange',
          translation: 'Boxhöhe',
        },
        {
          dataPath: 'dimensionsAndLoad.boxLengthRange',
          translation: 'Boxlänge',
        },
        {
          dataPath: 'dimensionsAndLoad.boxWidthRange',
          translation: 'Boxbreite',
        },
        {
          dataPath: 'dimensionsAndLoad.hasCoverBox',
          translation: 'Boxabdeckung j/n',
        },
        {
          dataPath: 'dimensionsAndLoad.lockable',
          translation: 'Box abschließbar',
        },
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
      ],
    },
    {
      type: 'Group',
      title: 'Sicherheitsinformationen',
      properties: [
        { dataPath: 'security.frameNumber', translation: 'Rahmennummer' },
        { dataPath: 'security.adfcCoding', translation: 'ADFC Codierung' },
        {
          dataPath: 'security.keyNumberAXAChain',
          translation: 'Schlüsselnr. Kettenschloss',
        },
        {
          dataPath: 'security.keyNumberFrameLock',
          translation: 'Schlüsselnr. Rahmenschloss',
        },
        { dataPath: 'security.policeCoding', translation: 'Polizei Codierung' },
      ],
    },
    {
      type: 'Group',
      title: 'Ausstattung',
      properties: [
        {
          dataPath: 'technicalEquipment.bicycleShift',
          translation: 'Schaltung',
        },
        { dataPath: 'technicalEquipment.isEBike', translation: 'E-Bike j/n' },
        {
          dataPath: 'technicalEquipment.hasLightSystem',
          translation: 'Lichtanlage j/n',
        },
        {
          dataPath: 'technicalEquipment.specialFeatures',
          translation: 'Besonderheiten',
        },
      ],
    },
    {
      type: 'Group',
      title: 'hinterlegte Ersatzschlüssel',
      properties: [
        { dataPath: 'spareKeyLocations.projectOffice', translation: 'Projektbüro' },
        { dataPath: 'spareKeyLocations.lendingStation', translation: 'Standort' },
        { dataPath: 'spareKeyLocations.provider', translation: 'Anbieter' },
      ]
    },
    {
      type: 'Group',
      title: 'Sonstiges',
      properties: [
        { dataPath: 'taxes.costCenter', translation: 'Kostenstelle' },
        {
          dataPath: 'taxes.organisationArea',
          translation: 'Vereinsbereich',
        },
        { dataPath: 'miscellaneous', translation: 'Anmerkungen' },
        { dataPath: 'ownUse', translation: 'Eigennutzung' },
        { dataPath: 'preDamage', translation: 'Vorschäden' },
        { dataPath: 'supplier', translation: 'Lieferant' },
        { dataPath: 'stickerBikeNameState', translation: 'Aufkleber Status' },
        { dataPath: 'note', translation: 'Aufkleber Kommentar' },
      ],
    },
    {
      type: 'Group',
      title: 'Anbieter (Person)',
      hideCondition: (data) => data['provider.privatePerson.person.id'] == null,
      properties: [
        {
          type: 'Link',
          linkText: 'Zum Anbieter',
          link: (data) => {
            return '/provider/' + data['provider.id'];
          },
        },
        {
          dataPath: 'provider.privatePerson.person.firstName',
          translation: 'Vorname',
        },
        {
          dataPath: 'provider.privatePerson.person.name',
          translation: 'Nachname',
        },
        { dataPath: 'provider.formName', translation: 'Formular-Name' },
        {
          dataPath: 'provider.privatePerson.address.street',
          translation: 'Straße',
        },
        {
          dataPath: 'provider.privatePerson.address.number',
          translation: 'Hausnummer',
        },
        {
          dataPath: 'provider.privatePerson.address.zip',
          translation: 'Postleitzahl',
        },
        {
          dataPath: 'provider.privatePerson.address.city',
          translation: 'Ort',
        },
        {
          dataPath: 'provider.privatePerson.email',
          translation: 'Email',
        },
        {
          dataPath: 'provider.privatePerson.phone',
          translation: 'Telefonnummer',
        },
      ],
    },
    {
      type: 'Group',
      title: 'Anbieter (Organisation)',
      hideCondition: (data) => data['provider.organisation.id'] == null,
      properties: [
        {
          type: 'Link',
          linkText: 'Zum Anbieter',
          link: (data) => {
            return '/provider/' + data['provider.id'];
          },
        },
        { dataPath: 'provider.organisation.name', translation: 'Organisationsname' },
        { dataPath: 'provider.formName', translation: 'Formular-Name' },
        {
          dataPath: 'provider.organisation.address.street',
          translation: 'Straße',
        },
        {
          dataPath: 'provider.organisation.address.number',
          translation: 'Hausnummer',
        },
        {
          dataPath: 'provider.organisation.address.zip',
          translation: 'Postleitzahl',
        },
        {
          dataPath: 'provider.organisation.address.city',
          translation: 'Ort',
        },
        {
          dataPath: 'provider.organisation.contactInformation.person.firstName',
          translation: 'Ansprechpartner Vorname',
        },
        {
          dataPath: 'provider.organisation.contactInformation.person.name',
          translation: 'Ansprechpartner Nachname',
        },
        {
          dataPath: 'provider.organisation.contactInformation.email',
          translation: 'Ansprechpartner Email',
        },
        {
          dataPath: 'provider.organisation.contactInformation.phone',
          translation: 'Ansprechpartner Telefonnummer',
        },
      ],
    },
    {
      type: 'Group',
      title: 'Standort',
      properties: [
        {
          dataPath: 'lendingStation.name',
          translation: 'Standort',
          link: (row: any) => {
            return '/lendingStation/' + row['lendingStation.id'];
          },
        },
        { dataPath: 'lendingStation.address.street', translation: 'Straße' },
        {
          dataPath: 'lendingStation.address.number',
          translation: 'Hausnummer',
        },
        { dataPath: 'lendingStation.address.zip', translation: 'PLZ' },
        { dataPath: 'lendingStation.address.city', translation: 'Ort' },
      ],
    },
    {
      type: 'ReferenceTable',
      title: 'Equipmenttypen',
      dataPath: 'equipmentType',
      dataService: null,
      columnInfo: [
        { dataPath: 'name', translation: 'Name' },
        { dataPath: 'description', translation: 'Beschreibung' },
        { dataPath: 'availableForSupply', translation: 'verfügbares Zubehör' },
      ],
      nameToShowInSelection: (element) => {
        return element?.name;
      },
      linkToTable: (element) => {
        return '/table/equipmentTypes';
      },
      propertyNameOfUpdateInput: 'equipmentTypeIds',
    },
    {
      type: 'ReferenceTable',
      title: 'Equipments',
      dataPath: 'equipment',
      dataService: null,
      columnInfo: [
        { dataPath: 'serialNo', translation: 'Seriennummer' },
        { dataPath: 'title', translation: 'Name' },
        { dataPath: 'description', translation: 'Beschreibung' },
        { dataPath: 'availableForSupply', translation: 'verfügbares Zubehör' },
      ],
      nameToShowInSelection: (element) => {
        return (
          element.title +
          ' (' +
          element.serialNo +
          ')' +
          (element.cargoBike
            ? ' [aktuell Teil von ' + element.cargoBike.name + ']'
            : '')
        );
      },
      linkToTable: (element) => '/table/equipments',
      propertyNameOfUpdateInput: 'equipmentIds',
    },
    {
      type: 'ReferenceTable',
      title: 'Zeitscheiben',
      dataPath: 'timeFrames',
      dataService: null,
      columnInfo: [
        { dataPath: 'dateRange', translation: 'Zeitraum' },
        {
          dataPath: 'lendingStation.name',
          translation: 'Standort',
          link: (row) => '/lendingStation/' + row['lendingStation.id'],
        },
      ],
      editableReferences: false,
      linkToTable: () => '/table/timeFrames',
      linkToTableParams: (bike) => {
        return { "cargoBike.name": bike.name};
      },
    },
    {
      type: 'ReferenceTable',
      title: 'Engagements',
      dataPath: 'engagement',
      dataService: null,
      columnInfo: [
        {
          dataPath: 'engagementType.name',
          translation: 'Engagementtyp',
        },
        {
          dataPath: 'engagementType.description',
          translation: 'Engagementtyp Erklärung',
        },
        { dataPath: 'dateRange', translation: 'Zeitraum' },
        {
          dataPath: 'participant.contactInformation.person.firstName',
          translation: 'Aktiver Vorname',
        },
        {
          dataPath: 'participant.contactInformation.person.name',
          translation: 'Aktiver Nachname',
          link: (row: any) => {
            return '/participant/' + row['participant.id'];
          },
        },
      ],
      editableReferences: false,
      linkToTable: () => '/table/engagements',
      linkToTableParams: (bike) => {
        return { "cargoBike.name": bike.name};
      },
    },
    {
      type: 'Group',
      title: 'Versicherung',
      properties: [
        { dataPath: 'insuranceData.name', translation: 'Versicherer' },
        { dataPath: 'insuranceData.benefactor', translation: 'Kostenträger' },
        { dataPath: 'insuranceData.billing', translation: 'Abrechnung' },
        { dataPath: 'insuranceData.noPnP', translation: 'Nr. P&P' },        
      ],
    },
    {
      type: 'Group',
      title: 'Betriebsfinanzierung',
      properties: [
        {
          dataPath: 'insuranceData.maintenanceResponsible',
          translation: 'Wartung - zuständig',
        },
        {
          dataPath: 'insuranceData.maintenanceBenefactor',
          translation: 'Wartung - Kostenträger',
        },
        {
          dataPath: 'insuranceData.maintenanceAgreement',
          translation: 'Wartung - Vereinbarung',
        },
        {
          dataPath: 'insuranceData.hasFixedRate',
          translation: 'Pauschale - j/n',
        },
        {
          dataPath: 'insuranceData.frameworkAgreement',
          translation: 'Rahmenvertrag',
        },
        {
          dataPath: 'insuranceData.fixedRate',
          translation: 'Pauschale - Betrag',
        },
        {
          dataPath: 'insuranceData.fixedRateCycle',
          translation: 'Pauschale - Takt',
        },
        {
          dataPath: 'insuranceData.projectAllowance',
          translation: 'Projektzuschuss',
        },
        { dataPath: 'insuranceData.notes', translation: 'Sonstiges' },
      ]
    }
  ];

  headlineDataPath = 'name';
  headlineIconName = 'directions_bike';
  pageDataGQLType: string = 'CargoBike';
  pageDataGQLUpdateInputType: string = 'CargoBikeUpdateInput';

  dataService: any;

  constructor(
    private bikesService: BikesService,
    private equipmentTypeService: EquipmentTypeService,
    private equipmentService: EquipmentService
  ) {
    this.propertiesInfo.find(
      (prop) => prop.dataPath === 'equipmentType'
    ).dataService = this.equipmentTypeService;

    this.propertiesInfo.find(
      (prop) => prop.dataPath === 'equipment'
    ).dataService = this.equipmentService;
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
