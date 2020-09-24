import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};




/** The CargoBike type is central to the graph. You could call it the root. */
export type CargoBike = {
  __typename?: 'CargoBike';
  id: Scalars['ID'];
  /** see column A in info tabelle */
  group?: Maybe<Group>;
  name?: Maybe<Scalars['String']>;
  modelName?: Maybe<Scalars['String']>;
  numberOfWheels?: Maybe<Scalars['Int']>;
  forCargo?: Maybe<Scalars['Boolean']>;
  forChildren?: Maybe<Scalars['Boolean']>;
  numberOfChildren: Scalars['Int'];
  /**
   * Safety is a custom type, that stores information about security features.
   * TODO: Should this be calles Security?
   */
  security: Security;
  /** Does not refere to an extra table in the database. */
  technicalEquipment?: Maybe<TechnicalEquipment>;
  /** Does not refere to an extra table in the database. */
  dimensionsAndLoad: DimensionsAndLoad;
  bikeEvents?: Maybe<Array<Maybe<BikeEvent>>>;
  equipment?: Maybe<Array<Maybe<Equipment>>>;
  /** Refers to equipment that is not unique. See kommentierte info tabelle -> Fragen -> Frage 2 */
  miscellaneousEquipment?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Sticker State */
  stickerBikeNameState?: Maybe<StickerBikeNameState>;
  note?: Maybe<Scalars['String']>;
  provider?: Maybe<Provider>;
  coordinator?: Maybe<Participant>;
  insuranceData: InsuranceData;
  lendingStation?: Maybe<LendingStation>;
  taxes?: Maybe<Taxes>;
  engagement?: Maybe<Array<Maybe<Engagement>>>;
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['Date']>;
};


/** The CargoBike type is central to the graph. You could call it the root. */
export type CargoBikeEquipmentArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


/** The CargoBike type is central to the graph. You could call it the root. */
export type CargoBikeEngagementArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};

export type CargoBikeCreateInput = {
  /** see column A in info tabelle */
  group: Group;
  name: Scalars['String'];
  modelName: Scalars['String'];
  numberOfWheels: Scalars['Int'];
  forCargo: Scalars['Boolean'];
  forChildren: Scalars['Boolean'];
  numberOfChildren: Scalars['Int'];
  /**
   * Safety is a custom type, that stores information about security features.
   * TODO: Should this be calles Security?
   */
  security: SecurityCreateInput;
  /** Does not refere to an extra table in the database. */
  technicalEquipment: TechnicalEquipmentCreateInput;
  /** Does not refere to an extra table in the database. */
  dimensionsAndLoad: DimensionsAndLoadCreateInput;
  /** Refers to equipment that is not unique. See kommentierte info tabelle -> Fragen -> Frage 2 */
  miscellaneousEquipment?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Sticker State */
  stickerBikeNameState?: Maybe<StickerBikeNameState>;
  note?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  insuranceData: InsuranceDataCreateInput;
  taxes: TaxesCreateInput;
};

export type CargoBikeUpdateInput = {
  id: Scalars['ID'];
  /** see column A in info tabelle */
  group?: Maybe<Group>;
  name?: Maybe<Scalars['String']>;
  modelName?: Maybe<Scalars['String']>;
  numberOfWheels?: Maybe<Scalars['Int']>;
  forCargo?: Maybe<Scalars['Boolean']>;
  forChildren?: Maybe<Scalars['Boolean']>;
  numberOfChildren?: Maybe<Scalars['Int']>;
  /**
   * Safety is a custom type, that stores information about security features.
   * TODO: Should this be calles Security?
   */
  security?: Maybe<SecurityUpdateInput>;
  /** Does not refere to an extra table in the database. */
  technicalEquipment?: Maybe<TechnicalEquipmentUpdateInput>;
  /** Does not refere to an extra table in the database. */
  dimensionsAndLoad?: Maybe<DimensionsAndLoadUpdateInput>;
  /** Refers to equipment that is not unique. See kommentierte info tabelle -> Fragen -> Frage 2 */
  miscellaneousEquipment?: Maybe<Array<Maybe<Scalars['String']>>>;
  lendingStationId?: Maybe<Scalars['ID']>;
  /** Sticker State */
  stickerBikeNameState?: Maybe<StickerBikeNameState>;
  note?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  insuranceData?: Maybe<InsuranceDataUpdateInput>;
  taxes?: Maybe<TaxesUpdateInput>;
};

export type InsuranceData = {
  __typename?: 'InsuranceData';
  /** Eventuelly, this field will become an enum or a seperate data table and user can choose from a pool of insurance companies. */
  name: Scalars['String'];
  benefactor: Scalars['String'];
  billing: Scalars['String'];
  noPnP: Scalars['String'];
  /** eg. Anbieter, flotte, eigenleistung */
  maintananceResponsible: Scalars['String'];
  maintananceBenefactor: Scalars['String'];
  maintananceAgreement?: Maybe<Scalars['String']>;
  hasFixedRate: Scalars['Boolean'];
  fixedRate?: Maybe<Scalars['Float']>;
  /** Projektzuschuss */
  projectAllowance?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
};

export type InsuranceDataCreateInput = {
  /** Eventuelly, this field will become an enum or a seperate data table and user can choose from a pool of insurance companies. */
  name: Scalars['String'];
  benefactor: Scalars['String'];
  billing: Scalars['String'];
  noPnP: Scalars['String'];
  /** eg. Anbieter, flotte, eigenleistung */
  maintananceResponsible: Scalars['String'];
  maintananceBenefactor: Scalars['String'];
  maintananceAgreement?: Maybe<Scalars['String']>;
  hasFixedRate: Scalars['Boolean'];
  fixedRate?: Maybe<Scalars['Float']>;
  /** Projektzuschuss */
  projectAllowance?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
};

export type InsuranceDataUpdateInput = {
  /** Eventuelly, this field will become an enum or a seperate data table and user can choose from a pool of insurance companies. */
  name?: Maybe<Scalars['String']>;
  benefactor?: Maybe<Scalars['String']>;
  billing?: Maybe<Scalars['String']>;
  noPnP?: Maybe<Scalars['String']>;
  /** eg. Anbieter, flotte, eigenleistung */
  maintananceResponsible?: Maybe<Scalars['String']>;
  maintananceBenefactor?: Maybe<Scalars['String']>;
  maintananceAgreement?: Maybe<Scalars['String']>;
  hasFixedRate?: Maybe<Scalars['Boolean']>;
  fixedRate?: Maybe<Scalars['Float']>;
  /** Projektzuschuss */
  projectAllowance?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
};

export enum Group {
  Kl = 'KL',
  Li = 'LI',
  Sp = 'SP',
  Fk = 'FK',
  Mh = 'MH',
  Sz = 'SZ',
  Ts = 'TS',
  Tk = 'TK'
}

/**
 * The BikeModel can be used for instantiate new bikes with a given model.
 * It should only be used to fill in default values.
 * Even bikes of the same model can have different properties.
 */
export type BikeModel = {
  __typename?: 'BikeModel';
  id: Scalars['ID'];
  name: Scalars['String'];
  dimensionsAndLoad: DimensionsAndLoad;
  technicalEquipment: TechnicalEquipment;
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  start: Scalars['Date'];
  end?: Maybe<Scalars['Date']>;
  contactInformation: ContactInformation;
  usernamefLotte?: Maybe<Scalars['String']>;
  usernameSlack?: Maybe<Scalars['String']>;
  memberADFC: Scalars['Boolean'];
  locationZIPs?: Maybe<Array<Maybe<Scalars['String']>>>;
  memberCoreTeam: Scalars['Boolean'];
  roleCoordinator: Scalars['Boolean'];
  roleEmployeADFC: Scalars['Boolean'];
  /** Wahr, wenn die Person Pate ist. */
  roleMentor: Scalars['Boolean'];
  roleAmbulance: Scalars['Boolean'];
  roleBringer: Scalars['Boolean'];
  /** Date of workshop to become Mentor dt. Pate */
  workshopMentor?: Maybe<Scalars['Date']>;
  /** Date of last Erste Hilfe Kurs? */
  workshopAmbulance?: Maybe<Scalars['Date']>;
  /**
   * Note the kommentierte Infodaten Tabelle.
   * This value is calculated form other values.
   * It is true, if the person is not on the black list and not retired
   * and is either Mentor dt. Pate or Partner Mentor dt. Partnerpate for at least one bike.
   */
  distributedActiveBikeParte: Scalars['Boolean'];
  reserve?: Maybe<Scalars['String']>;
  engagement?: Maybe<Array<Maybe<Engagement>>>;
};

export type ParticipantCreateInput = {
  start: Scalars['Date'];
  end?: Maybe<Scalars['Date']>;
  /** must create contactinformation first, if you want to use new */
  contactInformationId: Scalars['ID'];
  usernamefLotte?: Maybe<Scalars['String']>;
  usernameSlack?: Maybe<Scalars['String']>;
  memberADFC: Scalars['Boolean'];
  locationZIPs?: Maybe<Array<Maybe<Scalars['String']>>>;
  memberCoreTeam: Scalars['Boolean'];
  /** Date of workshop to become Mentor dt. Pate */
  workshopMentor?: Maybe<Scalars['Date']>;
  /** Date of last Erste Hilfe Kurs? */
  workshopAmbulance?: Maybe<Scalars['Date']>;
  reserve?: Maybe<Scalars['String']>;
};

export type Engagement = {
  __typename?: 'Engagement';
  id: Scalars['ID'];
  from: Scalars['Date'];
  to?: Maybe<Scalars['Date']>;
  participant?: Maybe<Participant>;
  cargoBike?: Maybe<CargoBike>;
  roleCoordinator: Scalars['Boolean'];
  roleEmployeADFC: Scalars['Boolean'];
  /** Wahr, wenn die Person Pate ist. */
  roleMentor: Scalars['Boolean'];
  roleAmbulance: Scalars['Boolean'];
  roleBringer: Scalars['Boolean'];
};

export type EngagementCreateInput = {
  from: Scalars['Date'];
  to?: Maybe<Scalars['Date']>;
  participantId: Scalars['ID'];
  cargoBikeId: Scalars['ID'];
  roleCoordinator: Scalars['Boolean'];
  roleEmployeADFC: Scalars['Boolean'];
  /** Wahr, wenn die Person Pate ist. */
  roleMentor: Scalars['Boolean'];
  roleAmbulance: Scalars['Boolean'];
  roleBringer: Scalars['Boolean'];
};

export type Taxes = {
  __typename?: 'Taxes';
  costCenter: Scalars['String'];
  organizationArea?: Maybe<OrganizationArea>;
};

export type TaxesCreateInput = {
  costCenter: Scalars['String'];
  organizationArea?: Maybe<OrganizationArea>;
};

export type TaxesUpdateInput = {
  costCenter?: Maybe<Scalars['String']>;
  organizationArea?: Maybe<OrganizationArea>;
};

export enum OrganizationArea {
  Ib = 'IB',
  Zb = 'ZB'
}

export type ChainSwap = {
  __typename?: 'ChainSwap';
  id: Scalars['ID'];
  /** TODO why is this a string" */
  mechanic?: Maybe<Scalars['String']>;
  timeOfSwap?: Maybe<Scalars['Date']>;
  keyNumberOldAXAChain?: Maybe<Scalars['String']>;
};

/**
 * This type represents a piece of equipment that represents a real physical object.
 * The object must be unique. So it is possible to tell it apart from similar objects by a serial number.
 */
export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID'];
  serialNo: Scalars['String'];
  /** TODO unclear what this means. tomy fragen */
  investable?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  cargoBike?: Maybe<CargoBike>;
};

export type EquipmentCreateInput = {
  serialNo: Scalars['String'];
  /** TODO unclear what this means. tomy fragen */
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  investable?: Maybe<Scalars['Boolean']>;
  cargoBikeId?: Maybe<Scalars['ID']>;
};

export type EquipmentUpdateInput = {
  id: Scalars['ID'];
  serialNo?: Maybe<Scalars['String']>;
  /** TODO unclear what this means. tomy fragen */
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  investable?: Maybe<Scalars['Boolean']>;
  cargoBikeId?: Maybe<Scalars['ID']>;
};

/** An Event is a point in time, when the state of the bike somehow changed. */
export type BikeEvent = {
  __typename?: 'BikeEvent';
  id: Scalars['ID'];
  eventType: BikeEventType;
  cargoBike: CargoBike;
  date: Scalars['Date'];
  note?: Maybe<Scalars['String']>;
  /** Path to documents */
  documents: Array<Maybe<Scalars['String']>>;
};

export type BikeEventCreateInput = {
  eventType: BikeEventType;
  /** it is enough to pass the cargoBike id */
  cargoBikeId: Scalars['ID'];
  date: Scalars['Date'];
  note?: Maybe<Scalars['String']>;
  /** Path to documents */
  documents: Array<Maybe<Scalars['String']>>;
};

/** TODO: Some eventTypes are missing */
export enum BikeEventType {
  /**
   * The enum EventType can also be represented as an enum in postgresQL.
   * It is possible to add items to an enum in postgresQL without changing the source code.
   * However, it not possible to change the graphQL schema.
   * Concluding we should not use an enum here, if users want to add EventTypes to the enum.
   */
  Kauf = 'KAUF',
  Inbetriebnahme = 'INBETRIEBNAHME',
  Ausfall = 'AUSFALL',
  Wartung = 'WARTUNG',
  Andere = 'ANDERE'
}

/** How are the dimensions and how much weight can handle a bike. This data is merged in the CargoBike table and the BikeModel table. */
export type DimensionsAndLoad = {
  __typename?: 'DimensionsAndLoad';
  hasCoverBox: Scalars['Boolean'];
  lockable: Scalars['Boolean'];
  boxLength: Scalars['Float'];
  boxWidth: Scalars['Float'];
  boxHeight: Scalars['Float'];
  maxWeightBox: Scalars['Float'];
  maxWeightLuggageRack: Scalars['Float'];
  maxWeightTotal: Scalars['Float'];
  bikeLength: Scalars['Float'];
  bikeWidth?: Maybe<Scalars['Float']>;
  bikeHeight?: Maybe<Scalars['Float']>;
  bikeWeight?: Maybe<Scalars['Float']>;
};

export type DimensionsAndLoadCreateInput = {
  hasCoverBox: Scalars['Boolean'];
  lockable: Scalars['Boolean'];
  boxLength: Scalars['Float'];
  boxWidth: Scalars['Float'];
  boxHeight: Scalars['Float'];
  maxWeightBox: Scalars['Float'];
  maxWeightLuggageRack: Scalars['Float'];
  maxWeightTotal: Scalars['Float'];
  bikeLength: Scalars['Float'];
  bikeWidth?: Maybe<Scalars['Float']>;
  bikeHeight?: Maybe<Scalars['Float']>;
  bikeWeight?: Maybe<Scalars['Float']>;
};

export type DimensionsAndLoadUpdateInput = {
  hasCoverBox?: Maybe<Scalars['Boolean']>;
  lockable?: Maybe<Scalars['Boolean']>;
  boxLength?: Maybe<Scalars['Float']>;
  boxWidth?: Maybe<Scalars['Float']>;
  boxHeight?: Maybe<Scalars['Float']>;
  maxWeightBox?: Maybe<Scalars['Float']>;
  maxWeightLuggageRack?: Maybe<Scalars['Float']>;
  maxWeightTotal?: Maybe<Scalars['Float']>;
  bikeLength?: Maybe<Scalars['Float']>;
  bikeWidth?: Maybe<Scalars['Float']>;
  bikeHeight?: Maybe<Scalars['Float']>;
  bikeWeight?: Maybe<Scalars['Float']>;
};

/**
 * Some Technical Info about the bike.
 * This should be 1-1 Relation with the CargoBike.
 * So no id needed for mutation. One Mutation for the CargoBike will be enough.
 */
export type TechnicalEquipment = {
  __typename?: 'TechnicalEquipment';
  bicycleShift: Scalars['String'];
  isEBike: Scalars['Boolean'];
  hasLightSystem: Scalars['Boolean'];
  specialFeatures?: Maybe<Scalars['String']>;
};

export type TechnicalEquipmentCreateInput = {
  bicycleShift: Scalars['String'];
  isEBike: Scalars['Boolean'];
  hasLightSystem: Scalars['Boolean'];
  specialFeatures?: Maybe<Scalars['String']>;
};

export type TechnicalEquipmentUpdateInput = {
  bicycleShift?: Maybe<Scalars['String']>;
  isEBike?: Maybe<Scalars['Boolean']>;
  hasLightSystem?: Maybe<Scalars['Boolean']>;
  specialFeatures?: Maybe<Scalars['String']>;
};

/**
 * The Security Info about the bike.
 * his should be 1-1 Relation with the CargoBike.
 * So no id needed for mutation. One Mutation for the CargoBike will be enough.
 */
export type Security = {
  __typename?: 'Security';
  frameNumber: Scalars['String'];
  keyNumberFrameLock?: Maybe<Scalars['String']>;
  keyNumberAXAChain?: Maybe<Scalars['String']>;
  policeCoding?: Maybe<Scalars['String']>;
  adfcCoding?: Maybe<Scalars['String']>;
};

export type SecurityCreateInput = {
  frameNumber: Scalars['String'];
  keyNumberFrameLock?: Maybe<Scalars['String']>;
  keyNumberAXAChain?: Maybe<Scalars['String']>;
  policeCoding?: Maybe<Scalars['String']>;
  adfcCoding?: Maybe<Scalars['String']>;
};

export type SecurityUpdateInput = {
  frameNumber?: Maybe<Scalars['String']>;
  keyNumberFrameLock?: Maybe<Scalars['String']>;
  keyNumberAXAChain?: Maybe<Scalars['String']>;
  policeCoding?: Maybe<Scalars['String']>;
  adfcCoding?: Maybe<Scalars['String']>;
};

export enum StickerBikeNameState {
  Ok = 'OK',
  Improve = 'IMPROVE',
  Produced = 'PRODUCED',
  Noneed = 'NONEED',
  Missing = 'MISSING',
  Unknown = 'UNKNOWN'
}

/** (dt. Anbieter) */
export type Provider = {
  __typename?: 'Provider';
  id: Scalars['ID'];
  name: Scalars['String'];
  formularName?: Maybe<Scalars['String']>;
  providerContactPerson?: Maybe<Array<Maybe<ContactInformation>>>;
  isPrivatePerson: Scalars['Boolean'];
  organisation?: Maybe<Organisation>;
  cargoBikes: Array<Maybe<CargoBike>>;
};

export type ContactInformation = {
  __typename?: 'ContactInformation';
  id: Scalars['ID'];
  name: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  retiredAt?: Maybe<Scalars['Date']>;
  phoneExtern?: Maybe<Scalars['String']>;
  phone2Extern?: Maybe<Scalars['String']>;
  phoneIntern?: Maybe<Scalars['String']>;
  phone2Intern?: Maybe<Scalars['String']>;
  emailExtern?: Maybe<Scalars['String']>;
  emailIntern?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type ContactInformationCreateInput = {
  name: Scalars['String'];
  firstName: Scalars['String'];
  retiredAt?: Maybe<Scalars['Date']>;
  phoneExtern?: Maybe<Scalars['String']>;
  phone2Extern?: Maybe<Scalars['String']>;
  phoneIntern?: Maybe<Scalars['String']>;
  phone2Intern?: Maybe<Scalars['String']>;
  emailExtern?: Maybe<Scalars['String']>;
  emailIntern?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type ContactInformationUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  retiredAt?: Maybe<Scalars['Date']>;
  phoneExtern?: Maybe<Scalars['String']>;
  phone2Extern?: Maybe<Scalars['String']>;
  phoneIntern?: Maybe<Scalars['String']>;
  phone2Intern?: Maybe<Scalars['String']>;
  emailExtern?: Maybe<Scalars['String']>;
  emailIntern?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type ContactPerson = {
  __typename?: 'ContactPerson';
  id: Scalars['ID'];
  intern: Scalars['Boolean'];
  contactInformation: ContactInformation;
};

export type ContactPersonCreateInput = {
  intern: Scalars['Boolean'];
  contactInformationId: Scalars['ID'];
};

export type ContactPersonUpdateInput = {
  id: Scalars['ID'];
  intern?: Maybe<Scalars['Boolean']>;
  contactInformationId?: Maybe<Scalars['ID']>;
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['ID'];
  address?: Maybe<Address>;
  /** (dt. Ausleihstation) */
  lendingStations?: Maybe<Array<Maybe<LendingStation>>>;
  /** registration number of association */
  associationNo?: Maybe<Scalars['String']>;
  /** If Club, at what court registered */
  registeredAt?: Maybe<Scalars['String']>;
  provider?: Maybe<Provider>;
  otherdata?: Maybe<Scalars['String']>;
};

/** (dt. Standort) */
export type LendingStation = {
  __typename?: 'LendingStation';
  id: Scalars['ID'];
  name: Scalars['String'];
  contactPersons: Array<Maybe<ContactPerson>>;
  address: Address;
  timeFrames: Array<Maybe<TimeFrame>>;
  loanPeriods?: Maybe<LoanPeriods>;
  cargoBikes?: Maybe<Array<Maybe<CargoBike>>>;
  /** Totola Amount of cargoBikes currently assigned to the lending station */
  numCargoBikes: Scalars['Int'];
};

export type LendingStationCreateInput = {
  name: Scalars['String'];
  contactInformation: Array<Maybe<ContactInformationCreateInput>>;
  address: AddressCreateInput;
  loanPeriods?: Maybe<LoanPeriodsInput>;
  timeFrames: Array<Maybe<TimeFrameCreateInput>>;
};

export type LendingStationUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  contactInformation?: Maybe<Array<Maybe<ContactInformationUpdateInput>>>;
  address?: Maybe<AddressUpdateInput>;
  loanPeriods?: Maybe<LoanPeriodsInput>;
  timeFrames?: Maybe<Array<Maybe<TimeFrameUpdateInput>>>;
};

/** (dt. Ausleihzeiten) not implemented */
export type LoanPeriods = {
  __typename?: 'LoanPeriods';
  generalRemark?: Maybe<Scalars['String']>;
  /** notes for each day of the week, starting on Monday */
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * Loan times from and until for each day of the week.
   * Starting with Monday from, Monday to, Tuesday from, ..., Sunday to 
   */
  times?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** (dt. Ausleihzeiten) */
export type LoanPeriodsInput = {
  generalRemark?: Maybe<Scalars['String']>;
  /** notes for each day of the week, starting on Monday */
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * Loan times from and until for each day of the week.
   * Starting with Monday from, Monday to, Tuesday from, ..., Sunday to 
   */
  times?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** (dt. Zeitscheibe) */
export type TimeFrame = {
  __typename?: 'TimeFrame';
  id: Scalars['ID'];
  from: Scalars['Date'];
  to?: Maybe<Scalars['Date']>;
  note?: Maybe<Scalars['String']>;
  lendingStation: LendingStation;
  cargoBike: CargoBike;
};

export type TimeFrameCreateInput = {
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
  note?: Maybe<Scalars['String']>;
  lendingStationID?: Maybe<LendingStationCreateInput>;
  cargoBikeID?: Maybe<CargoBikeCreateInput>;
};

export type TimeFrameUpdateInput = {
  id: Scalars['ID'];
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
  note?: Maybe<Scalars['String']>;
  lendingStation?: Maybe<LendingStationUpdateInput>;
  cargoBike?: Maybe<CargoBikeUpdateInput>;
};

export type Address = {
  __typename?: 'Address';
  street: Scalars['String'];
  number: Scalars['String'];
  zip: Scalars['String'];
};

export type AddressCreateInput = {
  street: Scalars['String'];
  number: Scalars['String'];
  zip: Scalars['String'];
};

export type AddressUpdateInput = {
  street?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Will (evetually) return all properties of cargo bike */
  cargoBikeById?: Maybe<CargoBike>;
  /** returns cargoBikes ordered by name ascending, relations are not loaded, use cargoBikeById instead */
  cargoBikes: Array<Maybe<CargoBike>>;
  /** return null if id not found */
  providerById?: Maybe<Provider>;
  /** unique equipment with pagination, contains relation to bike (with no further joins), so if you wanna know more about the bike, use cargoBikeById */
  equipment: Array<Maybe<Equipment>>;
  /** equipment by id, will return null if id not found */
  equipmentById?: Maybe<Equipment>;
  providers: Array<Maybe<Provider>>;
  /** particcipant by id */
  participantById?: Maybe<Participant>;
  /** p */
  participants: Array<Maybe<Participant>>;
  lendingStationById?: Maybe<LendingStation>;
  lendingStations: Array<Maybe<LendingStation>>;
  contactInformation: Array<Maybe<ContactInformation>>;
  /** returns BikeEvent with CargoBike */
  bikeEventById: BikeEvent;
};


export type QueryCargoBikeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCargoBikesArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryProviderByIdArgs = {
  id: Scalars['ID'];
};


export type QueryEquipmentArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryEquipmentByIdArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantByIdArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryLendingStationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryLendingStationsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryBikeEventByIdArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** creates new cargoBike and returns cargobike with new ID */
  createCargoBike: CargoBike;
  /** lock cargoBike returns true if bike is not locked or if it doesnt exist */
  lockCargoBikeById: Scalars['Boolean'];
  /** updates cargoBike of given ID with supplied fields and returns updated cargoBike */
  updateCargoBike: CargoBike;
  /** creates new peace of unique Equipment */
  createEquipment: Equipment;
  /** lock equipment returns true if bike is not locked or if it doesnt exist */
  lockEquipmentById: Scalars['Boolean'];
  /** update Equipment, returns updated equipment. CargoBike will be null, if cargoBikeId is not set. Pass null for cargoBikeIs to delete the relation */
  updateEquipment: Equipment;
  /** creates new lendingStation and returns lendingStation with new ID */
  createLendingStation: LendingStation;
  /** updates lendingStation of given ID with supplied fields and returns updated lendingStation */
  updateLendingStation: LendingStation;
  /** creates new BikeEvent */
  createBikeEvent: BikeEvent;
  /** create participant */
  createParticipant: Participant;
  /** create new contactInfo */
  createContactInformation: ContactInformation;
  /** create Engagement */
  createEngagement: Engagement;
  /** createContacPerson ,return null if contactInformationId does not exist */
  createContactPerson?: Maybe<ContactPerson>;
  updateContactPerson?: Maybe<ContactPerson>;
};


export type MutationCreateCargoBikeArgs = {
  cargoBike: CargoBikeCreateInput;
};


export type MutationLockCargoBikeByIdArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCargoBikeArgs = {
  cargoBike: CargoBikeUpdateInput;
};


export type MutationCreateEquipmentArgs = {
  equipment: EquipmentCreateInput;
};


export type MutationLockEquipmentByIdArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateEquipmentArgs = {
  equipment: EquipmentUpdateInput;
};


export type MutationCreateLendingStationArgs = {
  lendingStation?: Maybe<LendingStationCreateInput>;
};


export type MutationUpdateLendingStationArgs = {
  lendingstation: LendingStationUpdateInput;
};


export type MutationCreateBikeEventArgs = {
  bikeEvent?: Maybe<BikeEventCreateInput>;
};


export type MutationCreateParticipantArgs = {
  participant: ParticipantCreateInput;
};


export type MutationCreateContactInformationArgs = {
  contactInformation: ContactInformationCreateInput;
};


export type MutationCreateEngagementArgs = {
  engagement?: Maybe<EngagementCreateInput>;
};


export type MutationCreateContactPersonArgs = {
  contactPerson?: Maybe<ContactPersonCreateInput>;
};


export type MutationUpdateContactPersonArgs = {
  contactPerson?: Maybe<ContactPersonUpdateInput>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetCargoBikeByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCargoBikeByIdQuery = (
  { __typename?: 'Query' }
  & { cargoBikeById?: Maybe<(
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsFragment
  )> }
);

export type UpdateCargoBikeMutationVariables = Exact<{
  bike: CargoBikeUpdateInput;
}>;


export type UpdateCargoBikeMutation = (
  { __typename?: 'Mutation' }
  & { updateCargoBike: (
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsFragment
  ) }
);

export type GetCargoBikesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCargoBikesQuery = (
  { __typename?: 'Query' }
  & { cargoBikes: Array<Maybe<(
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsFragment
  )>> }
);

export type CargoBikeFieldsMutableFragment = (
  { __typename?: 'CargoBike' }
  & Pick<CargoBike, 'id' | 'group' | 'name' | 'lockedBy' | 'lockedUntil' | 'numberOfChildren' | 'numberOfWheels'>
  & { insuranceData: (
    { __typename?: 'InsuranceData' }
    & Pick<InsuranceData, 'billing' | 'hasFixedRate'>
  ), dimensionsAndLoad: (
    { __typename?: 'DimensionsAndLoad' }
    & Pick<DimensionsAndLoad, 'bikeLength' | 'bikeWeight' | 'bikeHeight' | 'bikeWidth' | 'boxHeight' | 'boxLength' | 'boxWidth' | 'hasCoverBox' | 'lockable' | 'maxWeightBox' | 'maxWeightLuggageRack' | 'maxWeightTotal'>
  ), security: (
    { __typename?: 'Security' }
    & Pick<Security, 'frameNumber' | 'adfcCoding' | 'keyNumberAXAChain' | 'keyNumberFrameLock' | 'policeCoding'>
  ) }
);

export type CargoBikeFieldsFragment = (
  { __typename?: 'CargoBike' }
  & { bikeEvents?: Maybe<Array<Maybe<(
    { __typename?: 'BikeEvent' }
    & Pick<BikeEvent, 'date' | 'id'>
  )>>> }
  & CargoBikeFieldsMutableFragment
);

export const CargoBikeFieldsMutableFragmentDoc = gql`
    fragment CargoBikeFieldsMutable on CargoBike {
  id
  group
  name
  insuranceData {
    billing
    hasFixedRate
  }
  dimensionsAndLoad {
    bikeLength
    bikeWeight
    bikeHeight
    bikeWidth
    boxHeight
    boxLength
    boxWidth
    hasCoverBox
    lockable
    maxWeightBox
    maxWeightLuggageRack
    maxWeightTotal
  }
  numberOfChildren
  numberOfWheels
  security {
    frameNumber
    adfcCoding
    keyNumberAXAChain
    keyNumberFrameLock
    policeCoding
  }
  dimensionsAndLoad {
    bikeHeight
    bikeLength
    bikeWeight
    bikeWidth
    boxHeight
    boxLength
    boxWidth
    hasCoverBox
    lockable
    maxWeightBox
    maxWeightLuggageRack
    maxWeightTotal
  }
}
    `;
export const CargoBikeFieldsFragmentDoc = gql`
    fragment CargoBikeFields on CargoBike {
  ...CargoBikeFieldsMutable
  bikeEvents {
    date
    id
  }
}
    ${CargoBikeFieldsMutableFragmentDoc}`;
export const GetCargoBikeByIdDocument = gql`
    query GetCargoBikeById($id: ID!) {
  cargoBikeById(id: $id) {
    ...CargoBikeFields
  }
}
    ${CargoBikeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCargoBikeByIdGQL extends Apollo.Query<GetCargoBikeByIdQuery, GetCargoBikeByIdQueryVariables> {
    document = GetCargoBikeByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCargoBikeDocument = gql`
    mutation UpdateCargoBike($bike: CargoBikeUpdateInput!) {
  updateCargoBike(cargoBike: $bike) {
    ...CargoBikeFields
  }
}
    ${CargoBikeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCargoBikeGQL extends Apollo.Mutation<UpdateCargoBikeMutation, UpdateCargoBikeMutationVariables> {
    document = UpdateCargoBikeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCargoBikesDocument = gql`
    query GetCargoBikes {
  cargoBikes(limit: 100, offset: 0) {
    ...CargoBikeFields
  }
}
    ${CargoBikeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCargoBikesGQL extends Apollo.Query<GetCargoBikesQuery, GetCargoBikesQueryVariables> {
    document = GetCargoBikesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }