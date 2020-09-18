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
  events?: Maybe<Array<Maybe<BikeEvent>>>;
  equipment?: Maybe<Array<Maybe<Equipment>>>;
  /** Refers to equipment that is not unique. See kommentierte info tabelle -> Fragen -> Frage 2 */
  otherEquipment?: Maybe<Array<Maybe<Scalars['String']>>>;
  chainSwaps?: Maybe<Array<Maybe<ChainSwap>>>;
  /** Sticker State */
  stickerBikeNameState?: Maybe<StickerBikeNameState>;
  note?: Maybe<Scalars['String']>;
  provider?: Maybe<Provider>;
  coordinator?: Maybe<Participant>;
  insuranceData: InsuranceData;
  lendingstation?: Maybe<LendingStation>;
  taxes?: Maybe<Taxes>;
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['Date']>;
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
  otherEquipment?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Sticker State */
  stickerBikeNameState?: Maybe<StickerBikeNameState>;
  note?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  insuranceData: InsuranceDataCreateInput;
  taxes?: Maybe<TaxesCreateInput>;
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
  otherEquipment?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  hasFixedRate: Scalars['Boolean'];
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
  end: Scalars['Date'];
  mentor: ContactInformation;
  usernamefLotte?: Maybe<Scalars['String']>;
  usernameSlack?: Maybe<Scalars['String']>;
  memberADFC: Scalars['Boolean'];
  locationZIPs?: Maybe<Array<Maybe<Scalars['String']>>>;
  roleCoreTeam: Scalars['Boolean'];
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
  name?: Maybe<Scalars['String']>;
};

/** An Event is a point in time, when the state of the bike somehow changed. */
export type BikeEvent = {
  __typename?: 'BikeEvent';
  id: Scalars['ID'];
  eventType?: Maybe<BikeEventType>;
  date: Scalars['Date'];
  note?: Maybe<Scalars['String']>;
  /** Path to documents */
  documents?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** TODO: Some eventTypes are missing (und auf deutsch) */
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
  Wartung = 'WARTUNG'
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
  address?: Maybe<Address>;
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

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['ID'];
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
  contactInformation: Array<Maybe<ContactInformation>>;
  address: Address;
  loanTimes?: Maybe<LoanTimes>;
  loanPeriods: Array<Maybe<LoanPeriod>>;
};

export type LendingStationCreateInput = {
  name: Scalars['String'];
  contactInformation: Array<Maybe<ContactInformationCreateInput>>;
  address: AddressCreateInput;
  loanTimes?: Maybe<LoanTimesInput>;
  loanPeriods: Array<Maybe<LoanPeriodCreateInput>>;
};

export type LendingStationUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  contactInformation?: Maybe<Array<Maybe<ContactInformationUpdateInput>>>;
  address?: Maybe<AddressUpdateInput>;
  loanTimes?: Maybe<LoanTimesInput>;
  loanPeriods?: Maybe<Array<Maybe<LoanPeriodUpdateInput>>>;
};

/** (dt. Ausleihzeiten) */
export type LoanTimes = {
  __typename?: 'LoanTimes';
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
export type LoanTimesInput = {
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
export type LoanPeriod = {
  __typename?: 'LoanPeriod';
  id: Scalars['ID'];
  from: Scalars['Date'];
  to?: Maybe<Scalars['Date']>;
  note?: Maybe<Scalars['String']>;
  lendingStation: LendingStation;
  cargoBike: CargoBike;
};

export type LoanPeriodCreateInput = {
  from?: Maybe<Scalars['Date']>;
  to?: Maybe<Scalars['Date']>;
  note?: Maybe<Scalars['String']>;
  lendingStationID?: Maybe<LendingStationCreateInput>;
  cargoBikeID?: Maybe<CargoBikeCreateInput>;
};

export type LoanPeriodUpdateInput = {
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
  cargoBikeById?: Maybe<CargoBike>;
  /** returns all cargoBikes */
  cargoBikes: Array<Maybe<CargoBike>>;
  /** not important, you can just use providerById {cargoBikes} */
  cargoBikesByProvider: Array<Maybe<CargoBike>>;
  providerById?: Maybe<Provider>;
  providers: Array<Maybe<Provider>>;
  participantById?: Maybe<Participant>;
  participants: Array<Maybe<Participant>>;
  lendingStationById?: Maybe<LendingStation>;
  lendingStations: Array<Maybe<LendingStation>>;
  contactInformation: Array<Maybe<ContactInformation>>;
};


export type QueryCargoBikeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCargoBikesByProviderArgs = {
  providerId: Scalars['ID'];
};


export type QueryProviderByIdArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantByIdArgs = {
  id: Scalars['ID'];
};


export type QueryLendingStationByIdArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** for testing */
  addBike: CargoBike;
  /** creates new cargoBike and returns cargobike with new ID */
  createCargoBike: CargoBike;
  /** updates cargoBike of given ID with supplied fields and returns updated cargoBike */
  updateCargoBike: CargoBike;
  /** creates new lendingStation and returns lendingStation with new ID */
  createLendingStation: LendingStation;
  /** updates lendingStation of given ID with supplied fields and returns updated lendingStation */
  updateLendingStation: LendingStation;
};


export type MutationAddBikeArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};


export type MutationCreateCargoBikeArgs = {
  cargoBike: CargoBikeCreateInput;
};


export type MutationUpdateCargoBikeArgs = {
  cargoBike: CargoBikeUpdateInput;
};


export type MutationCreateLendingStationArgs = {
  lendingStation?: Maybe<LendingStationCreateInput>;
};


export type MutationUpdateLendingStationArgs = {
  lendingstation: LendingStationUpdateInput;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type BikesQueryVariables = Exact<{ [key: string]: never; }>;


export type BikesQuery = (
  { __typename?: 'Query' }
  & { cargoBikes: Array<Maybe<(
    { __typename?: 'CargoBike' }
    & Pick<CargoBike, 'id' | 'name'>
    & { events?: Maybe<Array<Maybe<(
      { __typename?: 'BikeEvent' }
      & Pick<BikeEvent, 'date'>
    )>>>, insuranceData: (
      { __typename?: 'InsuranceData' }
      & Pick<InsuranceData, 'billing'>
    ), dimensionsAndLoad: (
      { __typename?: 'DimensionsAndLoad' }
      & Pick<DimensionsAndLoad, 'bikeLength' | 'bikeWeight'>
    ) }
  )>> }
);

export const BikesDocument = gql`
    query Bikes {
  cargoBikes {
    id
    name
    events {
      date
    }
    insuranceData {
      billing
    }
    dimensionsAndLoad {
      bikeLength
      bikeWeight
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BikesGQL extends Apollo.Query<BikesQuery, BikesQueryVariables> {
    document = BikesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }