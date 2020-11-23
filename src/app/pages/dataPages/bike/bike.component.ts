import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatten } from 'src/app/helperFunctions/flattenObject';
import { BikesService } from 'src/app/services/bikes.service';
import { SchemaService } from 'src/app/services/schema.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.scss'],
})
export class BikeComponent implements OnInit {
  propertiesInfo: {
    name: string;
    translation: string;
    readonly?: boolean;
    type?: string;
  }[] = [
    { name: 'name', translation: 'Name' },
    { name: 'id', translation: 'ID', readonly: true },
    { name: 'group', translation: 'Gruppe' },
    { name: 'modelName', translation: 'Modell' },
    { name: 'insuranceData.billing', translation: 'Versicherung Abrechnung' },
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
    { name: 'insuranceData.projectAllowance', translation: 'Projektzuschuss' },
    { name: 'insuranceData.notes', translation: 'Sonstiges' },
    { name: 'dimensionsAndLoad.bikeLength', translation: 'Länge' },
    { name: 'dimensionsAndLoad.bikeWeight', translation: 'Gewicht' },
    { name: 'dimensionsAndLoad.bikeHeight', translation: 'Höhe' },
    { name: 'dimensionsAndLoad.bikeWidth', translation: 'Breite' },
    { name: 'dimensionsAndLoad.boxHeight', translation: 'Boxhöhe' },
    { name: 'dimensionsAndLoad.boxLength', translation: 'Boxlänge' },
    { name: 'dimensionsAndLoad.boxWidth', translation: 'Boxbreite' },
    { name: 'dimensionsAndLoad.hasCoverBox', translation: 'Boxabdeckung j/n' },
    { name: 'dimensionsAndLoad.lockable', translation: 'Box abschließbar' },
    { name: 'dimensionsAndLoad.maxWeightBox', translation: 'max Zuladung Box' },
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
    { name: 'stickerBikeNameState', translation: 'Aufkleber Status' },
    { name: 'note', translation: 'Aufkleber Kommentar' },
    { name: 'taxes.costCenter', translation: 'Steuern Kostenstelle' },
    { name: 'taxes.organisationArea', translation: 'Steuern Vereinsbereich' },
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
    { name: 'lendingStation.id', translation: '' },
    { name: 'lendingStation.name', translation: '' },
    { name: 'lendingStation.address.number', translation: '' },
    { name: 'lendingStation.address.street', translation: '' },
    { name: 'lendingStation.address.zip', translation: '' },
  ];

  headlineDataPath = 'name';
  pageDataGQLType: string = "CargoBike";
  pageDataGQLUpdateInputType: string = "CargoBikeUpdateInput"

  id: string;
  data: any;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bikesService: BikesService,
    private schemaService: SchemaService
  ) {
    this.addPropertiesFromGQLSchemaToPropertiesInfo();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.bikesService.loadPageData({ id: this.id });
    this.bikesService.pageData.subscribe((data) => {
      this.data = flatten(data);
    });
    this.bikesService.loadingBike.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  addPropertiesFromGQLSchemaToPropertiesInfo() {
    for (const column of this.propertiesInfo) {
      const typeInformation = this.schemaService.getTypeInformation(
        this.pageDataGQLType,
        column.name
      );
      column.type = column.type || typeInformation.type;
    }
    for (const column of this.propertiesInfo) {
      const typeInformation = this.schemaService.getTypeInformation(
        this.pageDataGQLUpdateInputType,
        column.name
      );
      column.readonly = column.readonly || !typeInformation.isPartOfType;
    }
  }
}
