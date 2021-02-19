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
  /** date object YYYY-MM-dd */
  Date: any;
  /** timestamp object YYYY-MM-ddThh:mm:ss.sssZ */
  DateTime: any;
  /** only time hh-mm-ss */
  Time: any;
  /**
   * is of american format [-]$[0-9]+.[0-9][0-9]
   * commas every three digits and . for decimals with 2 digits after the .
   * There can be a leading  -.
   * There is a currency signe at the first position or second position if - is set.
   * The kind of currency depends on the database.
   */
  Money: any;
  Link: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};








/** The CargoBike type is central to the graph. You could call it the root. */
export type CargoBike = {
  __typename?: 'CargoBike';
  id: Scalars['ID'];
  /** see column A in info tabelle */
  group: Group;
  name: Scalars['String'];
  state?: Maybe<BikeState>;
  modelName?: Maybe<Scalars['String']>;
  numberOfWheels?: Maybe<Scalars['Int']>;
  forCargo?: Maybe<Scalars['Boolean']>;
  forChildren?: Maybe<Scalars['Boolean']>;
  numberOfChildren?: Maybe<Scalars['Int']>;
  /**
   * Safety is a custom type, that stores information about security features.
   * TODO: Should this be called Security?
   */
  security?: Maybe<Security>;
  spareKeyLocations?: Maybe<SpareKeyLocations>;
  /** Does not refer to an extra table in the database. */
  technicalEquipment?: Maybe<TechnicalEquipment>;
  /** Does not refer to an extra table in the database. */
  dimensionsAndLoad?: Maybe<DimensionsAndLoad>;
  /** If offset or limit is not provided, both values are ignored */
  bikeEvents?: Maybe<Array<Maybe<BikeEvent>>>;
  /** If offset or limit is not provided, both values are ignored */
  equipment?: Maybe<Array<Maybe<Equipment>>>;
  /** Refers to equipment that is not unique. See kommentierte info tabelle -> Fragen -> Frage 2 */
  equipmentType?: Maybe<Array<Maybe<EquipmentType>>>;
  /** Sticker State */
  stickerBikeNameState?: Maybe<StickerBikeNameState>;
  note?: Maybe<Scalars['String']>;
  provider?: Maybe<Provider>;
  /** all participants currently engaged with the cargoBike */
  participants?: Maybe<Array<Maybe<Participant>>>;
  insuranceData?: Maybe<InsuranceData>;
  lendingStation?: Maybe<LendingStation>;
  taxes?: Maybe<Taxes>;
  miscellaneous?: Maybe<Scalars['String']>;
  ownUse?: Maybe<Scalars['String']>;
  preDamage?: Maybe<Scalars['String']>;
  currentEngagements?: Maybe<Array<Maybe<Engagement>>>;
  /** If offset or limit is not provided, both values are ignored */
  engagement?: Maybe<Array<Maybe<Engagement>>>;
  timeFrames?: Maybe<Array<Maybe<TimeFrame>>>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};


/** The CargoBike type is central to the graph. You could call it the root. */
export type CargoBikeBikeEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


/** The CargoBike type is central to the graph. You could call it the root. */
export type CargoBikeEquipmentArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


/** The CargoBike type is central to the graph. You could call it the root. */
export type CargoBikeEngagementArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

/** Status of the CargoBike. More fields will be added, or removed. */
export enum BikeState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Inpreparation = 'INPREPARATION'
}

/** if you want to add bike to a lending station, create a new timeFrame with to: Date = null */
export type CargoBikeCreateInput = {
  /** see column A in info tabelle */
  group: Group;
  name: Scalars['String'];
  state?: Maybe<BikeState>;
  modelName?: Maybe<Scalars['String']>;
  numberOfWheels?: Maybe<Scalars['Int']>;
  forCargo?: Maybe<Scalars['Boolean']>;
  forChildren?: Maybe<Scalars['Boolean']>;
  numberOfChildren?: Maybe<Scalars['Int']>;
  /** Safety is a custom type, that stores information about security features. */
  security?: Maybe<SecurityCreateInput>;
  spareKeyLocations?: Maybe<SpareKeyLocationsCreateInput>;
  /** Does not refer to an extra table in the database. */
  technicalEquipment?: Maybe<TechnicalEquipmentCreateInput>;
  /** Does not refer to an extra table in the database. */
  dimensionsAndLoad?: Maybe<DimensionsAndLoadCreateInput>;
  /**
   * Refers to equipment that is not unique. See kommentierte info tabelle -> Fragen -> Frage 2
   * When set to null or [], no relations will be added.
   */
  equipmentTypeIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /**
   * Refers to unique equipment
   * When set to null or [], no relations will be added.
   * When specified id is in a relation with another bike, this relation will be deleted.
   */
  equipmentIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Sticker State */
  stickerBikeNameState?: Maybe<StickerBikeNameState>;
  note?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['ID']>;
  insuranceData?: Maybe<InsuranceDataCreateInput>;
  taxes?: Maybe<TaxesCreateInput>;
  miscellaneous?: Maybe<Scalars['String']>;
  ownUse?: Maybe<Scalars['String']>;
  preDamage?: Maybe<Scalars['String']>;
};

/** If you want to add bike to a lending station, create a new timeFrame with to: Date = null */
export type CargoBikeUpdateInput = {
  id: Scalars['ID'];
  /** see column A in info tabelle */
  group?: Maybe<Group>;
  name?: Maybe<Scalars['String']>;
  state?: Maybe<BikeState>;
  modelName?: Maybe<Scalars['String']>;
  numberOfWheels?: Maybe<Scalars['Int']>;
  forCargo?: Maybe<Scalars['Boolean']>;
  forChildren?: Maybe<Scalars['Boolean']>;
  numberOfChildren?: Maybe<Scalars['Int']>;
  /** Safety is a custom type, that stores information about security features. */
  security?: Maybe<SecurityUpdateInput>;
  spareKeyLocations?: Maybe<SpareKeyLocationsUpdateInput>;
  /** Does not refer to an extra table in the database. */
  technicalEquipment?: Maybe<TechnicalEquipmentUpdateInput>;
  /** Does not refer to an extra table in the database. */
  dimensionsAndLoad?: Maybe<DimensionsAndLoadUpdateInput>;
  /**
   * Refers to equipment that is not unique. See kommentierte info tabelle -> Fragen -> Frage 2
   * When set to null, field will be ignored.
   * When set to [], all relations will be deleted.
   * Else all realtions will be deleted and the specified relations will be added.
   */
  equipmentTypeIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /**
   * Refers to unique equipment
   * When set to null, field will be ignored.
   * When set to [], all relations will be deleted.
   * Else all realtions will be deleted and the specified relations will be added.
   * When specified id is in a relation with another bike, this relation will be deleted.
   */
  equipmentIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Sticker State */
  stickerBikeNameState?: Maybe<StickerBikeNameState>;
  note?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['ID']>;
  insuranceData?: Maybe<InsuranceDataUpdateInput>;
  taxes?: Maybe<TaxesUpdateInput>;
  miscellaneous?: Maybe<Scalars['String']>;
  ownUse?: Maybe<Scalars['String']>;
  preDamage?: Maybe<Scalars['String']>;
  /** will keep Bike locked if set to true, default = false */
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type InsuranceData = {
  __typename?: 'InsuranceData';
  /** Eventually, this field will become an enum or a separate data table and user can choose from a pool of insurance companies. */
  name?: Maybe<Scalars['String']>;
  benefactor?: Maybe<Scalars['String']>;
  billing?: Maybe<Scalars['String']>;
  noPnP?: Maybe<Scalars['String']>;
  /** eg. Anbieter, flotte, eigenleistung */
  maintenanceResponsible?: Maybe<Scalars['String']>;
  maintenanceBenefactor?: Maybe<Scalars['String']>;
  maintenanceAgreement?: Maybe<Scalars['String']>;
  hasFixedRate?: Maybe<Scalars['Boolean']>;
  fixedRate?: Maybe<Scalars['Float']>;
  /**
   * Projektzuschuss:
   * is of american format [-]$[0-9]+.[0-9][0-9]
   * commas every three digits and . for decimals with 2 digits after the .
   * There can be a leading  -.
   * There is a currency signe at the first position or second position if - is set.
   * The kind of currency depends on the database.
   */
  projectAllowance?: Maybe<Scalars['Money']>;
  frameworkAgreement?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type InsuranceDataCreateInput = {
  /** Eventually, this field will become an enum or a separate data table and user can choose from a pool of insurance companies. */
  name?: Maybe<Scalars['String']>;
  benefactor?: Maybe<Scalars['String']>;
  billing?: Maybe<Scalars['String']>;
  noPnP?: Maybe<Scalars['String']>;
  /** eg. Anbieter, flotte, eigenleistung */
  maintenanceResponsible?: Maybe<Scalars['String']>;
  maintenanceBenefactor?: Maybe<Scalars['String']>;
  maintenanceAgreement?: Maybe<Scalars['String']>;
  hasFixedRate?: Maybe<Scalars['Boolean']>;
  fixedRate?: Maybe<Scalars['Float']>;
  /**
   * Projektzuschuss:
   * must be of format [+|-][$][0-9]*[.[0-9]*]
   * commas are ignored, non numeric values except , and . lead to errors
   * There can be a leading + or -.
   * You can pass a currency signe at the first position or second position of + or - is set.
   * The kind of currency depends on the database.
   */
  projectAllowance?: Maybe<Scalars['Money']>;
  frameworkAgreement?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type InsuranceDataUpdateInput = {
  /** Eventually, this field will become an enum or a separate data table and user can choose from a pool of insurance companies. */
  name?: Maybe<Scalars['String']>;
  benefactor?: Maybe<Scalars['String']>;
  billing?: Maybe<Scalars['String']>;
  noPnP?: Maybe<Scalars['String']>;
  /** eg. Anbieter, flotte, eigenleistung */
  maintenanceResponsible?: Maybe<Scalars['String']>;
  maintenanceBenefactor?: Maybe<Scalars['String']>;
  maintenanceAgreement?: Maybe<Scalars['String']>;
  hasFixedRate?: Maybe<Scalars['Boolean']>;
  fixedRate?: Maybe<Scalars['Float']>;
  /**
   * Projektzuschuss:
   * must be of format [+|-][$][0-9]*[.[0-9]*]
   * commas are ignored, non numeric values except , and . lead to errors
   * There can be a leading + or -.
   * You can pass a currency signe at the first position or second position of + or - is set.
   * The kind of currency depends on the database.
   */
  projectAllowance?: Maybe<Scalars['Money']>;
  frameworkAgreement?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type NumRange = {
  __typename?: 'NumRange';
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
};

/**
 * If min or max is omitted, the omitted value will be the same as the other given value
 * So if you pass one as null, both values with be over written with null.
 */
export type NumRangeInput = {
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
};

/** How are the dimensions and how much weight can handle a bike. This data is merged in the CargoBike table and the BikeModel table. */
export type DimensionsAndLoad = {
  __typename?: 'DimensionsAndLoad';
  hasCoverBox?: Maybe<Scalars['Boolean']>;
  /** cover box can be locked */
  lockable?: Maybe<Scalars['Boolean']>;
  boxLengthRange?: Maybe<NumRange>;
  boxWidthRange?: Maybe<NumRange>;
  boxHeightRange?: Maybe<NumRange>;
  maxWeightBox?: Maybe<Scalars['Float']>;
  maxWeightLuggageRack?: Maybe<Scalars['Float']>;
  maxWeightTotal?: Maybe<Scalars['Float']>;
  bikeLength?: Maybe<Scalars['Float']>;
  bikeWidth?: Maybe<Scalars['Float']>;
  bikeHeight?: Maybe<Scalars['Float']>;
  bikeWeight?: Maybe<Scalars['Float']>;
};

export type DimensionsAndLoadCreateInput = {
  hasCoverBox?: Maybe<Scalars['Boolean']>;
  lockable?: Maybe<Scalars['Boolean']>;
  boxLengthRange?: Maybe<NumRangeInput>;
  boxWidthRange?: Maybe<NumRangeInput>;
  boxHeightRange?: Maybe<NumRangeInput>;
  maxWeightBox?: Maybe<Scalars['Float']>;
  maxWeightLuggageRack?: Maybe<Scalars['Float']>;
  maxWeightTotal?: Maybe<Scalars['Float']>;
  bikeLength?: Maybe<Scalars['Float']>;
  bikeWidth?: Maybe<Scalars['Float']>;
  bikeHeight?: Maybe<Scalars['Float']>;
  bikeWeight?: Maybe<Scalars['Float']>;
};

export type DimensionsAndLoadUpdateInput = {
  hasCoverBox?: Maybe<Scalars['Boolean']>;
  lockable?: Maybe<Scalars['Boolean']>;
  boxLengthRange?: Maybe<NumRangeInput>;
  boxWidthRange?: Maybe<NumRangeInput>;
  boxHeightRange?: Maybe<NumRangeInput>;
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
  bicycleShift?: Maybe<Scalars['String']>;
  isEBike?: Maybe<Scalars['Boolean']>;
  hasLightSystem?: Maybe<Scalars['Boolean']>;
  specialFeatures?: Maybe<Scalars['String']>;
};

export type TechnicalEquipmentCreateInput = {
  bicycleShift?: Maybe<Scalars['String']>;
  isEBike?: Maybe<Scalars['Boolean']>;
  hasLightSystem?: Maybe<Scalars['Boolean']>;
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
  frameNumber?: Maybe<Scalars['String']>;
  keyNumberFrameLock?: Maybe<Scalars['String']>;
  keyNumberAXAChain?: Maybe<Scalars['String']>;
  policeCoding?: Maybe<Scalars['String']>;
  adfcCoding?: Maybe<Scalars['String']>;
};

export type SecurityCreateInput = {
  frameNumber?: Maybe<Scalars['String']>;
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

/** Locations where spare keys are stored */
export type SpareKeyLocations = {
  __typename?: 'SpareKeyLocations';
  projectOffice?: Maybe<Scalars['Boolean']>;
  lendingStation?: Maybe<Scalars['Boolean']>;
  provider?: Maybe<Scalars['Boolean']>;
};

export type SpareKeyLocationsCreateInput = {
  projectOffice?: Maybe<Scalars['Boolean']>;
  lendingStation?: Maybe<Scalars['Boolean']>;
  provider?: Maybe<Scalars['Boolean']>;
};

export type SpareKeyLocationsUpdateInput = {
  projectOffice?: Maybe<Scalars['Boolean']>;
  lendingStation?: Maybe<Scalars['Boolean']>;
  provider?: Maybe<Scalars['Boolean']>;
};

export enum StickerBikeNameState {
  Ok = 'OK',
  Improve = 'IMPROVE',
  Produced = 'PRODUCED',
  Noneed = 'NONEED',
  Missing = 'MISSING',
  Unknown = 'UNKNOWN'
}

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

/** A participant in the organization */
export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  dateRange: DateRange;
  contactInformation: ContactInformation;
  usernamefLotte?: Maybe<Scalars['String']>;
  usernameSlack?: Maybe<Scalars['String']>;
  memberADFC: Scalars['Boolean'];
  locationZIPs: Array<Maybe<Scalars['String']>>;
  memberCoreTeam: Scalars['Boolean'];
  /**
   * Note the kommentierte Infodaten Tabelle.
   * This value is calculated form other values.
   * It is true, if the person is not on the black list and not retired
   * and is either Mentor dt. Pate or Partner Mentor dt. Partnerpate for at least one bike.
   * Note: this will always be false for the moment.
   */
  distributedActiveBikeParte: Scalars['Boolean'];
  engagement?: Maybe<Array<Maybe<Engagement>>>;
  workshops?: Maybe<Array<Maybe<Workshop>>>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type ParticipantCreateInput = {
  /** if not set, CURRENT_DATE will be used */
  dateRange: DateRangeInput;
  /** must create contactinformation first, if you want to use new */
  contactInformationId: Scalars['ID'];
  usernamefLotte?: Maybe<Scalars['String']>;
  usernameSlack?: Maybe<Scalars['String']>;
  /** default: false */
  memberADFC: Scalars['Boolean'];
  locationZIPs: Array<Maybe<Scalars['String']>>;
  /** default: false */
  memberCoreTeam?: Maybe<Scalars['Boolean']>;
  workshopIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type ParticipantUpdateInput = {
  id: Scalars['ID'];
  dateRange?: Maybe<DateRangeInput>;
  /** must create contactinformation first, if you want to use new */
  contactInformationId?: Maybe<Scalars['ID']>;
  usernamefLotte?: Maybe<Scalars['String']>;
  usernameSlack?: Maybe<Scalars['String']>;
  /** default: false */
  memberADFC?: Maybe<Scalars['Boolean']>;
  locationZIPs?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** default: false */
  memberCoreTeam?: Maybe<Scalars['Boolean']>;
  workshopIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

/** A workshop event */
export type Workshop = {
  __typename?: 'Workshop';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['Date'];
  workshopType: WorkshopType;
  trainer1: Participant;
  trainer2?: Maybe<Participant>;
  participants?: Maybe<Array<Maybe<Participant>>>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type WorkshopCreateInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  workshopTypeId: Scalars['ID'];
  trainer1Id: Scalars['ID'];
  trainer2Id?: Maybe<Scalars['ID']>;
};

export type WorkshopUpdateInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  workshopTypeId?: Maybe<Scalars['ID']>;
  trainer1Id?: Maybe<Scalars['ID']>;
  trainer2Id?: Maybe<Scalars['ID']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type WorkshopType = {
  __typename?: 'WorkshopType';
  id: Scalars['ID'];
  name: Scalars['String'];
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type WorkshopTypeCreateInput = {
  name: Scalars['String'];
};

export type WorkshopTypeUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type EngagementType = {
  __typename?: 'EngagementType';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type EngagementTypeCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type EngagementTypeUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type Engagement = {
  __typename?: 'Engagement';
  id: Scalars['ID'];
  engagementType: EngagementType;
  dateRange: DateRange;
  participant: Participant;
  cargoBike: CargoBike;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type EngagementCreateInput = {
  engagementTypeId: Scalars['ID'];
  dateRange: DateRangeInput;
  participantId: Scalars['ID'];
  cargoBikeId: Scalars['ID'];
};

export type EngagementUpdateInput = {
  id: Scalars['ID'];
  engagementTypeId?: Maybe<Scalars['ID']>;
  dateRange?: Maybe<DateRangeInput>;
  participantId?: Maybe<Scalars['ID']>;
  cargoBikeId?: Maybe<Scalars['ID']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type Taxes = {
  __typename?: 'Taxes';
  costCenter?: Maybe<Scalars['String']>;
  organisationArea?: Maybe<OrganisationArea>;
};

export type TaxesCreateInput = {
  costCenter?: Maybe<Scalars['String']>;
  organisationArea?: Maybe<OrganisationArea>;
};

export type TaxesUpdateInput = {
  costCenter?: Maybe<Scalars['String']>;
  organisationArea?: Maybe<OrganisationArea>;
};

export enum OrganisationArea {
  Ib = 'IB',
  Zb = 'ZB'
}

/**
 * This type represents a piece of equipment that represents a real physical object.
 * The object must be unique. So it is possible to tell it apart from similar objects by a serial number.
 */
export type Equipment = {
  __typename?: 'Equipment';
  id: Scalars['ID'];
  serialNo: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  cargoBike?: Maybe<CargoBike>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type EquipmentCreateInput = {
  serialNo: Scalars['String'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  cargoBikeId?: Maybe<Scalars['ID']>;
};

export type EquipmentUpdateInput = {
  id: Scalars['ID'];
  serialNo?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  cargoBikeId?: Maybe<Scalars['ID']>;
  /** will keep Bike locked if set to true, default = false */
  keepLock?: Maybe<Scalars['Boolean']>;
};

/**
 * A type of equipment that is not being tracked but can be assigned
 * to any bike.
 */
export type EquipmentType = {
  __typename?: 'EquipmentType';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type EquipmentTypeCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type EquipmentTypeUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

/** An Event is a point in time concerning one cargo bike of an event type. For example a chain swap. */
export type BikeEvent = {
  __typename?: 'BikeEvent';
  id: Scalars['ID'];
  bikeEventType: BikeEventType;
  cargoBike: CargoBike;
  responsible?: Maybe<Participant>;
  related?: Maybe<Participant>;
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  /** Path to documents */
  documents: Array<Scalars['Link']>;
  remark?: Maybe<Scalars['String']>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type BikeEventCreateInput = {
  bikeEventTypeId: Scalars['ID'];
  cargoBikeId: Scalars['ID'];
  responsibleId?: Maybe<Scalars['ID']>;
  relatedId?: Maybe<Scalars['ID']>;
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  /** Path to documents */
  documents?: Maybe<Array<Maybe<Scalars['Link']>>>;
  remark?: Maybe<Scalars['String']>;
};

export type BikeEventUpdateInput = {
  id: Scalars['ID'];
  bikeEventTypeId?: Maybe<Scalars['ID']>;
  cargoBikeId?: Maybe<Scalars['ID']>;
  responsibleId?: Maybe<Scalars['ID']>;
  relatedId?: Maybe<Scalars['ID']>;
  date?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  /** Path to documents */
  documents?: Maybe<Array<Maybe<Scalars['Link']>>>;
  remark?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type BikeEventType = {
  __typename?: 'BikeEventType';
  id: Scalars['ID'];
  name: Scalars['String'];
  isLockedByMe: Scalars['Boolean'];
  isLocked: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type BikeEventTypeUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type BikeEventTypeCreateInput = {
  name: Scalars['String'];
};

/** (dt. Anbieter) bezieht sich auf die Beziehung einer Person oder Organisation zum Lastenrad */
export type Provider = {
  __typename?: 'Provider';
  id: Scalars['ID'];
  formName?: Maybe<Scalars['String']>;
  privatePerson?: Maybe<ContactInformation>;
  organisation?: Maybe<Organisation>;
  cargoBikes?: Maybe<Array<CargoBike>>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

/** (dt. Anbieter) */
export type ProviderCreateInput = {
  formName?: Maybe<Scalars['String']>;
  privatePersonId?: Maybe<Scalars['ID']>;
  organisationId?: Maybe<Scalars['ID']>;
  cargoBikeIds?: Maybe<Array<Scalars['ID']>>;
};

export type ProviderUpdateInput = {
  id: Scalars['ID'];
  formName?: Maybe<Scalars['String']>;
  privatePersonId?: Maybe<Scalars['ID']>;
  organisationId?: Maybe<Scalars['ID']>;
  /** cargoBikes are added, you can not take existing relations away. use update cargoBike or add bike to another provider instead */
  cargoBikeIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

/**
 * A Person can have several instances of contact information.
 * The reason for this is, that some people have info for interns and externals that are different.
 */
export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  name: Scalars['String'];
  firstName: Scalars['String'];
  contactInformation?: Maybe<Array<ContactInformation>>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type PersonCreateInput = {
  name: Scalars['String'];
  firstName: Scalars['String'];
};

export type PersonUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type ContactInformation = {
  __typename?: 'ContactInformation';
  id: Scalars['ID'];
  person: Person;
  phone?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email2?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type ContactInformationCreateInput = {
  personId: Scalars['ID'];
  phone?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email2?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type ContactInformationUpdateInput = {
  id: Scalars['ID'];
  personId?: Maybe<Scalars['ID']>;
  phone?: Maybe<Scalars['String']>;
  phone2?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email2?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['ID'];
  name: Scalars['String'];
  address?: Maybe<Address>;
  /** (dt. Ausleihstation) */
  lendingStations?: Maybe<Array<LendingStation>>;
  /** registration number of association */
  associationNo?: Maybe<Scalars['String']>;
  /** If Club, at what court registered */
  registeredAt?: Maybe<Scalars['String']>;
  provider?: Maybe<Provider>;
  contactInformation?: Maybe<ContactInformation>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type OrganisationCreateInput = {
  address: AddressCreateInput;
  name: Scalars['String'];
  /** registration number of association */
  associationNo?: Maybe<Scalars['String']>;
  /** If Club, at what court registered */
  registeredAt?: Maybe<Scalars['String']>;
  contactInformationId?: Maybe<Scalars['ID']>;
};

export type OrganisationUpdateInput = {
  id: Scalars['ID'];
  address?: Maybe<AddressCreateInput>;
  name?: Maybe<Scalars['String']>;
  /** registration number of association */
  associationNo?: Maybe<Scalars['String']>;
  /** If Club, at what court registered */
  registeredAt?: Maybe<Scalars['String']>;
  contactInformationId?: Maybe<Scalars['ID']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

/** (dt. Standort) */
export type LendingStation = {
  __typename?: 'LendingStation';
  id: Scalars['ID'];
  name: Scalars['String'];
  longName: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  contactInformationIntern?: Maybe<ContactInformation>;
  contactInformationExtern?: Maybe<ContactInformation>;
  address: Address;
  timeFrames: Array<TimeFrame>;
  loanPeriod?: Maybe<LoanPeriod>;
  cargoBikes?: Maybe<Array<CargoBike>>;
  /** Total amount of cargoBikes currently assigned to the lending station */
  numCargoBikes: Scalars['Int'];
  organisation?: Maybe<Organisation>;
  remark?: Maybe<Scalars['String']>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

/** If you want to create LendingStation with cargoBikes, use createTimeFrame and set to: Date = null */
export type LendingStationCreateInput = {
  name: Scalars['String'];
  longName: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  contactInformationInternId?: Maybe<Scalars['ID']>;
  contactInformationExternId?: Maybe<Scalars['ID']>;
  address: AddressCreateInput;
  loanPeriod?: Maybe<LoanPeriodInput>;
  organisationId?: Maybe<Scalars['ID']>;
  remark?: Maybe<Scalars['String']>;
};

/** If you want to create LendingStation with cargoBikes, use createTimeFrame and set to: Date = null */
export type LendingStationUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  longName?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  contactInformationInternId?: Maybe<Scalars['ID']>;
  contactInformationExternId?: Maybe<Scalars['ID']>;
  address?: Maybe<AddressUpdateInput>;
  loanPeriod?: Maybe<LoanPeriodInput>;
  organisationId?: Maybe<Scalars['ID']>;
  remark?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

/** (dt. Ausleihzeiten) not implemented */
export type LoanPeriod = {
  __typename?: 'LoanPeriod';
  generalRemark?: Maybe<Scalars['String']>;
  particularities?: Maybe<Scalars['String']>;
  holidays?: Maybe<Scalars['String']>;
  mo?: Maybe<Scalars['String']>;
  tu?: Maybe<Scalars['String']>;
  we?: Maybe<Scalars['String']>;
  th?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  sa?: Maybe<Scalars['String']>;
  su?: Maybe<Scalars['String']>;
};

/** (dt. Ausleihzeiten) */
export type LoanPeriodInput = {
  generalRemark?: Maybe<Scalars['String']>;
  particularities?: Maybe<Scalars['String']>;
  holidays?: Maybe<Scalars['String']>;
  mo?: Maybe<Scalars['String']>;
  tu?: Maybe<Scalars['String']>;
  we?: Maybe<Scalars['String']>;
  th?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  sa?: Maybe<Scalars['String']>;
  su?: Maybe<Scalars['String']>;
};

export type DateRange = {
  __typename?: 'DateRange';
  from: Scalars['Date'];
  /** will be infinity of not omitted */
  to?: Maybe<Scalars['Date']>;
};

export type DateRangeInput = {
  /** format YYYY-MM-dd */
  from: Scalars['Date'];
  /**
   * format YYYY-MM-dd
   * will be infinity of not omitted
   */
  to?: Maybe<Scalars['Date']>;
};

/** (dt. Zeitscheibe) When was a bike where */
export type TimeFrame = {
  __typename?: 'TimeFrame';
  id: Scalars['ID'];
  dateRange: DateRange;
  note?: Maybe<Scalars['String']>;
  lendingStation: LendingStation;
  cargoBike: CargoBike;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['DateTime']>;
};

export type TimeFrameCreateInput = {
  dateRange: DateRangeInput;
  note?: Maybe<Scalars['String']>;
  lendingStationId: Scalars['ID'];
  cargoBikeId: Scalars['ID'];
};

export type TimeFrameUpdateInput = {
  id: Scalars['ID'];
  dateRange?: Maybe<DateRangeInput>;
  note?: Maybe<Scalars['String']>;
  lendingStationId?: Maybe<Scalars['ID']>;
  cargoBikeId?: Maybe<Scalars['ID']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

export type Address = {
  __typename?: 'Address';
  street: Scalars['String'];
  number: Scalars['String'];
  zip: Scalars['String'];
  city?: Maybe<Scalars['String']>;
};

export type AddressCreateInput = {
  street: Scalars['String'];
  number: Scalars['String'];
  zip: Scalars['String'];
  city?: Maybe<Scalars['String']>;
};

export type AddressUpdateInput = {
  street?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
};

export type ActionLog = {
  __typename?: 'ActionLog';
  id: Scalars['ID'];
  userId: Scalars['ID'];
  date: Scalars['Date'];
  action: Scalars['String'];
  entity: Scalars['String'];
  /** in json format */
  entriesOld: Scalars['String'];
  /** in json format */
  entriesNew: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Will (eventually) return all properties of cargo bike */
  cargoBikeById?: Maybe<CargoBike>;
  /** copies cargoBike, the id of the copy needs to be delted by the front end. This function will not create a new entry in the data base */
  copyCargoBikeById?: Maybe<CargoBike>;
  /** Returns cargoBikes ordered by name ascending. If offset or limit is not provided, both values are ignored. */
  cargoBikes: Array<CargoBike>;
  engagementById?: Maybe<Engagement>;
  /** If offset or limit is not provided, both values are ignored */
  engagements: Array<Engagement>;
  engagementTypeById?: Maybe<EngagementType>;
  /** If offset or limit is not provided, both values are ignored */
  engagementTypes: Array<EngagementType>;
  /** equipment by id, will return null if id not found */
  equipmentById?: Maybe<Equipment>;
  /** If offset or limit is not provided, both values are ignored */
  equipment: Array<Equipment>;
  equipmentTypeById?: Maybe<EquipmentType>;
  /** If offset or limit is not provided, both values are ignored */
  equipmentTypes: Array<EquipmentType>;
  /** return null if id not found */
  providerById?: Maybe<Provider>;
  /** Returns providers with pagination. If offset or limit is not provided, both values are ignored */
  providers: Array<Provider>;
  /** participant by id */
  participantById?: Maybe<Participant>;
  /** If offset or limit is not provided, both values are ignored */
  participants: Array<Participant>;
  workshopTypeById?: Maybe<WorkshopType>;
  /** If offset or limit is not provided, both values are ignored */
  workshopTypes: Array<WorkshopType>;
  workshopById?: Maybe<Workshop>;
  /** If offset or limit is not provided, both values are ignored */
  workshops: Array<Workshop>;
  lendingStationById?: Maybe<LendingStation>;
  /** If offset or limit is not provided, both values are ignored */
  lendingStations: Array<LendingStation>;
  organisationById?: Maybe<Organisation>;
  /** If offset or limit is not provided, both values are ignored */
  organisations: Array<Organisation>;
  timeFrameById?: Maybe<TimeFrame>;
  /** If offset or limit is not provided, both values are ignored */
  timeFrames: Array<TimeFrame>;
  contactInformationById?: Maybe<ContactInformation>;
  /** If offset or limit is not provided, both values are ignored */
  contactInformation: Array<ContactInformation>;
  personById?: Maybe<Person>;
  /** If offset or limit is not provided, both values are ignored */
  persons?: Maybe<Array<Person>>;
  /** If offset or limit is not provided, both values are ignored */
  bikeEventTypes?: Maybe<Array<BikeEventType>>;
  bikeEventTypeById?: Maybe<BikeEventType>;
  /** If offset or limit is not provided, both values are ignored */
  bikeEvents: Array<BikeEvent>;
  bikeEventById?: Maybe<BikeEvent>;
  /** actionLog for current user */
  actionLog?: Maybe<Array<ActionLog>>;
  /** actionLog for specific user */
  actionLogByUser?: Maybe<Array<ActionLog>>;
  /** actionLog form all users */
  actionLogAll?: Maybe<Array<ActionLog>>;
};


export type QueryCargoBikeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCopyCargoBikeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCargoBikesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryEngagementByIdArgs = {
  id: Scalars['ID'];
};


export type QueryEngagementsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryEngagementTypeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryEngagementTypesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryEquipmentByIdArgs = {
  id: Scalars['ID'];
};


export type QueryEquipmentArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryEquipmentTypeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryEquipmentTypesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProviderByIdArgs = {
  id: Scalars['ID'];
};


export type QueryProvidersArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryParticipantByIdArgs = {
  id: Scalars['ID'];
};


export type QueryParticipantsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryWorkshopTypeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkshopTypesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryWorkshopByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWorkshopsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLendingStationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryLendingStationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryOrganisationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryOrganisationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryTimeFrameByIdArgs = {
  id: Scalars['ID'];
};


export type QueryTimeFramesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryContactInformationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryContactInformationArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryPersonByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPersonsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBikeEventTypesArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBikeEventTypeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryBikeEventsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBikeEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryActionLogByUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * CARGO BIKE
   * creates new cargoBike and returns cargobike with new ID
   */
  createCargoBike: CargoBike;
  /** lock cargoBike returns bike if bike is not locked and locks bike or Error if bike cannot be locked */
  lockCargoBike: CargoBike;
  /** unlock cargoBike, returns true if Bike does not exist */
  unlockCargoBike: CargoBike;
  /** updates cargoBike of given ID with supplied fields and returns updated cargoBike */
  updateCargoBike: CargoBike;
  /** true on success */
  deleteCargoBike: Scalars['Boolean'];
  /** edit or add key value pair to copy config for cargo bikes */
  editCopyConfig: Scalars['Boolean'];
  /**
   * EQUIPMENT
   * creates new peace of unique Equipment
   */
  createEquipment: Equipment;
  /** lock equipment returns true if bike is not locked or if it doesnt exist */
  lockEquipment: Equipment;
  /** unlock Equipment, returns true if Bike does not exist */
  unlockEquipment: Equipment;
  /** update Equipment, returns updated equipment. CargoBike will be null, if cargoBikeId is not set. Pass null for cargoBikeIs to delete the relation */
  updateEquipment: Equipment;
  deleteEquipment: Scalars['Boolean'];
  createEquipmentType: EquipmentType;
  lockEquipmentType: EquipmentType;
  unlockEquipmentType: EquipmentType;
  updateEquipmentType: EquipmentType;
  deleteEquipmentType: Scalars['Boolean'];
  /**
   * LENDINGSTATION
   * creates new lendingStation and returns lendingStation with new ID
   */
  createLendingStation: LendingStation;
  lockLendingStation: LendingStation;
  unlockLendingStation: LendingStation;
  /** updates lendingStation of given ID with supplied fields and returns updated lendingStation */
  updateLendingStation: LendingStation;
  deleteLendingStation: Scalars['Boolean'];
  createTimeFrame: TimeFrame;
  lockTimeFrame: TimeFrame;
  unlockTimeFrame: TimeFrame;
  updateTimeFrame: TimeFrame;
  deleteTimeFrame: Scalars['Boolean'];
  /** BIKEEVENT */
  createBikeEventType: BikeEventType;
  lockBikeEventType: BikeEventType;
  unlockBikeEventType: BikeEventType;
  updateBikeEventType: BikeEventType;
  deleteBikeEventType: Scalars['Boolean'];
  /** creates new BikeEvent */
  createBikeEvent: BikeEvent;
  lockBikeEvent: BikeEvent;
  unlockBikeEvent: BikeEvent;
  updateBikeEvent?: Maybe<BikeEvent>;
  deleteBikeEvent: Scalars['Boolean'];
  /** PARTICIPANTS */
  createParticipant: Participant;
  lockParticipant: Participant;
  unlockParticipant?: Maybe<Participant>;
  updateParticipant: Participant;
  deleteParticipant: Scalars['Boolean'];
  createWorkshopType: WorkshopType;
  lockWorkshopType: WorkshopType;
  unlockWorkshopType: WorkshopType;
  updateWorkshopType: WorkshopType;
  deleteWorkshopType: Scalars['Boolean'];
  createWorkshop: Workshop;
  lockWorkshop: Workshop;
  unlockWorkshop: Workshop;
  updateWorkshop: Workshop;
  deleteWorkshop: Scalars['Boolean'];
  /** create new contactInfo */
  createContactInformation: ContactInformation;
  lockContactInformation: ContactInformation;
  unlockContactInformation: ContactInformation;
  updateContactInformation: ContactInformation;
  deleteContactInformation: Scalars['Boolean'];
  createPerson: Person;
  lockPerson: Person;
  unlockPerson: Person;
  updatePerson: Person;
  deletePerson: Scalars['Boolean'];
  /** create Engagement */
  createEngagement: Engagement;
  lockEngagement: Engagement;
  unlockEngagement: Engagement;
  updateEngagement: Engagement;
  deleteEngagement: Scalars['Boolean'];
  createEngagementType: EngagementType;
  lockEngagementType: EngagementType;
  unlockEngagementType: EngagementType;
  updateEngagementType: EngagementType;
  deleteEngagementType: Scalars['Boolean'];
  createProvider: Provider;
  lockProvider: Provider;
  unlockProvider: Provider;
  updateProvider: Provider;
  deleteProvider: Scalars['Boolean'];
  createOrganisation: Organisation;
  lockOrganisation: Organisation;
  unlockOrganisation: Organisation;
  updateOrganisation: Organisation;
  deleteOrganisation: Scalars['Boolean'];
};


export type MutationCreateCargoBikeArgs = {
  cargoBike: CargoBikeCreateInput;
};


export type MutationLockCargoBikeArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockCargoBikeArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCargoBikeArgs = {
  cargoBike: CargoBikeUpdateInput;
};


export type MutationDeleteCargoBikeArgs = {
  id: Scalars['ID'];
};


export type MutationEditCopyConfigArgs = {
  key: Scalars['String'];
  value: Scalars['Boolean'];
};


export type MutationCreateEquipmentArgs = {
  equipment: EquipmentCreateInput;
};


export type MutationLockEquipmentArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockEquipmentArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateEquipmentArgs = {
  equipment: EquipmentUpdateInput;
};


export type MutationDeleteEquipmentArgs = {
  id: Scalars['ID'];
};


export type MutationCreateEquipmentTypeArgs = {
  equipmentType: EquipmentTypeCreateInput;
};


export type MutationLockEquipmentTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockEquipmentTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateEquipmentTypeArgs = {
  equipmentType: EquipmentTypeUpdateInput;
};


export type MutationDeleteEquipmentTypeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLendingStationArgs = {
  lendingStation?: Maybe<LendingStationCreateInput>;
};


export type MutationLockLendingStationArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockLendingStationArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateLendingStationArgs = {
  lendingStation: LendingStationUpdateInput;
};


export type MutationDeleteLendingStationArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTimeFrameArgs = {
  timeFrame: TimeFrameCreateInput;
};


export type MutationLockTimeFrameArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockTimeFrameArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTimeFrameArgs = {
  timeFrame: TimeFrameUpdateInput;
};


export type MutationDeleteTimeFrameArgs = {
  id: Scalars['ID'];
};


export type MutationCreateBikeEventTypeArgs = {
  bikeEventType: BikeEventTypeCreateInput;
};


export type MutationLockBikeEventTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockBikeEventTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateBikeEventTypeArgs = {
  bikeEventType: BikeEventTypeUpdateInput;
};


export type MutationDeleteBikeEventTypeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateBikeEventArgs = {
  bikeEvent: BikeEventCreateInput;
};


export type MutationLockBikeEventArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockBikeEventArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateBikeEventArgs = {
  bikeEvent: BikeEventUpdateInput;
};


export type MutationDeleteBikeEventArgs = {
  id: Scalars['ID'];
};


export type MutationCreateParticipantArgs = {
  participant: ParticipantCreateInput;
};


export type MutationLockParticipantArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockParticipantArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateParticipantArgs = {
  participant: ParticipantUpdateInput;
};


export type MutationDeleteParticipantArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkshopTypeArgs = {
  workshopType: WorkshopTypeCreateInput;
};


export type MutationLockWorkshopTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockWorkshopTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateWorkshopTypeArgs = {
  workshopType: WorkshopTypeUpdateInput;
};


export type MutationDeleteWorkshopTypeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateWorkshopArgs = {
  workshop: WorkshopCreateInput;
};


export type MutationLockWorkshopArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockWorkshopArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateWorkshopArgs = {
  workshop: WorkshopUpdateInput;
};


export type MutationDeleteWorkshopArgs = {
  id: Scalars['ID'];
};


export type MutationCreateContactInformationArgs = {
  contactInformation: ContactInformationCreateInput;
};


export type MutationLockContactInformationArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockContactInformationArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateContactInformationArgs = {
  contactInformation: ContactInformationUpdateInput;
};


export type MutationDeleteContactInformationArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePersonArgs = {
  person: PersonCreateInput;
};


export type MutationLockPersonArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockPersonArgs = {
  id: Scalars['ID'];
};


export type MutationUpdatePersonArgs = {
  person: PersonUpdateInput;
};


export type MutationDeletePersonArgs = {
  id: Scalars['ID'];
};


export type MutationCreateEngagementArgs = {
  engagement?: Maybe<EngagementCreateInput>;
};


export type MutationLockEngagementArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockEngagementArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateEngagementArgs = {
  engagement: EngagementUpdateInput;
};


export type MutationDeleteEngagementArgs = {
  id: Scalars['ID'];
};


export type MutationCreateEngagementTypeArgs = {
  engagementType: EngagementTypeCreateInput;
};


export type MutationLockEngagementTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockEngagementTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateEngagementTypeArgs = {
  engagementType: EngagementTypeUpdateInput;
};


export type MutationDeleteEngagementTypeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateProviderArgs = {
  provider: ProviderCreateInput;
};


export type MutationLockProviderArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockProviderArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProviderArgs = {
  provider: ProviderUpdateInput;
};


export type MutationDeleteProviderArgs = {
  id: Scalars['ID'];
};


export type MutationCreateOrganisationArgs = {
  organisation: OrganisationCreateInput;
};


export type MutationLockOrganisationArgs = {
  id: Scalars['ID'];
};


export type MutationUnlockOrganisationArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateOrganisationArgs = {
  organisation: OrganisationUpdateInput;
};


export type MutationDeleteOrganisationArgs = {
  id: Scalars['ID'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type GetActionLogQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActionLogQuery = { __typename?: 'Query', actionLogAll?: Maybe<Array<(
    { __typename?: 'ActionLog' }
    & ActionLogFieldsFragment
  )>> };

export type GetActionLogByUserIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetActionLogByUserIdQuery = { __typename?: 'Query', actionLogByUser?: Maybe<Array<(
    { __typename?: 'ActionLog' }
    & ActionLogFieldsFragment
  )>> };

export type GetCargoBikesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCargoBikesQuery = { __typename?: 'Query', cargoBikes: Array<(
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsForTableFragment
  )> };

export type GetCargoBikeByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCargoBikeByIdQuery = { __typename?: 'Query', cargoBikeById?: Maybe<(
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsForPageFragment
  )> };

export type CopyCargoBikeByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CopyCargoBikeByIdQuery = { __typename?: 'Query', copyCargoBikeById?: Maybe<(
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsForTableFragment
  )> };

export type ReloadCargoBikeByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReloadCargoBikeByIdQuery = { __typename?: 'Query', cargoBikeById?: Maybe<(
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsForTableFragment
  )> };

export type CreateCargoBikeMutationVariables = Exact<{
  bike: CargoBikeCreateInput;
}>;


export type CreateCargoBikeMutation = { __typename?: 'Mutation', createCargoBike: (
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsForTableFragment
  ) };

export type UpdateCargoBikeMutationVariables = Exact<{
  bike: CargoBikeUpdateInput;
}>;


export type UpdateCargoBikeMutation = { __typename?: 'Mutation', updateCargoBike: (
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsForPageFragment
  ) };

export type LockCargoBikeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockCargoBikeMutation = { __typename?: 'Mutation', lockCargoBike: (
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsForPageFragment
  ) };

export type UnlockCargoBikeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockCargoBikeMutation = { __typename?: 'Mutation', unlockCargoBike: (
    { __typename?: 'CargoBike' }
    & CargoBikeFieldsForPageFragment
  ) };

export type DeleteCargoBikeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCargoBikeMutation = { __typename?: 'Mutation', deleteCargoBike: boolean };

export type GetBikeEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBikeEventsQuery = { __typename?: 'Query', bikeEvents: Array<(
    { __typename?: 'BikeEvent' }
    & BikeEventFieldsForTableFragment
  )> };

export type GetBikeEventByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBikeEventByIdQuery = { __typename?: 'Query', bikeEventById?: Maybe<(
    { __typename?: 'BikeEvent' }
    & BikeEventFieldsForPageFragment
  )> };

export type ReloadBikeEventByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReloadBikeEventByIdQuery = { __typename?: 'Query', bikeEventById?: Maybe<(
    { __typename?: 'BikeEvent' }
    & BikeEventFieldsForTableFragment
  )> };

export type CreateBikeEventMutationVariables = Exact<{
  bikeEvent: BikeEventCreateInput;
}>;


export type CreateBikeEventMutation = { __typename?: 'Mutation', createBikeEvent: (
    { __typename?: 'BikeEvent' }
    & BikeEventFieldsForTableFragment
  ) };

export type UpdateBikeEventMutationVariables = Exact<{
  bikeEvent: BikeEventUpdateInput;
}>;


export type UpdateBikeEventMutation = { __typename?: 'Mutation', updateBikeEvent?: Maybe<(
    { __typename?: 'BikeEvent' }
    & BikeEventFieldsForPageFragment
  )> };

export type LockBikeEventMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockBikeEventMutation = { __typename?: 'Mutation', lockBikeEvent: (
    { __typename?: 'BikeEvent' }
    & BikeEventFieldsForPageFragment
  ) };

export type UnlockBikeEventMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockBikeEventMutation = { __typename?: 'Mutation', unlockBikeEvent: (
    { __typename?: 'BikeEvent' }
    & BikeEventFieldsForPageFragment
  ) };

export type DeleteBikeEventMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteBikeEventMutation = { __typename?: 'Mutation', deleteBikeEvent: boolean };

export type GetBikeEventTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBikeEventTypesQuery = { __typename?: 'Query', bikeEventTypes?: Maybe<Array<(
    { __typename?: 'BikeEventType' }
    & BikeEventTypeFieldsFragment
  )>> };

export type CreateBikeEventTypeMutationVariables = Exact<{
  bikeEventType: BikeEventTypeCreateInput;
}>;


export type CreateBikeEventTypeMutation = { __typename?: 'Mutation', createBikeEventType: (
    { __typename?: 'BikeEventType' }
    & BikeEventTypeFieldsFragment
  ) };

export type UpdateBikeEventTypeMutationVariables = Exact<{
  bikeEventType: BikeEventTypeUpdateInput;
}>;


export type UpdateBikeEventTypeMutation = { __typename?: 'Mutation', updateBikeEventType: (
    { __typename?: 'BikeEventType' }
    & BikeEventTypeFieldsFragment
  ) };

export type LockBikeEventTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockBikeEventTypeMutation = { __typename?: 'Mutation', lockBikeEventType: (
    { __typename?: 'BikeEventType' }
    & BikeEventTypeFieldsFragment
  ) };

export type UnlockBikeEventTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockBikeEventTypeMutation = { __typename?: 'Mutation', unlockBikeEventType: (
    { __typename?: 'BikeEventType' }
    & BikeEventTypeFieldsFragment
  ) };

export type DeleteBikeEventTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteBikeEventTypeMutation = { __typename?: 'Mutation', deleteBikeEventType: boolean };

export type GetContactInformationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetContactInformationQuery = { __typename?: 'Query', contactInformation: Array<(
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsFragment
  )> };

export type CreateContactInformationMutationVariables = Exact<{
  contactInformation: ContactInformationCreateInput;
}>;


export type CreateContactInformationMutation = { __typename?: 'Mutation', createContactInformation: (
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsFragment
  ) };

export type UpdateContactInformationMutationVariables = Exact<{
  contactInformation: ContactInformationUpdateInput;
}>;


export type UpdateContactInformationMutation = { __typename?: 'Mutation', updateContactInformation: (
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsFragment
  ) };

export type LockContactInformationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockContactInformationMutation = { __typename?: 'Mutation', lockContactInformation: (
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsFragment
  ) };

export type UnlockContactInformationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockContactInformationMutation = { __typename?: 'Mutation', unlockContactInformation: (
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsFragment
  ) };

export type DeleteContactInformationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteContactInformationMutation = { __typename?: 'Mutation', deleteContactInformation: boolean };

export type GetEngagementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEngagementsQuery = { __typename?: 'Query', engagements: Array<(
    { __typename?: 'Engagement' }
    & EngagementFieldsFragment
  )> };

export type CreateEngagementMutationVariables = Exact<{
  engagement: EngagementCreateInput;
}>;


export type CreateEngagementMutation = { __typename?: 'Mutation', createEngagement: (
    { __typename?: 'Engagement' }
    & EngagementFieldsFragment
  ) };

export type UpdateEngagementMutationVariables = Exact<{
  engagement: EngagementUpdateInput;
}>;


export type UpdateEngagementMutation = { __typename?: 'Mutation', updateEngagement: (
    { __typename?: 'Engagement' }
    & EngagementFieldsFragment
  ) };

export type LockEngagementMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockEngagementMutation = { __typename?: 'Mutation', lockEngagement: (
    { __typename?: 'Engagement' }
    & EngagementFieldsFragment
  ) };

export type UnlockEngagementMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockEngagementMutation = { __typename?: 'Mutation', unlockEngagement: (
    { __typename?: 'Engagement' }
    & EngagementFieldsFragment
  ) };

export type DeleteEngagementMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteEngagementMutation = { __typename?: 'Mutation', deleteEngagement: boolean };

export type GetEngagementTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEngagementTypesQuery = { __typename?: 'Query', engagementTypes: Array<(
    { __typename?: 'EngagementType' }
    & EngagementTypeFieldsFragment
  )> };

export type CreateEngagementTypeMutationVariables = Exact<{
  engagementType: EngagementTypeCreateInput;
}>;


export type CreateEngagementTypeMutation = { __typename?: 'Mutation', createEngagementType: (
    { __typename?: 'EngagementType' }
    & EngagementTypeFieldsFragment
  ) };

export type UpdateEngagementTypeMutationVariables = Exact<{
  engagementType: EngagementTypeUpdateInput;
}>;


export type UpdateEngagementTypeMutation = { __typename?: 'Mutation', updateEngagementType: (
    { __typename?: 'EngagementType' }
    & EngagementTypeFieldsFragment
  ) };

export type LockEngagementTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockEngagementTypeMutation = { __typename?: 'Mutation', lockEngagementType: (
    { __typename?: 'EngagementType' }
    & EngagementTypeFieldsFragment
  ) };

export type UnlockEngagementTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockEngagementTypeMutation = { __typename?: 'Mutation', unlockEngagementType: (
    { __typename?: 'EngagementType' }
    & EngagementTypeFieldsFragment
  ) };

export type DeleteEngagementTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteEngagementTypeMutation = { __typename?: 'Mutation', deleteEngagementType: boolean };

export type GetEquipmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEquipmentsQuery = { __typename?: 'Query', equipment: Array<(
    { __typename?: 'Equipment' }
    & EquipmentFieldsForTableFragment
  )> };

export type CreateEquipmentMutationVariables = Exact<{
  equipmentType: EquipmentCreateInput;
}>;


export type CreateEquipmentMutation = { __typename?: 'Mutation', createEquipment: (
    { __typename?: 'Equipment' }
    & EquipmentFieldsForTableFragment
  ) };

export type UpdateEquipmentMutationVariables = Exact<{
  equipmentType: EquipmentUpdateInput;
}>;


export type UpdateEquipmentMutation = { __typename?: 'Mutation', updateEquipment: (
    { __typename?: 'Equipment' }
    & EquipmentFieldsForTableFragment
  ) };

export type LockEquipmentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockEquipmentMutation = { __typename?: 'Mutation', lockEquipment: (
    { __typename?: 'Equipment' }
    & EquipmentFieldsForTableFragment
  ) };

export type UnlockEquipmentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockEquipmentMutation = { __typename?: 'Mutation', unlockEquipment: (
    { __typename?: 'Equipment' }
    & EquipmentFieldsForTableFragment
  ) };

export type DeleteEquipmentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteEquipmentMutation = { __typename?: 'Mutation', deleteEquipment: boolean };

export type GetEquipmentTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEquipmentTypesQuery = { __typename?: 'Query', equipmentTypes: Array<(
    { __typename?: 'EquipmentType' }
    & EquipmentTypeFieldsFragment
  )> };

export type CreateEquipmentTypeMutationVariables = Exact<{
  equipmentType: EquipmentTypeCreateInput;
}>;


export type CreateEquipmentTypeMutation = { __typename?: 'Mutation', createEquipmentType: (
    { __typename?: 'EquipmentType' }
    & EquipmentTypeFieldsFragment
  ) };

export type UpdateEquipmentTypeMutationVariables = Exact<{
  equipmentType: EquipmentTypeUpdateInput;
}>;


export type UpdateEquipmentTypeMutation = { __typename?: 'Mutation', updateEquipmentType: (
    { __typename?: 'EquipmentType' }
    & EquipmentTypeFieldsFragment
  ) };

export type LockEquipmentTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockEquipmentTypeMutation = { __typename?: 'Mutation', lockEquipmentType: (
    { __typename?: 'EquipmentType' }
    & EquipmentTypeFieldsFragment
  ) };

export type UnlockEquipmentTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockEquipmentTypeMutation = { __typename?: 'Mutation', unlockEquipmentType: (
    { __typename?: 'EquipmentType' }
    & EquipmentTypeFieldsFragment
  ) };

export type DeleteEquipmentTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteEquipmentTypeMutation = { __typename?: 'Mutation', deleteEquipmentType: boolean };

export type ActionLogFieldsFragment = { __typename?: 'ActionLog', id: string, action: string, date: any, entity: string, entriesNew: string, entriesOld: string, userId: string };

export type AddressFieldsFragment = { __typename?: 'Address', street: string, number: string, zip: string, city?: Maybe<string> };

export type CargoBikeFieldsForTableFragment = { __typename?: 'CargoBike', id: string, group: Group, name: string, modelName?: Maybe<string>, state?: Maybe<BikeState>, numberOfChildren?: Maybe<number>, numberOfWheels?: Maybe<number>, forCargo?: Maybe<boolean>, forChildren?: Maybe<boolean>, stickerBikeNameState?: Maybe<StickerBikeNameState>, note?: Maybe<string>, miscellaneous?: Maybe<string>, ownUse?: Maybe<string>, preDamage?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, insuranceData?: Maybe<{ __typename?: 'InsuranceData', billing?: Maybe<string>, hasFixedRate?: Maybe<boolean>, name?: Maybe<string>, benefactor?: Maybe<string>, noPnP?: Maybe<string>, maintenanceResponsible?: Maybe<string>, maintenanceBenefactor?: Maybe<string>, maintenanceAgreement?: Maybe<string>, fixedRate?: Maybe<number>, projectAllowance?: Maybe<any>, frameworkAgreement?: Maybe<string>, notes?: Maybe<string> }>, dimensionsAndLoad?: Maybe<{ __typename?: 'DimensionsAndLoad', bikeLength?: Maybe<number>, bikeWeight?: Maybe<number>, bikeHeight?: Maybe<number>, bikeWidth?: Maybe<number>, hasCoverBox?: Maybe<boolean>, lockable?: Maybe<boolean>, maxWeightBox?: Maybe<number>, maxWeightLuggageRack?: Maybe<number>, maxWeightTotal?: Maybe<number>, boxHeightRange?: Maybe<{ __typename?: 'NumRange', max?: Maybe<number>, min?: Maybe<number> }>, boxLengthRange?: Maybe<{ __typename?: 'NumRange', min?: Maybe<number>, max?: Maybe<number> }>, boxWidthRange?: Maybe<{ __typename?: 'NumRange', min?: Maybe<number>, max?: Maybe<number> }> }>, security?: Maybe<{ __typename?: 'Security', frameNumber?: Maybe<string>, adfcCoding?: Maybe<string>, keyNumberAXAChain?: Maybe<string>, keyNumberFrameLock?: Maybe<string>, policeCoding?: Maybe<string> }>, spareKeyLocations?: Maybe<{ __typename?: 'SpareKeyLocations', projectOffice?: Maybe<boolean>, lendingStation?: Maybe<boolean>, provider?: Maybe<boolean> }>, technicalEquipment?: Maybe<{ __typename?: 'TechnicalEquipment', bicycleShift?: Maybe<string>, isEBike?: Maybe<boolean>, hasLightSystem?: Maybe<boolean>, specialFeatures?: Maybe<string> }>, taxes?: Maybe<{ __typename?: 'Taxes', costCenter?: Maybe<string>, organisationArea?: Maybe<OrganisationArea> }>, provider?: Maybe<(
    { __typename?: 'Provider' }
    & ProviderFieldsGeneralFragment
  )>, lendingStation?: Maybe<(
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForBikePageFragment
  )> };

export type CargoBikeFieldsForPageFragment = (
  { __typename?: 'CargoBike', bikeEvents?: Maybe<Array<Maybe<(
    { __typename?: 'BikeEvent' }
    & BikeEventFieldsForBikePageFragment
  )>>>, equipment?: Maybe<Array<Maybe<(
    { __typename?: 'Equipment' }
    & EquipmentFieldsForBikePageFragment
  )>>>, equipmentType?: Maybe<Array<Maybe<(
    { __typename?: 'EquipmentType' }
    & EquipmentTypeFieldsFragment
  )>>>, engagement?: Maybe<Array<Maybe<(
    { __typename?: 'Engagement' }
    & EngagementFieldsForBikePageFragment
  )>>>, currentEngagements?: Maybe<Array<Maybe<(
    { __typename?: 'Engagement' }
    & EngagementFieldsForBikePageFragment
  )>>>, timeFrames?: Maybe<Array<Maybe<(
    { __typename?: 'TimeFrame' }
    & TimeFrameFieldsForBikePageFragment
  )>>> }
  & CargoBikeFieldsForTableFragment
);

export type BikeEventFieldsForBikePageFragment = { __typename?: 'BikeEvent', id: string, date: any, bikeEventType: (
    { __typename?: 'BikeEventType' }
    & BikeEventTypeFieldsFragment
  ), responsible?: Maybe<(
    { __typename?: 'Participant' }
    & ParticipantFieldsGeneralFragment
  )> };

export type BikeEventFieldsForTableFragment = { __typename?: 'BikeEvent', id: string, date: any, description?: Maybe<string>, documents: Array<any>, remark?: Maybe<string>, isLockedByMe: boolean, isLocked: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, bikeEventType: (
    { __typename?: 'BikeEventType' }
    & BikeEventTypeFieldsFragment
  ), cargoBike: { __typename?: 'CargoBike', id: string, name: string }, responsible?: Maybe<(
    { __typename?: 'Participant' }
    & ParticipantFieldsGeneralFragment
  )>, related?: Maybe<(
    { __typename?: 'Participant' }
    & ParticipantFieldsGeneralFragment
  )> };

export type BikeEventFieldsForPageFragment = (
  { __typename?: 'BikeEvent' }
  & BikeEventFieldsForTableFragment
);

export type BikeEventTypeFieldsFragment = { __typename?: 'BikeEventType', id: string, name: string, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any> };

export type ContactInformationFieldsGeneralFragment = { __typename?: 'ContactInformation', id: string, phone?: Maybe<string>, phone2?: Maybe<string>, email?: Maybe<string>, email2?: Maybe<string>, note?: Maybe<string>, person: (
    { __typename?: 'Person' }
    & PersonFieldsGeneralFragment
  ) };

export type ContactInformationFieldsFragment = (
  { __typename?: 'ContactInformation', isLocked: boolean, isLockedByMe: boolean, lockedUntil?: Maybe<any> }
  & ContactInformationFieldsGeneralFragment
);

export type EngagementFieldsForBikePageFragment = { __typename?: 'Engagement', id: string, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, engagementType: (
    { __typename?: 'EngagementType' }
    & EngagementTypeFieldsFragment
  ), dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, participant: (
    { __typename?: 'Participant' }
    & ParticipantFieldsGeneralFragment
  ) };

export type EngagementFieldsForParticipantFragment = { __typename?: 'Engagement', id: string, engagementType: (
    { __typename?: 'EngagementType' }
    & EngagementTypeFieldsFragment
  ), dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, cargoBike: { __typename?: 'CargoBike', id: string, name: string } };

export type EngagementFieldsFragment = { __typename?: 'Engagement', id: string, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, engagementType: (
    { __typename?: 'EngagementType' }
    & EngagementTypeFieldsFragment
  ), dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, participant: (
    { __typename?: 'Participant' }
    & ParticipantFieldsGeneralFragment
  ), cargoBike: { __typename?: 'CargoBike', id: string, name: string } };

export type EngagementTypeFieldsFragment = { __typename?: 'EngagementType', id: string, name: string, description: string, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any> };

export type EquipmentFieldsForBikePageFragment = { __typename?: 'Equipment', id: string, serialNo: string, title: string, description?: Maybe<string>, cargoBike?: Maybe<{ __typename?: 'CargoBike', name: string }> };

export type EquipmentFieldsForTableFragment = { __typename?: 'Equipment', id: string, serialNo: string, title: string, description?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, cargoBike?: Maybe<{ __typename?: 'CargoBike', id: string, name: string }> };

export type EquipmentTypeFieldsFragment = { __typename?: 'EquipmentType', id: string, name: string, description: string, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any> };

export type LendingStationFieldsForBikePageFragment = { __typename?: 'LendingStation', id: string, name: string, longName: string, district?: Maybe<string>, address: (
    { __typename?: 'Address' }
    & AddressFieldsFragment
  ), organisation?: Maybe<(
    { __typename?: 'Organisation' }
    & OrganisationFieldsGeneralFragment
  )> };

export type LendingStationFieldsForTableFragment = { __typename?: 'LendingStation', id: string, name: string, longName: string, district?: Maybe<string>, remark?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, contactInformationIntern?: Maybe<(
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsGeneralFragment
  )>, contactInformationExtern?: Maybe<(
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsGeneralFragment
  )>, address: (
    { __typename?: 'Address' }
    & AddressFieldsFragment
  ), organisation?: Maybe<(
    { __typename?: 'Organisation' }
    & OrganisationFieldsGeneralFragment
  )> };

export type LendingStationFieldsForPageFragment = (
  { __typename?: 'LendingStation', cargoBikes?: Maybe<Array<{ __typename?: 'CargoBike', id: string, name: string }>>, timeFrames: Array<(
    { __typename?: 'TimeFrame' }
    & TimeFrameFieldsForLendingStationFragment
  )>, loanPeriod?: Maybe<{ __typename?: 'LoanPeriod', generalRemark?: Maybe<string>, particularities?: Maybe<string>, holidays?: Maybe<string>, mo?: Maybe<string>, tu?: Maybe<string>, we?: Maybe<string>, th?: Maybe<string>, fr?: Maybe<string>, sa?: Maybe<string>, su?: Maybe<string> }> }
  & LendingStationFieldsForTableFragment
);

export type OrganisationFieldsGeneralFragment = { __typename?: 'Organisation', id: string, name: string, associationNo?: Maybe<string>, address?: Maybe<(
    { __typename?: 'Address' }
    & AddressFieldsFragment
  )> };

export type OrganisationFieldsForTableFragment = (
  { __typename?: 'Organisation', registeredAt?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, contactInformation?: Maybe<(
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsGeneralFragment
  )> }
  & OrganisationFieldsGeneralFragment
);

export type OrganisationFieldsForPageFragment = (
  { __typename?: 'Organisation', lendingStations?: Maybe<Array<{ __typename?: 'LendingStation', id: string, name: string }>>, provider?: Maybe<(
    { __typename?: 'Provider' }
    & ProviderFieldsForPageFragment
  )> }
  & OrganisationFieldsForTableFragment
);

export type ParticipantFieldsGeneralFragment = { __typename?: 'Participant', id: string, usernamefLotte?: Maybe<string>, usernameSlack?: Maybe<string>, dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, contactInformation: (
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsGeneralFragment
  ) };

export type ParticipantFieldsForTableFragment = (
  { __typename?: 'Participant', memberADFC: boolean, locationZIPs: Array<Maybe<string>>, memberCoreTeam: boolean, distributedActiveBikeParte: boolean, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any> }
  & ParticipantFieldsGeneralFragment
);

export type ParticipantFieldsForPageFragment = (
  { __typename?: 'Participant', engagement?: Maybe<Array<Maybe<(
    { __typename?: 'Engagement' }
    & EngagementFieldsForParticipantFragment
  )>>>, workshops?: Maybe<Array<Maybe<(
    { __typename?: 'Workshop' }
    & WorkshopFieldsGeneralFragment
  )>>> }
  & ParticipantFieldsForTableFragment
);

export type PersonFieldsGeneralFragment = { __typename?: 'Person', id: string, name: string, firstName: string };

export type PersonFieldsForTableFragment = { __typename?: 'Person', id: string, name: string, firstName: string, isLocked: boolean, isLockedByMe: boolean, lockedUntil?: Maybe<any> };

export type PersonFieldsForPageFragment = (
  { __typename?: 'Person', contactInformation?: Maybe<Array<(
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsGeneralFragment
  )>> }
  & PersonFieldsForTableFragment
);

export type ProviderFieldsGeneralFragment = { __typename?: 'Provider', id: string, formName?: Maybe<string>, privatePerson?: Maybe<(
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsGeneralFragment
  )>, organisation?: Maybe<{ __typename?: 'Organisation', id: string, name: string, address?: Maybe<(
      { __typename?: 'Address' }
      & AddressFieldsFragment
    )>, contactInformation?: Maybe<(
      { __typename?: 'ContactInformation' }
      & ContactInformationFieldsGeneralFragment
    )> }> };

export type ProviderFieldsForTableFragment = (
  { __typename?: 'Provider', isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any> }
  & ProviderFieldsGeneralFragment
);

export type ProviderFieldsForPageFragment = (
  { __typename?: 'Provider', cargoBikes?: Maybe<Array<{ __typename?: 'CargoBike', id: string, name: string }>> }
  & ProviderFieldsForTableFragment
);

export type TimeFrameFieldsForBikePageFragment = { __typename?: 'TimeFrame', id: string, note?: Maybe<string>, dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, lendingStation: (
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForBikePageFragment
  ) };

export type TimeFrameFieldsForLendingStationFragment = { __typename?: 'TimeFrame', id: string, note?: Maybe<string>, dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, cargoBike: { __typename?: 'CargoBike', id: string, name: string } };

export type TimeFrameFieldsFragment = { __typename?: 'TimeFrame', id: string, note?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, lendingStation: { __typename?: 'LendingStation', id: string, name: string }, cargoBike: { __typename?: 'CargoBike', id: string, name: string } };

export type WorkshopFieldsGeneralFragment = { __typename?: 'Workshop', id: string, title: string, description: string, date: any, workshopType: (
    { __typename?: 'WorkshopType' }
    & WorkshopTypefieldsGeneralFragment
  ), trainer1: (
    { __typename?: 'Participant' }
    & ParticipantFieldsGeneralFragment
  ), trainer2?: Maybe<(
    { __typename?: 'Participant' }
    & ParticipantFieldsGeneralFragment
  )> };

export type WorkshopFieldsForTableFragment = (
  { __typename?: 'Workshop', isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, participants?: Maybe<Array<Maybe<(
    { __typename?: 'Participant' }
    & ParticipantFieldsGeneralFragment
  )>>> }
  & WorkshopFieldsGeneralFragment
);

export type WorkshopFieldsForPageFragment = (
  { __typename?: 'Workshop' }
  & WorkshopFieldsForTableFragment
);

export type WorkshopTypefieldsGeneralFragment = { __typename?: 'WorkshopType', id: string, name: string };

export type WorkshopTypeFieldsFragment = (
  { __typename?: 'WorkshopType', isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any> }
  & WorkshopTypefieldsGeneralFragment
);

export type GetLendingStationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLendingStationsQuery = { __typename?: 'Query', lendingStations: Array<(
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForTableFragment
  )> };

export type GetLendingStationByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetLendingStationByIdQuery = { __typename?: 'Query', lendingStationById?: Maybe<(
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForPageFragment
  )> };

export type ReloadLendingStationByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReloadLendingStationByIdQuery = { __typename?: 'Query', lendingStationById?: Maybe<(
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForTableFragment
  )> };

export type CreateLendingStationMutationVariables = Exact<{
  lendingStation: LendingStationCreateInput;
}>;


export type CreateLendingStationMutation = { __typename?: 'Mutation', createLendingStation: (
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForTableFragment
  ) };

export type UpdateLendingStationMutationVariables = Exact<{
  lendingStation: LendingStationUpdateInput;
}>;


export type UpdateLendingStationMutation = { __typename?: 'Mutation', updateLendingStation: (
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForPageFragment
  ) };

export type LockLendingStationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockLendingStationMutation = { __typename?: 'Mutation', lockLendingStation: (
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForPageFragment
  ) };

export type UnlockLendingStationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockLendingStationMutation = { __typename?: 'Mutation', unlockLendingStation: (
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForPageFragment
  ) };

export type DeleteLendingStationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteLendingStationMutation = { __typename?: 'Mutation', deleteLendingStation: boolean };

export type GetOrganisationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganisationsQuery = { __typename?: 'Query', organisations: Array<(
    { __typename?: 'Organisation' }
    & OrganisationFieldsForTableFragment
  )> };

export type GetOrganisationByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOrganisationByIdQuery = { __typename?: 'Query', organisationById?: Maybe<(
    { __typename?: 'Organisation' }
    & OrganisationFieldsForPageFragment
  )> };

export type ReloadOrganisationByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReloadOrganisationByIdQuery = { __typename?: 'Query', organisationById?: Maybe<(
    { __typename?: 'Organisation' }
    & OrganisationFieldsForTableFragment
  )> };

export type CreateOrganisationMutationVariables = Exact<{
  organisation: OrganisationCreateInput;
}>;


export type CreateOrganisationMutation = { __typename?: 'Mutation', createOrganisation: (
    { __typename?: 'Organisation' }
    & OrganisationFieldsForTableFragment
  ) };

export type UpdateOrganisationMutationVariables = Exact<{
  organisation: OrganisationUpdateInput;
}>;


export type UpdateOrganisationMutation = { __typename?: 'Mutation', updateOrganisation: (
    { __typename?: 'Organisation' }
    & OrganisationFieldsForPageFragment
  ) };

export type LockOrganisationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockOrganisationMutation = { __typename?: 'Mutation', lockOrganisation: (
    { __typename?: 'Organisation' }
    & OrganisationFieldsForPageFragment
  ) };

export type UnlockOrganisationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockOrganisationMutation = { __typename?: 'Mutation', unlockOrganisation: (
    { __typename?: 'Organisation' }
    & OrganisationFieldsForPageFragment
  ) };

export type DeleteOrganisationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteOrganisationMutation = { __typename?: 'Mutation', deleteOrganisation: boolean };

export type GetParticipantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetParticipantsQuery = { __typename?: 'Query', participants: Array<(
    { __typename?: 'Participant' }
    & ParticipantFieldsForTableFragment
  )> };

export type GetParticipantByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetParticipantByIdQuery = { __typename?: 'Query', participantById?: Maybe<(
    { __typename?: 'Participant' }
    & ParticipantFieldsForPageFragment
  )> };

export type ReloadParticipantByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReloadParticipantByIdQuery = { __typename?: 'Query', participantById?: Maybe<(
    { __typename?: 'Participant' }
    & ParticipantFieldsForTableFragment
  )> };

export type CreateParticipantMutationVariables = Exact<{
  participant: ParticipantCreateInput;
}>;


export type CreateParticipantMutation = { __typename?: 'Mutation', createParticipant: (
    { __typename?: 'Participant' }
    & ParticipantFieldsForTableFragment
  ) };

export type UpdateParticipantMutationVariables = Exact<{
  participant: ParticipantUpdateInput;
}>;


export type UpdateParticipantMutation = { __typename?: 'Mutation', updateParticipant: (
    { __typename?: 'Participant' }
    & ParticipantFieldsForPageFragment
  ) };

export type LockParticipantMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockParticipantMutation = { __typename?: 'Mutation', lockParticipant: (
    { __typename?: 'Participant' }
    & ParticipantFieldsForPageFragment
  ) };

export type UnlockParticipantMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockParticipantMutation = { __typename?: 'Mutation', unlockParticipant?: Maybe<(
    { __typename?: 'Participant' }
    & ParticipantFieldsForPageFragment
  )> };

export type DeleteParticipantMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteParticipantMutation = { __typename?: 'Mutation', deleteParticipant: boolean };

export type GetPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonsQuery = { __typename?: 'Query', persons?: Maybe<Array<(
    { __typename?: 'Person' }
    & PersonFieldsForTableFragment
  )>> };

export type GetPersonByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPersonByIdQuery = { __typename?: 'Query', personById?: Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsForPageFragment
  )> };

export type ReloadPersonByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReloadPersonByIdQuery = { __typename?: 'Query', personById?: Maybe<(
    { __typename?: 'Person' }
    & PersonFieldsForTableFragment
  )> };

export type CreatePersonMutationVariables = Exact<{
  person: PersonCreateInput;
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson: (
    { __typename?: 'Person' }
    & PersonFieldsForTableFragment
  ) };

export type UpdatePersonMutationVariables = Exact<{
  person: PersonUpdateInput;
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson: (
    { __typename?: 'Person' }
    & PersonFieldsForPageFragment
  ) };

export type LockPersonMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockPersonMutation = { __typename?: 'Mutation', lockPerson: (
    { __typename?: 'Person' }
    & PersonFieldsForPageFragment
  ) };

export type UnlockPersonMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockPersonMutation = { __typename?: 'Mutation', unlockPerson: (
    { __typename?: 'Person' }
    & PersonFieldsForPageFragment
  ) };

export type DeletePersonMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePersonMutation = { __typename?: 'Mutation', deletePerson: boolean };

export type GetProvidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProvidersQuery = { __typename?: 'Query', providers: Array<(
    { __typename?: 'Provider' }
    & ProviderFieldsForTableFragment
  )> };

export type GetProviderByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProviderByIdQuery = { __typename?: 'Query', providerById?: Maybe<(
    { __typename?: 'Provider' }
    & ProviderFieldsForPageFragment
  )> };

export type ReloadProviderByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReloadProviderByIdQuery = { __typename?: 'Query', providerById?: Maybe<(
    { __typename?: 'Provider' }
    & ProviderFieldsForTableFragment
  )> };

export type CreateProviderMutationVariables = Exact<{
  provider: ProviderCreateInput;
}>;


export type CreateProviderMutation = { __typename?: 'Mutation', createProvider: (
    { __typename?: 'Provider' }
    & ProviderFieldsForTableFragment
  ) };

export type UpdateProviderMutationVariables = Exact<{
  provider: ProviderUpdateInput;
}>;


export type UpdateProviderMutation = { __typename?: 'Mutation', updateProvider: (
    { __typename?: 'Provider' }
    & ProviderFieldsForPageFragment
  ) };

export type LockProviderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockProviderMutation = { __typename?: 'Mutation', lockProvider: (
    { __typename?: 'Provider' }
    & ProviderFieldsForPageFragment
  ) };

export type UnlockProviderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockProviderMutation = { __typename?: 'Mutation', unlockProvider: (
    { __typename?: 'Provider' }
    & ProviderFieldsForPageFragment
  ) };

export type DeleteProviderMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProviderMutation = { __typename?: 'Mutation', deleteProvider: boolean };

export type GetTimeFramesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimeFramesQuery = { __typename?: 'Query', timeFrames: Array<(
    { __typename?: 'TimeFrame' }
    & TimeFrameFieldsFragment
  )> };

export type CreateTimeFrameMutationVariables = Exact<{
  timeFrame: TimeFrameCreateInput;
}>;


export type CreateTimeFrameMutation = { __typename?: 'Mutation', createTimeFrame: (
    { __typename?: 'TimeFrame' }
    & TimeFrameFieldsFragment
  ) };

export type UpdateTimeFrameMutationVariables = Exact<{
  timeFrame: TimeFrameUpdateInput;
}>;


export type UpdateTimeFrameMutation = { __typename?: 'Mutation', updateTimeFrame: (
    { __typename?: 'TimeFrame' }
    & TimeFrameFieldsFragment
  ) };

export type LockTimeFrameMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockTimeFrameMutation = { __typename?: 'Mutation', lockTimeFrame: (
    { __typename?: 'TimeFrame' }
    & TimeFrameFieldsFragment
  ) };

export type UnlockTimeFrameMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockTimeFrameMutation = { __typename?: 'Mutation', unlockTimeFrame: (
    { __typename?: 'TimeFrame' }
    & TimeFrameFieldsFragment
  ) };

export type DeleteTimeFrameMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTimeFrameMutation = { __typename?: 'Mutation', deleteTimeFrame: boolean };

export type GetWorkshopsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkshopsQuery = { __typename?: 'Query', workshops: Array<(
    { __typename?: 'Workshop' }
    & WorkshopFieldsForTableFragment
  )> };

export type GetWorkshopByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetWorkshopByIdQuery = { __typename?: 'Query', workshopById?: Maybe<(
    { __typename?: 'Workshop' }
    & WorkshopFieldsForPageFragment
  )> };

export type ReloadWorkshopByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReloadWorkshopByIdQuery = { __typename?: 'Query', workshopById?: Maybe<(
    { __typename?: 'Workshop' }
    & WorkshopFieldsForTableFragment
  )> };

export type CreateWorkshopMutationVariables = Exact<{
  workshop: WorkshopCreateInput;
}>;


export type CreateWorkshopMutation = { __typename?: 'Mutation', createWorkshop: (
    { __typename?: 'Workshop' }
    & WorkshopFieldsForTableFragment
  ) };

export type UpdateWorkshopMutationVariables = Exact<{
  workshop: WorkshopUpdateInput;
}>;


export type UpdateWorkshopMutation = { __typename?: 'Mutation', updateWorkshop: (
    { __typename?: 'Workshop' }
    & WorkshopFieldsForPageFragment
  ) };

export type LockWorkshopMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockWorkshopMutation = { __typename?: 'Mutation', lockWorkshop: (
    { __typename?: 'Workshop' }
    & WorkshopFieldsForPageFragment
  ) };

export type UnlockWorkshopMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockWorkshopMutation = { __typename?: 'Mutation', unlockWorkshop: (
    { __typename?: 'Workshop' }
    & WorkshopFieldsForPageFragment
  ) };

export type DeleteWorkshopMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkshopMutation = { __typename?: 'Mutation', deleteWorkshop: boolean };

export type GetWorkshopTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkshopTypesQuery = { __typename?: 'Query', workshopTypes: Array<(
    { __typename?: 'WorkshopType' }
    & WorkshopTypeFieldsFragment
  )> };

export type CreateWorkshopTypeMutationVariables = Exact<{
  workshopType: WorkshopTypeCreateInput;
}>;


export type CreateWorkshopTypeMutation = { __typename?: 'Mutation', createWorkshopType: (
    { __typename?: 'WorkshopType' }
    & WorkshopTypeFieldsFragment
  ) };

export type UpdateWorkshopTypeMutationVariables = Exact<{
  workshopType: WorkshopTypeUpdateInput;
}>;


export type UpdateWorkshopTypeMutation = { __typename?: 'Mutation', updateWorkshopType: (
    { __typename?: 'WorkshopType' }
    & WorkshopTypeFieldsFragment
  ) };

export type LockWorkshopTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LockWorkshopTypeMutation = { __typename?: 'Mutation', lockWorkshopType: (
    { __typename?: 'WorkshopType' }
    & WorkshopTypeFieldsFragment
  ) };

export type UnlockWorkshopTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnlockWorkshopTypeMutation = { __typename?: 'Mutation', unlockWorkshopType: (
    { __typename?: 'WorkshopType' }
    & WorkshopTypeFieldsFragment
  ) };

export type DeleteWorkshopTypeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWorkshopTypeMutation = { __typename?: 'Mutation', deleteWorkshopType: boolean };

export const ActionLogFieldsFragmentDoc = gql`
    fragment ActionLogFields on ActionLog {
  id
  action
  date
  entity
  entriesNew
  entriesOld
  userId
}
    `;
export const PersonFieldsGeneralFragmentDoc = gql`
    fragment PersonFieldsGeneral on Person {
  id
  name
  firstName
}
    `;
export const ContactInformationFieldsGeneralFragmentDoc = gql`
    fragment ContactInformationFieldsGeneral on ContactInformation {
  id
  person {
    ...PersonFieldsGeneral
  }
  phone
  phone2
  email
  email2
  note
}
    ${PersonFieldsGeneralFragmentDoc}`;
export const AddressFieldsFragmentDoc = gql`
    fragment AddressFields on Address {
  street
  number
  zip
  city
}
    `;
export const ProviderFieldsGeneralFragmentDoc = gql`
    fragment ProviderFieldsGeneral on Provider {
  id
  formName
  privatePerson {
    ...ContactInformationFieldsGeneral
  }
  organisation {
    id
    name
    address {
      ...AddressFields
    }
    contactInformation {
      ...ContactInformationFieldsGeneral
    }
  }
}
    ${ContactInformationFieldsGeneralFragmentDoc}
${AddressFieldsFragmentDoc}`;
export const OrganisationFieldsGeneralFragmentDoc = gql`
    fragment OrganisationFieldsGeneral on Organisation {
  id
  name
  address {
    ...AddressFields
  }
  associationNo
}
    ${AddressFieldsFragmentDoc}`;
export const LendingStationFieldsForBikePageFragmentDoc = gql`
    fragment LendingStationFieldsForBikePage on LendingStation {
  id
  name
  longName
  district
  address {
    ...AddressFields
  }
  organisation {
    ...OrganisationFieldsGeneral
  }
}
    ${AddressFieldsFragmentDoc}
${OrganisationFieldsGeneralFragmentDoc}`;
export const CargoBikeFieldsForTableFragmentDoc = gql`
    fragment CargoBikeFieldsForTable on CargoBike {
  id
  group
  name
  modelName
  state
  insuranceData {
    billing
    hasFixedRate
    name
    benefactor
    noPnP
    maintenanceResponsible
    maintenanceBenefactor
    maintenanceAgreement
    fixedRate
    projectAllowance
    frameworkAgreement
    notes
  }
  dimensionsAndLoad {
    bikeLength
    bikeWeight
    bikeHeight
    bikeWidth
    boxHeightRange {
      max
      min
    }
    boxLengthRange {
      min
      max
    }
    boxWidthRange {
      min
      max
    }
    hasCoverBox
    lockable
    maxWeightBox
    maxWeightLuggageRack
    maxWeightTotal
  }
  numberOfChildren
  numberOfWheels
  forCargo
  forChildren
  security {
    frameNumber
    adfcCoding
    keyNumberAXAChain
    keyNumberFrameLock
    policeCoding
  }
  spareKeyLocations {
    projectOffice
    lendingStation
    provider
  }
  technicalEquipment {
    bicycleShift
    isEBike
    hasLightSystem
    specialFeatures
  }
  dimensionsAndLoad {
    bikeHeight
    bikeLength
    bikeWeight
    bikeWidth
    boxHeightRange {
      max
      min
    }
    boxLengthRange {
      min
      max
    }
    boxWidthRange {
      min
      max
    }
    hasCoverBox
    lockable
    maxWeightBox
    maxWeightLuggageRack
    maxWeightTotal
  }
  stickerBikeNameState
  note
  insuranceData {
    name
    benefactor
    billing
    noPnP
    maintenanceResponsible
    maintenanceBenefactor
    maintenanceAgreement
    hasFixedRate
    fixedRate
    projectAllowance
    frameworkAgreement
    notes
  }
  taxes {
    costCenter
    organisationArea
  }
  miscellaneous
  ownUse
  preDamage
  provider {
    ...ProviderFieldsGeneral
  }
  lendingStation {
    ...LendingStationFieldsForBikePage
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${ProviderFieldsGeneralFragmentDoc}
${LendingStationFieldsForBikePageFragmentDoc}`;
export const BikeEventTypeFieldsFragmentDoc = gql`
    fragment BikeEventTypeFields on BikeEventType {
  id
  name
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    `;
export const ParticipantFieldsGeneralFragmentDoc = gql`
    fragment ParticipantFieldsGeneral on Participant {
  id
  dateRange {
    from
    to
  }
  contactInformation {
    ...ContactInformationFieldsGeneral
  }
  usernamefLotte
  usernameSlack
}
    ${ContactInformationFieldsGeneralFragmentDoc}`;
export const BikeEventFieldsForBikePageFragmentDoc = gql`
    fragment BikeEventFieldsForBikePage on BikeEvent {
  id
  bikeEventType {
    ...BikeEventTypeFields
  }
  responsible {
    ...ParticipantFieldsGeneral
  }
  date
}
    ${BikeEventTypeFieldsFragmentDoc}
${ParticipantFieldsGeneralFragmentDoc}`;
export const EquipmentFieldsForBikePageFragmentDoc = gql`
    fragment EquipmentFieldsForBikePage on Equipment {
  id
  serialNo
  title
  description
  cargoBike {
    name
  }
}
    `;
export const EquipmentTypeFieldsFragmentDoc = gql`
    fragment EquipmentTypeFields on EquipmentType {
  id
  name
  description
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    `;
export const EngagementTypeFieldsFragmentDoc = gql`
    fragment EngagementTypeFields on EngagementType {
  id
  name
  description
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    `;
export const EngagementFieldsForBikePageFragmentDoc = gql`
    fragment EngagementFieldsForBikePage on Engagement {
  id
  engagementType {
    ...EngagementTypeFields
  }
  dateRange {
    from
    to
  }
  participant {
    ...ParticipantFieldsGeneral
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${EngagementTypeFieldsFragmentDoc}
${ParticipantFieldsGeneralFragmentDoc}`;
export const TimeFrameFieldsForBikePageFragmentDoc = gql`
    fragment TimeFrameFieldsForBikePage on TimeFrame {
  id
  dateRange {
    from
    to
  }
  note
  lendingStation {
    ...LendingStationFieldsForBikePage
  }
}
    ${LendingStationFieldsForBikePageFragmentDoc}`;
export const CargoBikeFieldsForPageFragmentDoc = gql`
    fragment CargoBikeFieldsForPage on CargoBike {
  ...CargoBikeFieldsForTable
  bikeEvents {
    ...BikeEventFieldsForBikePage
  }
  equipment {
    ...EquipmentFieldsForBikePage
  }
  equipmentType {
    ...EquipmentTypeFields
  }
  engagement {
    ...EngagementFieldsForBikePage
  }
  currentEngagements {
    ...EngagementFieldsForBikePage
  }
  timeFrames {
    ...TimeFrameFieldsForBikePage
  }
}
    ${CargoBikeFieldsForTableFragmentDoc}
${BikeEventFieldsForBikePageFragmentDoc}
${EquipmentFieldsForBikePageFragmentDoc}
${EquipmentTypeFieldsFragmentDoc}
${EngagementFieldsForBikePageFragmentDoc}
${TimeFrameFieldsForBikePageFragmentDoc}`;
export const BikeEventFieldsForTableFragmentDoc = gql`
    fragment BikeEventFieldsForTable on BikeEvent {
  id
  bikeEventType {
    ...BikeEventTypeFields
  }
  cargoBike {
    id
    name
  }
  responsible {
    ...ParticipantFieldsGeneral
  }
  related {
    ...ParticipantFieldsGeneral
  }
  date
  description
  documents
  remark
  isLockedByMe
  isLocked
  lockedBy
  lockedUntil
}
    ${BikeEventTypeFieldsFragmentDoc}
${ParticipantFieldsGeneralFragmentDoc}`;
export const BikeEventFieldsForPageFragmentDoc = gql`
    fragment BikeEventFieldsForPage on BikeEvent {
  ...BikeEventFieldsForTable
}
    ${BikeEventFieldsForTableFragmentDoc}`;
export const ContactInformationFieldsFragmentDoc = gql`
    fragment ContactInformationFields on ContactInformation {
  ...ContactInformationFieldsGeneral
  isLocked
  isLockedByMe
  isLockedByMe
  lockedUntil
}
    ${ContactInformationFieldsGeneralFragmentDoc}`;
export const EngagementFieldsFragmentDoc = gql`
    fragment EngagementFields on Engagement {
  id
  engagementType {
    ...EngagementTypeFields
  }
  dateRange {
    from
    to
  }
  participant {
    ...ParticipantFieldsGeneral
  }
  cargoBike {
    id
    name
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${EngagementTypeFieldsFragmentDoc}
${ParticipantFieldsGeneralFragmentDoc}`;
export const EquipmentFieldsForTableFragmentDoc = gql`
    fragment EquipmentFieldsForTable on Equipment {
  id
  serialNo
  title
  description
  cargoBike {
    id
    name
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    `;
export const LendingStationFieldsForTableFragmentDoc = gql`
    fragment LendingStationFieldsForTable on LendingStation {
  id
  name
  longName
  district
  contactInformationIntern {
    ...ContactInformationFieldsGeneral
  }
  contactInformationExtern {
    ...ContactInformationFieldsGeneral
  }
  address {
    ...AddressFields
  }
  organisation {
    ...OrganisationFieldsGeneral
  }
  remark
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${ContactInformationFieldsGeneralFragmentDoc}
${AddressFieldsFragmentDoc}
${OrganisationFieldsGeneralFragmentDoc}`;
export const TimeFrameFieldsForLendingStationFragmentDoc = gql`
    fragment TimeFrameFieldsForLendingStation on TimeFrame {
  id
  dateRange {
    from
    to
  }
  note
  cargoBike {
    id
    name
  }
}
    `;
export const LendingStationFieldsForPageFragmentDoc = gql`
    fragment LendingStationFieldsForPage on LendingStation {
  ...LendingStationFieldsForTable
  cargoBikes {
    id
    name
  }
  timeFrames {
    ...TimeFrameFieldsForLendingStation
  }
  loanPeriod {
    generalRemark
    particularities
    holidays
    mo
    tu
    we
    th
    fr
    sa
    su
  }
}
    ${LendingStationFieldsForTableFragmentDoc}
${TimeFrameFieldsForLendingStationFragmentDoc}`;
export const OrganisationFieldsForTableFragmentDoc = gql`
    fragment OrganisationFieldsForTable on Organisation {
  ...OrganisationFieldsGeneral
  registeredAt
  contactInformation {
    ...ContactInformationFieldsGeneral
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${OrganisationFieldsGeneralFragmentDoc}
${ContactInformationFieldsGeneralFragmentDoc}`;
export const ProviderFieldsForTableFragmentDoc = gql`
    fragment ProviderFieldsForTable on Provider {
  ...ProviderFieldsGeneral
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${ProviderFieldsGeneralFragmentDoc}`;
export const ProviderFieldsForPageFragmentDoc = gql`
    fragment ProviderFieldsForPage on Provider {
  ...ProviderFieldsForTable
  cargoBikes {
    id
    name
  }
}
    ${ProviderFieldsForTableFragmentDoc}`;
export const OrganisationFieldsForPageFragmentDoc = gql`
    fragment OrganisationFieldsForPage on Organisation {
  ...OrganisationFieldsForTable
  lendingStations {
    id
    name
  }
  provider {
    ...ProviderFieldsForPage
  }
}
    ${OrganisationFieldsForTableFragmentDoc}
${ProviderFieldsForPageFragmentDoc}`;
export const ParticipantFieldsForTableFragmentDoc = gql`
    fragment ParticipantFieldsForTable on Participant {
  ...ParticipantFieldsGeneral
  memberADFC
  locationZIPs
  memberCoreTeam
  distributedActiveBikeParte
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${ParticipantFieldsGeneralFragmentDoc}`;
export const EngagementFieldsForParticipantFragmentDoc = gql`
    fragment EngagementFieldsForParticipant on Engagement {
  id
  engagementType {
    ...EngagementTypeFields
  }
  dateRange {
    from
    to
  }
  cargoBike {
    id
    name
  }
}
    ${EngagementTypeFieldsFragmentDoc}`;
export const WorkshopTypefieldsGeneralFragmentDoc = gql`
    fragment WorkshopTypefieldsGeneral on WorkshopType {
  id
  name
}
    `;
export const WorkshopFieldsGeneralFragmentDoc = gql`
    fragment WorkshopFieldsGeneral on Workshop {
  id
  title
  description
  date
  workshopType {
    ...WorkshopTypefieldsGeneral
  }
  trainer1 {
    ...ParticipantFieldsGeneral
  }
  trainer2 {
    ...ParticipantFieldsGeneral
  }
}
    ${WorkshopTypefieldsGeneralFragmentDoc}
${ParticipantFieldsGeneralFragmentDoc}`;
export const ParticipantFieldsForPageFragmentDoc = gql`
    fragment ParticipantFieldsForPage on Participant {
  ...ParticipantFieldsForTable
  engagement {
    ...EngagementFieldsForParticipant
  }
  workshops {
    ...WorkshopFieldsGeneral
  }
}
    ${ParticipantFieldsForTableFragmentDoc}
${EngagementFieldsForParticipantFragmentDoc}
${WorkshopFieldsGeneralFragmentDoc}`;
export const PersonFieldsForTableFragmentDoc = gql`
    fragment PersonFieldsForTable on Person {
  id
  name
  firstName
  isLocked
  isLockedByMe
  isLockedByMe
  lockedUntil
}
    `;
export const PersonFieldsForPageFragmentDoc = gql`
    fragment PersonFieldsForPage on Person {
  ...PersonFieldsForTable
  contactInformation {
    ...ContactInformationFieldsGeneral
  }
}
    ${PersonFieldsForTableFragmentDoc}
${ContactInformationFieldsGeneralFragmentDoc}`;
export const TimeFrameFieldsFragmentDoc = gql`
    fragment TimeFrameFields on TimeFrame {
  id
  dateRange {
    from
    to
  }
  note
  lendingStation {
    id
    name
  }
  cargoBike {
    id
    name
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    `;
export const WorkshopFieldsForTableFragmentDoc = gql`
    fragment WorkshopFieldsForTable on Workshop {
  ...WorkshopFieldsGeneral
  participants {
    ...ParticipantFieldsGeneral
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${WorkshopFieldsGeneralFragmentDoc}
${ParticipantFieldsGeneralFragmentDoc}`;
export const WorkshopFieldsForPageFragmentDoc = gql`
    fragment WorkshopFieldsForPage on Workshop {
  ...WorkshopFieldsForTable
}
    ${WorkshopFieldsForTableFragmentDoc}`;
export const WorkshopTypeFieldsFragmentDoc = gql`
    fragment WorkshopTypeFields on WorkshopType {
  ...WorkshopTypefieldsGeneral
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${WorkshopTypefieldsGeneralFragmentDoc}`;
export const GetActionLogDocument = gql`
    query GetActionLog {
  actionLogAll {
    ...ActionLogFields
  }
}
    ${ActionLogFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetActionLogGQL extends Apollo.Query<GetActionLogQuery, GetActionLogQueryVariables> {
    document = GetActionLogDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetActionLogByUserIdDocument = gql`
    query GetActionLogByUserId($id: ID!) {
  actionLogByUser(id: $id) {
    ...ActionLogFields
  }
}
    ${ActionLogFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetActionLogByUserIdGQL extends Apollo.Query<GetActionLogByUserIdQuery, GetActionLogByUserIdQueryVariables> {
    document = GetActionLogByUserIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCargoBikesDocument = gql`
    query GetCargoBikes {
  cargoBikes {
    ...CargoBikeFieldsForTable
  }
}
    ${CargoBikeFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCargoBikesGQL extends Apollo.Query<GetCargoBikesQuery, GetCargoBikesQueryVariables> {
    document = GetCargoBikesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetCargoBikeByIdDocument = gql`
    query GetCargoBikeById($id: ID!) {
  cargoBikeById(id: $id) {
    ...CargoBikeFieldsForPage
  }
}
    ${CargoBikeFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCargoBikeByIdGQL extends Apollo.Query<GetCargoBikeByIdQuery, GetCargoBikeByIdQueryVariables> {
    document = GetCargoBikeByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CopyCargoBikeByIdDocument = gql`
    query copyCargoBikeById($id: ID!) {
  copyCargoBikeById(id: $id) {
    ...CargoBikeFieldsForTable
  }
}
    ${CargoBikeFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CopyCargoBikeByIdGQL extends Apollo.Query<CopyCargoBikeByIdQuery, CopyCargoBikeByIdQueryVariables> {
    document = CopyCargoBikeByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReloadCargoBikeByIdDocument = gql`
    query ReloadCargoBikeById($id: ID!) {
  cargoBikeById(id: $id) {
    ...CargoBikeFieldsForTable
  }
}
    ${CargoBikeFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReloadCargoBikeByIdGQL extends Apollo.Query<ReloadCargoBikeByIdQuery, ReloadCargoBikeByIdQueryVariables> {
    document = ReloadCargoBikeByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCargoBikeDocument = gql`
    mutation CreateCargoBike($bike: CargoBikeCreateInput!) {
  createCargoBike(cargoBike: $bike) {
    ...CargoBikeFieldsForTable
  }
}
    ${CargoBikeFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCargoBikeGQL extends Apollo.Mutation<CreateCargoBikeMutation, CreateCargoBikeMutationVariables> {
    document = CreateCargoBikeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCargoBikeDocument = gql`
    mutation UpdateCargoBike($bike: CargoBikeUpdateInput!) {
  updateCargoBike(cargoBike: $bike) {
    ...CargoBikeFieldsForPage
  }
}
    ${CargoBikeFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCargoBikeGQL extends Apollo.Mutation<UpdateCargoBikeMutation, UpdateCargoBikeMutationVariables> {
    document = UpdateCargoBikeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockCargoBikeDocument = gql`
    mutation LockCargoBike($id: ID!) {
  lockCargoBike(id: $id) {
    ...CargoBikeFieldsForPage
  }
}
    ${CargoBikeFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockCargoBikeGQL extends Apollo.Mutation<LockCargoBikeMutation, LockCargoBikeMutationVariables> {
    document = LockCargoBikeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockCargoBikeDocument = gql`
    mutation UnlockCargoBike($id: ID!) {
  unlockCargoBike(id: $id) {
    ...CargoBikeFieldsForPage
  }
}
    ${CargoBikeFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockCargoBikeGQL extends Apollo.Mutation<UnlockCargoBikeMutation, UnlockCargoBikeMutationVariables> {
    document = UnlockCargoBikeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteCargoBikeDocument = gql`
    mutation DeleteCargoBike($id: ID!) {
  deleteCargoBike(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCargoBikeGQL extends Apollo.Mutation<DeleteCargoBikeMutation, DeleteCargoBikeMutationVariables> {
    document = DeleteCargoBikeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetBikeEventsDocument = gql`
    query GetBikeEvents {
  bikeEvents {
    ...BikeEventFieldsForTable
  }
}
    ${BikeEventFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBikeEventsGQL extends Apollo.Query<GetBikeEventsQuery, GetBikeEventsQueryVariables> {
    document = GetBikeEventsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetBikeEventByIdDocument = gql`
    query GetBikeEventById($id: ID!) {
  bikeEventById(id: $id) {
    ...BikeEventFieldsForPage
  }
}
    ${BikeEventFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBikeEventByIdGQL extends Apollo.Query<GetBikeEventByIdQuery, GetBikeEventByIdQueryVariables> {
    document = GetBikeEventByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReloadBikeEventByIdDocument = gql`
    query ReloadBikeEventById($id: ID!) {
  bikeEventById(id: $id) {
    ...BikeEventFieldsForTable
  }
}
    ${BikeEventFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReloadBikeEventByIdGQL extends Apollo.Query<ReloadBikeEventByIdQuery, ReloadBikeEventByIdQueryVariables> {
    document = ReloadBikeEventByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateBikeEventDocument = gql`
    mutation CreateBikeEvent($bikeEvent: BikeEventCreateInput!) {
  createBikeEvent(bikeEvent: $bikeEvent) {
    ...BikeEventFieldsForTable
  }
}
    ${BikeEventFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBikeEventGQL extends Apollo.Mutation<CreateBikeEventMutation, CreateBikeEventMutationVariables> {
    document = CreateBikeEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateBikeEventDocument = gql`
    mutation UpdateBikeEvent($bikeEvent: BikeEventUpdateInput!) {
  updateBikeEvent(bikeEvent: $bikeEvent) {
    ...BikeEventFieldsForPage
  }
}
    ${BikeEventFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBikeEventGQL extends Apollo.Mutation<UpdateBikeEventMutation, UpdateBikeEventMutationVariables> {
    document = UpdateBikeEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockBikeEventDocument = gql`
    mutation LockBikeEvent($id: ID!) {
  lockBikeEvent(id: $id) {
    ...BikeEventFieldsForPage
  }
}
    ${BikeEventFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockBikeEventGQL extends Apollo.Mutation<LockBikeEventMutation, LockBikeEventMutationVariables> {
    document = LockBikeEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockBikeEventDocument = gql`
    mutation UnlockBikeEvent($id: ID!) {
  unlockBikeEvent(id: $id) {
    ...BikeEventFieldsForPage
  }
}
    ${BikeEventFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockBikeEventGQL extends Apollo.Mutation<UnlockBikeEventMutation, UnlockBikeEventMutationVariables> {
    document = UnlockBikeEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteBikeEventDocument = gql`
    mutation DeleteBikeEvent($id: ID!) {
  deleteBikeEvent(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteBikeEventGQL extends Apollo.Mutation<DeleteBikeEventMutation, DeleteBikeEventMutationVariables> {
    document = DeleteBikeEventDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetBikeEventTypesDocument = gql`
    query GetBikeEventTypes {
  bikeEventTypes {
    ...BikeEventTypeFields
  }
}
    ${BikeEventTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBikeEventTypesGQL extends Apollo.Query<GetBikeEventTypesQuery, GetBikeEventTypesQueryVariables> {
    document = GetBikeEventTypesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateBikeEventTypeDocument = gql`
    mutation CreateBikeEventType($bikeEventType: BikeEventTypeCreateInput!) {
  createBikeEventType(bikeEventType: $bikeEventType) {
    ...BikeEventTypeFields
  }
}
    ${BikeEventTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBikeEventTypeGQL extends Apollo.Mutation<CreateBikeEventTypeMutation, CreateBikeEventTypeMutationVariables> {
    document = CreateBikeEventTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateBikeEventTypeDocument = gql`
    mutation UpdateBikeEventType($bikeEventType: BikeEventTypeUpdateInput!) {
  updateBikeEventType(bikeEventType: $bikeEventType) {
    ...BikeEventTypeFields
  }
}
    ${BikeEventTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBikeEventTypeGQL extends Apollo.Mutation<UpdateBikeEventTypeMutation, UpdateBikeEventTypeMutationVariables> {
    document = UpdateBikeEventTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockBikeEventTypeDocument = gql`
    mutation LockBikeEventType($id: ID!) {
  lockBikeEventType(id: $id) {
    ...BikeEventTypeFields
  }
}
    ${BikeEventTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockBikeEventTypeGQL extends Apollo.Mutation<LockBikeEventTypeMutation, LockBikeEventTypeMutationVariables> {
    document = LockBikeEventTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockBikeEventTypeDocument = gql`
    mutation UnlockBikeEventType($id: ID!) {
  unlockBikeEventType(id: $id) {
    ...BikeEventTypeFields
  }
}
    ${BikeEventTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockBikeEventTypeGQL extends Apollo.Mutation<UnlockBikeEventTypeMutation, UnlockBikeEventTypeMutationVariables> {
    document = UnlockBikeEventTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteBikeEventTypeDocument = gql`
    mutation DeleteBikeEventType($id: ID!) {
  deleteBikeEventType(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteBikeEventTypeGQL extends Apollo.Mutation<DeleteBikeEventTypeMutation, DeleteBikeEventTypeMutationVariables> {
    document = DeleteBikeEventTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetContactInformationDocument = gql`
    query GetContactInformation {
  contactInformation {
    ...ContactInformationFields
  }
}
    ${ContactInformationFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetContactInformationGQL extends Apollo.Query<GetContactInformationQuery, GetContactInformationQueryVariables> {
    document = GetContactInformationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateContactInformationDocument = gql`
    mutation CreateContactInformation($contactInformation: ContactInformationCreateInput!) {
  createContactInformation(contactInformation: $contactInformation) {
    ...ContactInformationFields
  }
}
    ${ContactInformationFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateContactInformationGQL extends Apollo.Mutation<CreateContactInformationMutation, CreateContactInformationMutationVariables> {
    document = CreateContactInformationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateContactInformationDocument = gql`
    mutation UpdateContactInformation($contactInformation: ContactInformationUpdateInput!) {
  updateContactInformation(contactInformation: $contactInformation) {
    ...ContactInformationFields
  }
}
    ${ContactInformationFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateContactInformationGQL extends Apollo.Mutation<UpdateContactInformationMutation, UpdateContactInformationMutationVariables> {
    document = UpdateContactInformationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockContactInformationDocument = gql`
    mutation LockContactInformation($id: ID!) {
  lockContactInformation(id: $id) {
    ...ContactInformationFields
  }
}
    ${ContactInformationFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockContactInformationGQL extends Apollo.Mutation<LockContactInformationMutation, LockContactInformationMutationVariables> {
    document = LockContactInformationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockContactInformationDocument = gql`
    mutation UnlockContactInformation($id: ID!) {
  unlockContactInformation(id: $id) {
    ...ContactInformationFields
  }
}
    ${ContactInformationFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockContactInformationGQL extends Apollo.Mutation<UnlockContactInformationMutation, UnlockContactInformationMutationVariables> {
    document = UnlockContactInformationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteContactInformationDocument = gql`
    mutation DeleteContactInformation($id: ID!) {
  deleteContactInformation(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteContactInformationGQL extends Apollo.Mutation<DeleteContactInformationMutation, DeleteContactInformationMutationVariables> {
    document = DeleteContactInformationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetEngagementsDocument = gql`
    query GetEngagements {
  engagements {
    ...EngagementFields
  }
}
    ${EngagementFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEngagementsGQL extends Apollo.Query<GetEngagementsQuery, GetEngagementsQueryVariables> {
    document = GetEngagementsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateEngagementDocument = gql`
    mutation CreateEngagement($engagement: EngagementCreateInput!) {
  createEngagement(engagement: $engagement) {
    ...EngagementFields
  }
}
    ${EngagementFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEngagementGQL extends Apollo.Mutation<CreateEngagementMutation, CreateEngagementMutationVariables> {
    document = CreateEngagementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateEngagementDocument = gql`
    mutation UpdateEngagement($engagement: EngagementUpdateInput!) {
  updateEngagement(engagement: $engagement) {
    ...EngagementFields
  }
}
    ${EngagementFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateEngagementGQL extends Apollo.Mutation<UpdateEngagementMutation, UpdateEngagementMutationVariables> {
    document = UpdateEngagementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockEngagementDocument = gql`
    mutation LockEngagement($id: ID!) {
  lockEngagement(id: $id) {
    ...EngagementFields
  }
}
    ${EngagementFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockEngagementGQL extends Apollo.Mutation<LockEngagementMutation, LockEngagementMutationVariables> {
    document = LockEngagementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockEngagementDocument = gql`
    mutation UnlockEngagement($id: ID!) {
  unlockEngagement(id: $id) {
    ...EngagementFields
  }
}
    ${EngagementFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockEngagementGQL extends Apollo.Mutation<UnlockEngagementMutation, UnlockEngagementMutationVariables> {
    document = UnlockEngagementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteEngagementDocument = gql`
    mutation DeleteEngagement($id: ID!) {
  deleteEngagement(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteEngagementGQL extends Apollo.Mutation<DeleteEngagementMutation, DeleteEngagementMutationVariables> {
    document = DeleteEngagementDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetEngagementTypesDocument = gql`
    query GetEngagementTypes {
  engagementTypes {
    ...EngagementTypeFields
  }
}
    ${EngagementTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEngagementTypesGQL extends Apollo.Query<GetEngagementTypesQuery, GetEngagementTypesQueryVariables> {
    document = GetEngagementTypesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateEngagementTypeDocument = gql`
    mutation CreateEngagementType($engagementType: EngagementTypeCreateInput!) {
  createEngagementType(engagementType: $engagementType) {
    ...EngagementTypeFields
  }
}
    ${EngagementTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEngagementTypeGQL extends Apollo.Mutation<CreateEngagementTypeMutation, CreateEngagementTypeMutationVariables> {
    document = CreateEngagementTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateEngagementTypeDocument = gql`
    mutation UpdateEngagementType($engagementType: EngagementTypeUpdateInput!) {
  updateEngagementType(engagementType: $engagementType) {
    ...EngagementTypeFields
  }
}
    ${EngagementTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateEngagementTypeGQL extends Apollo.Mutation<UpdateEngagementTypeMutation, UpdateEngagementTypeMutationVariables> {
    document = UpdateEngagementTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockEngagementTypeDocument = gql`
    mutation LockEngagementType($id: ID!) {
  lockEngagementType(id: $id) {
    ...EngagementTypeFields
  }
}
    ${EngagementTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockEngagementTypeGQL extends Apollo.Mutation<LockEngagementTypeMutation, LockEngagementTypeMutationVariables> {
    document = LockEngagementTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockEngagementTypeDocument = gql`
    mutation UnlockEngagementType($id: ID!) {
  unlockEngagementType(id: $id) {
    ...EngagementTypeFields
  }
}
    ${EngagementTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockEngagementTypeGQL extends Apollo.Mutation<UnlockEngagementTypeMutation, UnlockEngagementTypeMutationVariables> {
    document = UnlockEngagementTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteEngagementTypeDocument = gql`
    mutation DeleteEngagementType($id: ID!) {
  deleteEngagementType(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteEngagementTypeGQL extends Apollo.Mutation<DeleteEngagementTypeMutation, DeleteEngagementTypeMutationVariables> {
    document = DeleteEngagementTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetEquipmentsDocument = gql`
    query GetEquipments {
  equipment {
    ...EquipmentFieldsForTable
  }
}
    ${EquipmentFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEquipmentsGQL extends Apollo.Query<GetEquipmentsQuery, GetEquipmentsQueryVariables> {
    document = GetEquipmentsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateEquipmentDocument = gql`
    mutation CreateEquipment($equipmentType: EquipmentCreateInput!) {
  createEquipment(equipment: $equipmentType) {
    ...EquipmentFieldsForTable
  }
}
    ${EquipmentFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEquipmentGQL extends Apollo.Mutation<CreateEquipmentMutation, CreateEquipmentMutationVariables> {
    document = CreateEquipmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateEquipmentDocument = gql`
    mutation UpdateEquipment($equipmentType: EquipmentUpdateInput!) {
  updateEquipment(equipment: $equipmentType) {
    ...EquipmentFieldsForTable
  }
}
    ${EquipmentFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateEquipmentGQL extends Apollo.Mutation<UpdateEquipmentMutation, UpdateEquipmentMutationVariables> {
    document = UpdateEquipmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockEquipmentDocument = gql`
    mutation LockEquipment($id: ID!) {
  lockEquipment(id: $id) {
    ...EquipmentFieldsForTable
  }
}
    ${EquipmentFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockEquipmentGQL extends Apollo.Mutation<LockEquipmentMutation, LockEquipmentMutationVariables> {
    document = LockEquipmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockEquipmentDocument = gql`
    mutation UnlockEquipment($id: ID!) {
  unlockEquipment(id: $id) {
    ...EquipmentFieldsForTable
  }
}
    ${EquipmentFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockEquipmentGQL extends Apollo.Mutation<UnlockEquipmentMutation, UnlockEquipmentMutationVariables> {
    document = UnlockEquipmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteEquipmentDocument = gql`
    mutation DeleteEquipment($id: ID!) {
  deleteEquipment(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteEquipmentGQL extends Apollo.Mutation<DeleteEquipmentMutation, DeleteEquipmentMutationVariables> {
    document = DeleteEquipmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetEquipmentTypesDocument = gql`
    query GetEquipmentTypes {
  equipmentTypes {
    ...EquipmentTypeFields
  }
}
    ${EquipmentTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEquipmentTypesGQL extends Apollo.Query<GetEquipmentTypesQuery, GetEquipmentTypesQueryVariables> {
    document = GetEquipmentTypesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateEquipmentTypeDocument = gql`
    mutation CreateEquipmentType($equipmentType: EquipmentTypeCreateInput!) {
  createEquipmentType(equipmentType: $equipmentType) {
    ...EquipmentTypeFields
  }
}
    ${EquipmentTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEquipmentTypeGQL extends Apollo.Mutation<CreateEquipmentTypeMutation, CreateEquipmentTypeMutationVariables> {
    document = CreateEquipmentTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateEquipmentTypeDocument = gql`
    mutation UpdateEquipmentType($equipmentType: EquipmentTypeUpdateInput!) {
  updateEquipmentType(equipmentType: $equipmentType) {
    ...EquipmentTypeFields
  }
}
    ${EquipmentTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateEquipmentTypeGQL extends Apollo.Mutation<UpdateEquipmentTypeMutation, UpdateEquipmentTypeMutationVariables> {
    document = UpdateEquipmentTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockEquipmentTypeDocument = gql`
    mutation LockEquipmentType($id: ID!) {
  lockEquipmentType(id: $id) {
    ...EquipmentTypeFields
  }
}
    ${EquipmentTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockEquipmentTypeGQL extends Apollo.Mutation<LockEquipmentTypeMutation, LockEquipmentTypeMutationVariables> {
    document = LockEquipmentTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockEquipmentTypeDocument = gql`
    mutation UnlockEquipmentType($id: ID!) {
  unlockEquipmentType(id: $id) {
    ...EquipmentTypeFields
  }
}
    ${EquipmentTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockEquipmentTypeGQL extends Apollo.Mutation<UnlockEquipmentTypeMutation, UnlockEquipmentTypeMutationVariables> {
    document = UnlockEquipmentTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteEquipmentTypeDocument = gql`
    mutation DeleteEquipmentType($id: ID!) {
  deleteEquipmentType(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteEquipmentTypeGQL extends Apollo.Mutation<DeleteEquipmentTypeMutation, DeleteEquipmentTypeMutationVariables> {
    document = DeleteEquipmentTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetLendingStationsDocument = gql`
    query GetLendingStations {
  lendingStations {
    ...LendingStationFieldsForTable
  }
}
    ${LendingStationFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLendingStationsGQL extends Apollo.Query<GetLendingStationsQuery, GetLendingStationsQueryVariables> {
    document = GetLendingStationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetLendingStationByIdDocument = gql`
    query GetLendingStationById($id: ID!) {
  lendingStationById(id: $id) {
    ...LendingStationFieldsForPage
  }
}
    ${LendingStationFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLendingStationByIdGQL extends Apollo.Query<GetLendingStationByIdQuery, GetLendingStationByIdQueryVariables> {
    document = GetLendingStationByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReloadLendingStationByIdDocument = gql`
    query ReloadLendingStationById($id: ID!) {
  lendingStationById(id: $id) {
    ...LendingStationFieldsForTable
  }
}
    ${LendingStationFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReloadLendingStationByIdGQL extends Apollo.Query<ReloadLendingStationByIdQuery, ReloadLendingStationByIdQueryVariables> {
    document = ReloadLendingStationByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateLendingStationDocument = gql`
    mutation CreateLendingStation($lendingStation: LendingStationCreateInput!) {
  createLendingStation(lendingStation: $lendingStation) {
    ...LendingStationFieldsForTable
  }
}
    ${LendingStationFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateLendingStationGQL extends Apollo.Mutation<CreateLendingStationMutation, CreateLendingStationMutationVariables> {
    document = CreateLendingStationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateLendingStationDocument = gql`
    mutation UpdateLendingStation($lendingStation: LendingStationUpdateInput!) {
  updateLendingStation(lendingStation: $lendingStation) {
    ...LendingStationFieldsForPage
  }
}
    ${LendingStationFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateLendingStationGQL extends Apollo.Mutation<UpdateLendingStationMutation, UpdateLendingStationMutationVariables> {
    document = UpdateLendingStationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockLendingStationDocument = gql`
    mutation LockLendingStation($id: ID!) {
  lockLendingStation(id: $id) {
    ...LendingStationFieldsForPage
  }
}
    ${LendingStationFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockLendingStationGQL extends Apollo.Mutation<LockLendingStationMutation, LockLendingStationMutationVariables> {
    document = LockLendingStationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockLendingStationDocument = gql`
    mutation UnlockLendingStation($id: ID!) {
  unlockLendingStation(id: $id) {
    ...LendingStationFieldsForPage
  }
}
    ${LendingStationFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockLendingStationGQL extends Apollo.Mutation<UnlockLendingStationMutation, UnlockLendingStationMutationVariables> {
    document = UnlockLendingStationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteLendingStationDocument = gql`
    mutation DeleteLendingStation($id: ID!) {
  deleteLendingStation(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteLendingStationGQL extends Apollo.Mutation<DeleteLendingStationMutation, DeleteLendingStationMutationVariables> {
    document = DeleteLendingStationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetOrganisationsDocument = gql`
    query GetOrganisations {
  organisations {
    ...OrganisationFieldsForTable
  }
}
    ${OrganisationFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOrganisationsGQL extends Apollo.Query<GetOrganisationsQuery, GetOrganisationsQueryVariables> {
    document = GetOrganisationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetOrganisationByIdDocument = gql`
    query GetOrganisationById($id: ID!) {
  organisationById(id: $id) {
    ...OrganisationFieldsForPage
  }
}
    ${OrganisationFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOrganisationByIdGQL extends Apollo.Query<GetOrganisationByIdQuery, GetOrganisationByIdQueryVariables> {
    document = GetOrganisationByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReloadOrganisationByIdDocument = gql`
    query ReloadOrganisationById($id: ID!) {
  organisationById(id: $id) {
    ...OrganisationFieldsForTable
  }
}
    ${OrganisationFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReloadOrganisationByIdGQL extends Apollo.Query<ReloadOrganisationByIdQuery, ReloadOrganisationByIdQueryVariables> {
    document = ReloadOrganisationByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateOrganisationDocument = gql`
    mutation CreateOrganisation($organisation: OrganisationCreateInput!) {
  createOrganisation(organisation: $organisation) {
    ...OrganisationFieldsForTable
  }
}
    ${OrganisationFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOrganisationGQL extends Apollo.Mutation<CreateOrganisationMutation, CreateOrganisationMutationVariables> {
    document = CreateOrganisationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateOrganisationDocument = gql`
    mutation UpdateOrganisation($organisation: OrganisationUpdateInput!) {
  updateOrganisation(organisation: $organisation) {
    ...OrganisationFieldsForPage
  }
}
    ${OrganisationFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateOrganisationGQL extends Apollo.Mutation<UpdateOrganisationMutation, UpdateOrganisationMutationVariables> {
    document = UpdateOrganisationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockOrganisationDocument = gql`
    mutation LockOrganisation($id: ID!) {
  lockOrganisation(id: $id) {
    ...OrganisationFieldsForPage
  }
}
    ${OrganisationFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockOrganisationGQL extends Apollo.Mutation<LockOrganisationMutation, LockOrganisationMutationVariables> {
    document = LockOrganisationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockOrganisationDocument = gql`
    mutation UnlockOrganisation($id: ID!) {
  unlockOrganisation(id: $id) {
    ...OrganisationFieldsForPage
  }
}
    ${OrganisationFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockOrganisationGQL extends Apollo.Mutation<UnlockOrganisationMutation, UnlockOrganisationMutationVariables> {
    document = UnlockOrganisationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteOrganisationDocument = gql`
    mutation DeleteOrganisation($id: ID!) {
  deleteOrganisation(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteOrganisationGQL extends Apollo.Mutation<DeleteOrganisationMutation, DeleteOrganisationMutationVariables> {
    document = DeleteOrganisationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetParticipantsDocument = gql`
    query GetParticipants {
  participants {
    ...ParticipantFieldsForTable
  }
}
    ${ParticipantFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetParticipantsGQL extends Apollo.Query<GetParticipantsQuery, GetParticipantsQueryVariables> {
    document = GetParticipantsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetParticipantByIdDocument = gql`
    query GetParticipantById($id: ID!) {
  participantById(id: $id) {
    ...ParticipantFieldsForPage
  }
}
    ${ParticipantFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetParticipantByIdGQL extends Apollo.Query<GetParticipantByIdQuery, GetParticipantByIdQueryVariables> {
    document = GetParticipantByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReloadParticipantByIdDocument = gql`
    query ReloadParticipantById($id: ID!) {
  participantById(id: $id) {
    ...ParticipantFieldsForTable
  }
}
    ${ParticipantFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReloadParticipantByIdGQL extends Apollo.Query<ReloadParticipantByIdQuery, ReloadParticipantByIdQueryVariables> {
    document = ReloadParticipantByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateParticipantDocument = gql`
    mutation CreateParticipant($participant: ParticipantCreateInput!) {
  createParticipant(participant: $participant) {
    ...ParticipantFieldsForTable
  }
}
    ${ParticipantFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateParticipantGQL extends Apollo.Mutation<CreateParticipantMutation, CreateParticipantMutationVariables> {
    document = CreateParticipantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateParticipantDocument = gql`
    mutation UpdateParticipant($participant: ParticipantUpdateInput!) {
  updateParticipant(participant: $participant) {
    ...ParticipantFieldsForPage
  }
}
    ${ParticipantFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateParticipantGQL extends Apollo.Mutation<UpdateParticipantMutation, UpdateParticipantMutationVariables> {
    document = UpdateParticipantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockParticipantDocument = gql`
    mutation LockParticipant($id: ID!) {
  lockParticipant(id: $id) {
    ...ParticipantFieldsForPage
  }
}
    ${ParticipantFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockParticipantGQL extends Apollo.Mutation<LockParticipantMutation, LockParticipantMutationVariables> {
    document = LockParticipantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockParticipantDocument = gql`
    mutation UnlockParticipant($id: ID!) {
  unlockParticipant(id: $id) {
    ...ParticipantFieldsForPage
  }
}
    ${ParticipantFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockParticipantGQL extends Apollo.Mutation<UnlockParticipantMutation, UnlockParticipantMutationVariables> {
    document = UnlockParticipantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteParticipantDocument = gql`
    mutation DeleteParticipant($id: ID!) {
  deleteParticipant(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteParticipantGQL extends Apollo.Mutation<DeleteParticipantMutation, DeleteParticipantMutationVariables> {
    document = DeleteParticipantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetPersonsDocument = gql`
    query GetPersons {
  persons {
    ...PersonFieldsForTable
  }
}
    ${PersonFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPersonsGQL extends Apollo.Query<GetPersonsQuery, GetPersonsQueryVariables> {
    document = GetPersonsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetPersonByIdDocument = gql`
    query GetPersonById($id: ID!) {
  personById(id: $id) {
    ...PersonFieldsForPage
  }
}
    ${PersonFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPersonByIdGQL extends Apollo.Query<GetPersonByIdQuery, GetPersonByIdQueryVariables> {
    document = GetPersonByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReloadPersonByIdDocument = gql`
    query ReloadPersonById($id: ID!) {
  personById(id: $id) {
    ...PersonFieldsForTable
  }
}
    ${PersonFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReloadPersonByIdGQL extends Apollo.Query<ReloadPersonByIdQuery, ReloadPersonByIdQueryVariables> {
    document = ReloadPersonByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreatePersonDocument = gql`
    mutation CreatePerson($person: PersonCreateInput!) {
  createPerson(person: $person) {
    ...PersonFieldsForTable
  }
}
    ${PersonFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePersonGQL extends Apollo.Mutation<CreatePersonMutation, CreatePersonMutationVariables> {
    document = CreatePersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdatePersonDocument = gql`
    mutation UpdatePerson($person: PersonUpdateInput!) {
  updatePerson(person: $person) {
    ...PersonFieldsForPage
  }
}
    ${PersonFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdatePersonGQL extends Apollo.Mutation<UpdatePersonMutation, UpdatePersonMutationVariables> {
    document = UpdatePersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockPersonDocument = gql`
    mutation LockPerson($id: ID!) {
  lockPerson(id: $id) {
    ...PersonFieldsForPage
  }
}
    ${PersonFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockPersonGQL extends Apollo.Mutation<LockPersonMutation, LockPersonMutationVariables> {
    document = LockPersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockPersonDocument = gql`
    mutation UnlockPerson($id: ID!) {
  unlockPerson(id: $id) {
    ...PersonFieldsForPage
  }
}
    ${PersonFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockPersonGQL extends Apollo.Mutation<UnlockPersonMutation, UnlockPersonMutationVariables> {
    document = UnlockPersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeletePersonDocument = gql`
    mutation DeletePerson($id: ID!) {
  deletePerson(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePersonGQL extends Apollo.Mutation<DeletePersonMutation, DeletePersonMutationVariables> {
    document = DeletePersonDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetProvidersDocument = gql`
    query GetProviders {
  providers {
    ...ProviderFieldsForTable
  }
}
    ${ProviderFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProvidersGQL extends Apollo.Query<GetProvidersQuery, GetProvidersQueryVariables> {
    document = GetProvidersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetProviderByIdDocument = gql`
    query GetProviderById($id: ID!) {
  providerById(id: $id) {
    ...ProviderFieldsForPage
  }
}
    ${ProviderFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProviderByIdGQL extends Apollo.Query<GetProviderByIdQuery, GetProviderByIdQueryVariables> {
    document = GetProviderByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReloadProviderByIdDocument = gql`
    query ReloadProviderById($id: ID!) {
  providerById(id: $id) {
    ...ProviderFieldsForTable
  }
}
    ${ProviderFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReloadProviderByIdGQL extends Apollo.Query<ReloadProviderByIdQuery, ReloadProviderByIdQueryVariables> {
    document = ReloadProviderByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateProviderDocument = gql`
    mutation CreateProvider($provider: ProviderCreateInput!) {
  createProvider(provider: $provider) {
    ...ProviderFieldsForTable
  }
}
    ${ProviderFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProviderGQL extends Apollo.Mutation<CreateProviderMutation, CreateProviderMutationVariables> {
    document = CreateProviderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateProviderDocument = gql`
    mutation UpdateProvider($provider: ProviderUpdateInput!) {
  updateProvider(provider: $provider) {
    ...ProviderFieldsForPage
  }
}
    ${ProviderFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProviderGQL extends Apollo.Mutation<UpdateProviderMutation, UpdateProviderMutationVariables> {
    document = UpdateProviderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockProviderDocument = gql`
    mutation LockProvider($id: ID!) {
  lockProvider(id: $id) {
    ...ProviderFieldsForPage
  }
}
    ${ProviderFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockProviderGQL extends Apollo.Mutation<LockProviderMutation, LockProviderMutationVariables> {
    document = LockProviderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockProviderDocument = gql`
    mutation UnlockProvider($id: ID!) {
  unlockProvider(id: $id) {
    ...ProviderFieldsForPage
  }
}
    ${ProviderFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockProviderGQL extends Apollo.Mutation<UnlockProviderMutation, UnlockProviderMutationVariables> {
    document = UnlockProviderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteProviderDocument = gql`
    mutation DeleteProvider($id: ID!) {
  deleteProvider(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProviderGQL extends Apollo.Mutation<DeleteProviderMutation, DeleteProviderMutationVariables> {
    document = DeleteProviderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTimeFramesDocument = gql`
    query GetTimeFrames {
  timeFrames {
    ...TimeFrameFields
  }
}
    ${TimeFrameFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTimeFramesGQL extends Apollo.Query<GetTimeFramesQuery, GetTimeFramesQueryVariables> {
    document = GetTimeFramesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTimeFrameDocument = gql`
    mutation CreateTimeFrame($timeFrame: TimeFrameCreateInput!) {
  createTimeFrame(timeFrame: $timeFrame) {
    ...TimeFrameFields
  }
}
    ${TimeFrameFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTimeFrameGQL extends Apollo.Mutation<CreateTimeFrameMutation, CreateTimeFrameMutationVariables> {
    document = CreateTimeFrameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTimeFrameDocument = gql`
    mutation UpdateTimeFrame($timeFrame: TimeFrameUpdateInput!) {
  updateTimeFrame(timeFrame: $timeFrame) {
    ...TimeFrameFields
  }
}
    ${TimeFrameFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTimeFrameGQL extends Apollo.Mutation<UpdateTimeFrameMutation, UpdateTimeFrameMutationVariables> {
    document = UpdateTimeFrameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockTimeFrameDocument = gql`
    mutation LockTimeFrame($id: ID!) {
  lockTimeFrame(id: $id) {
    ...TimeFrameFields
  }
}
    ${TimeFrameFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockTimeFrameGQL extends Apollo.Mutation<LockTimeFrameMutation, LockTimeFrameMutationVariables> {
    document = LockTimeFrameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockTimeFrameDocument = gql`
    mutation UnlockTimeFrame($id: ID!) {
  unlockTimeFrame(id: $id) {
    ...TimeFrameFields
  }
}
    ${TimeFrameFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockTimeFrameGQL extends Apollo.Mutation<UnlockTimeFrameMutation, UnlockTimeFrameMutationVariables> {
    document = UnlockTimeFrameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTimeFrameDocument = gql`
    mutation DeleteTimeFrame($id: ID!) {
  deleteTimeFrame(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTimeFrameGQL extends Apollo.Mutation<DeleteTimeFrameMutation, DeleteTimeFrameMutationVariables> {
    document = DeleteTimeFrameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetWorkshopsDocument = gql`
    query GetWorkshops {
  workshops {
    ...WorkshopFieldsForTable
  }
}
    ${WorkshopFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetWorkshopsGQL extends Apollo.Query<GetWorkshopsQuery, GetWorkshopsQueryVariables> {
    document = GetWorkshopsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetWorkshopByIdDocument = gql`
    query GetWorkshopById($id: ID!) {
  workshopById(id: $id) {
    ...WorkshopFieldsForPage
  }
}
    ${WorkshopFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetWorkshopByIdGQL extends Apollo.Query<GetWorkshopByIdQuery, GetWorkshopByIdQueryVariables> {
    document = GetWorkshopByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReloadWorkshopByIdDocument = gql`
    query ReloadWorkshopById($id: ID!) {
  workshopById(id: $id) {
    ...WorkshopFieldsForTable
  }
}
    ${WorkshopFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class ReloadWorkshopByIdGQL extends Apollo.Query<ReloadWorkshopByIdQuery, ReloadWorkshopByIdQueryVariables> {
    document = ReloadWorkshopByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateWorkshopDocument = gql`
    mutation CreateWorkshop($workshop: WorkshopCreateInput!) {
  createWorkshop(workshop: $workshop) {
    ...WorkshopFieldsForTable
  }
}
    ${WorkshopFieldsForTableFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateWorkshopGQL extends Apollo.Mutation<CreateWorkshopMutation, CreateWorkshopMutationVariables> {
    document = CreateWorkshopDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateWorkshopDocument = gql`
    mutation UpdateWorkshop($workshop: WorkshopUpdateInput!) {
  updateWorkshop(workshop: $workshop) {
    ...WorkshopFieldsForPage
  }
}
    ${WorkshopFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateWorkshopGQL extends Apollo.Mutation<UpdateWorkshopMutation, UpdateWorkshopMutationVariables> {
    document = UpdateWorkshopDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockWorkshopDocument = gql`
    mutation LockWorkshop($id: ID!) {
  lockWorkshop(id: $id) {
    ...WorkshopFieldsForPage
  }
}
    ${WorkshopFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockWorkshopGQL extends Apollo.Mutation<LockWorkshopMutation, LockWorkshopMutationVariables> {
    document = LockWorkshopDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockWorkshopDocument = gql`
    mutation UnlockWorkshop($id: ID!) {
  unlockWorkshop(id: $id) {
    ...WorkshopFieldsForPage
  }
}
    ${WorkshopFieldsForPageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockWorkshopGQL extends Apollo.Mutation<UnlockWorkshopMutation, UnlockWorkshopMutationVariables> {
    document = UnlockWorkshopDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteWorkshopDocument = gql`
    mutation DeleteWorkshop($id: ID!) {
  deleteWorkshop(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteWorkshopGQL extends Apollo.Mutation<DeleteWorkshopMutation, DeleteWorkshopMutationVariables> {
    document = DeleteWorkshopDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetWorkshopTypesDocument = gql`
    query GetWorkshopTypes {
  workshopTypes {
    ...WorkshopTypeFields
  }
}
    ${WorkshopTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetWorkshopTypesGQL extends Apollo.Query<GetWorkshopTypesQuery, GetWorkshopTypesQueryVariables> {
    document = GetWorkshopTypesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateWorkshopTypeDocument = gql`
    mutation CreateWorkshopType($workshopType: WorkshopTypeCreateInput!) {
  createWorkshopType(workshopType: $workshopType) {
    ...WorkshopTypeFields
  }
}
    ${WorkshopTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateWorkshopTypeGQL extends Apollo.Mutation<CreateWorkshopTypeMutation, CreateWorkshopTypeMutationVariables> {
    document = CreateWorkshopTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateWorkshopTypeDocument = gql`
    mutation UpdateWorkshopType($workshopType: WorkshopTypeUpdateInput!) {
  updateWorkshopType(workshopType: $workshopType) {
    ...WorkshopTypeFields
  }
}
    ${WorkshopTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateWorkshopTypeGQL extends Apollo.Mutation<UpdateWorkshopTypeMutation, UpdateWorkshopTypeMutationVariables> {
    document = UpdateWorkshopTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LockWorkshopTypeDocument = gql`
    mutation LockWorkshopType($id: ID!) {
  lockWorkshopType(id: $id) {
    ...WorkshopTypeFields
  }
}
    ${WorkshopTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class LockWorkshopTypeGQL extends Apollo.Mutation<LockWorkshopTypeMutation, LockWorkshopTypeMutationVariables> {
    document = LockWorkshopTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UnlockWorkshopTypeDocument = gql`
    mutation UnlockWorkshopType($id: ID!) {
  unlockWorkshopType(id: $id) {
    ...WorkshopTypeFields
  }
}
    ${WorkshopTypeFieldsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UnlockWorkshopTypeGQL extends Apollo.Mutation<UnlockWorkshopTypeMutation, UnlockWorkshopTypeMutationVariables> {
    document = UnlockWorkshopTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteWorkshopTypeDocument = gql`
    mutation DeleteWorkshopType($id: ID!) {
  deleteWorkshopType(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteWorkshopTypeGQL extends Apollo.Mutation<DeleteWorkshopTypeMutation, DeleteWorkshopTypeMutationVariables> {
    document = DeleteWorkshopTypeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }