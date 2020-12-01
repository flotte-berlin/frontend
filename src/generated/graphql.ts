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
  /** timestamp object YYYY-MM-ddThh:mm:ss.sssZ */
  Date: any;
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};






/** The CargoBike type is central to the graph. You could call it the root. */
export type CargoBike = {
  __typename?: 'CargoBike';
  id: Scalars['ID'];
  /** see column A in info tabelle */
  group?: Maybe<Group>;
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
  currentEngagements?: Maybe<Array<Maybe<Engagement>>>;
  /** If offset or limit is not provided, both values are ignored */
  engagement?: Maybe<Array<Maybe<Engagement>>>;
  timeFrames?: Maybe<Array<Maybe<TimeFrame>>>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['Date']>;
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
  start: Scalars['Date'];
  end?: Maybe<Scalars['Date']>;
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
   */
  distributedActiveBikeParte: Scalars['Boolean'];
  engagement?: Maybe<Array<Maybe<Engagement>>>;
  workshops?: Maybe<Array<Maybe<Workshop>>>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['Date']>;
};

export type ParticipantCreateInput = {
  /** if not set, CURRENT_DATE will be used */
  start?: Maybe<Scalars['Date']>;
  end?: Maybe<Scalars['Date']>;
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
  /** if not set, CURRENT_DATE will be used */
  start?: Maybe<Scalars['Date']>;
  end?: Maybe<Scalars['Date']>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
};

export type EngagementCreateInput = {
  engagementTypeId: Scalars['ID'];
  dateRange?: Maybe<DateRangeInput>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
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
  documents: Array<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['Date']>;
};

export type BikeEventCreateInput = {
  bikeEventTypeId: Scalars['ID'];
  cargoBikeId: Scalars['ID'];
  responsibleId?: Maybe<Scalars['ID']>;
  relatedId?: Maybe<Scalars['ID']>;
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  /** Path to documents */
  documents?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  documents?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
};

export type BikeEventTypeUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
};

/** (dt. Anbieter) */
export type ProviderCreateInput = {
  formName: Scalars['String'];
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
  lockedUntil?: Maybe<Scalars['Date']>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
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
  otherData?: Maybe<Scalars['String']>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['Date']>;
};

export type OrganisationCreateInput = {
  address: AddressCreateInput;
  name: Scalars['String'];
  /** registration number of association */
  associationNo: Scalars['String'];
  /** If Club, at what court registered */
  registeredAt?: Maybe<Scalars['String']>;
  contactInformationId?: Maybe<Scalars['ID']>;
  otherData?: Maybe<Scalars['String']>;
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
  otherData?: Maybe<Scalars['String']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

/** (dt. Standort) */
export type LendingStation = {
  __typename?: 'LendingStation';
  id: Scalars['ID'];
  name: Scalars['String'];
  contactInformationIntern?: Maybe<ContactInformation>;
  contactInformationExtern?: Maybe<ContactInformation>;
  address: Address;
  timeFrames: Array<TimeFrame>;
  loanPeriod?: Maybe<LoanPeriod>;
  cargoBikes?: Maybe<Array<CargoBike>>;
  /** Total amount of cargoBikes currently assigned to the lending station */
  numCargoBikes: Scalars['Int'];
  organisation?: Maybe<Organisation>;
  isLocked: Scalars['Boolean'];
  isLockedByMe: Scalars['Boolean'];
  /** null if not locked by other user */
  lockedBy?: Maybe<Scalars['ID']>;
  lockedUntil?: Maybe<Scalars['Date']>;
};

/** If you want to create LendingStation with cargoBikes, use createTimeFrame and set to: Date = null */
export type LendingStationCreateInput = {
  name: Scalars['String'];
  contactInformationInternId?: Maybe<Scalars['ID']>;
  contactInformationExternId?: Maybe<Scalars['ID']>;
  address: AddressCreateInput;
  loanPeriod?: Maybe<LoanPeriodInput>;
  organisationId?: Maybe<Scalars['ID']>;
};

/** If you want to create LendingStation with cargoBikes, use createTimeFrame and set to: Date = null */
export type LendingStationUpdateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  contactInformationInternId?: Maybe<Scalars['ID']>;
  contactInformationExternId?: Maybe<Scalars['ID']>;
  address?: Maybe<AddressUpdateInput>;
  loanPeriod?: Maybe<LoanPeriodInput>;
  organisationId?: Maybe<Scalars['ID']>;
  keepLock?: Maybe<Scalars['Boolean']>;
};

/** (dt. Ausleihzeiten) not implemented */
export type LoanPeriod = {
  __typename?: 'LoanPeriod';
  generalRemark?: Maybe<Scalars['String']>;
  /** notes for each day of the week, starting on Monday */
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**
   * Loan times from and until for each day of the week.
   * Starting with Monday from, Monday to, Tuesday from, ..., Sunday to
   */
  loanTimes?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** (dt. Ausleihzeiten) */
export type LoanPeriodInput = {
  generalRemark?: Maybe<Scalars['String']>;
  /** notes for each day of the week, starting on Monday */
  notes?: Maybe<Array<Scalars['String']>>;
  /**
   * Loan times from and until for each day of the week.
   * Starting with Monday from, Monday to, Tuesday from, ..., Sunday to
   */
  loanTimes?: Maybe<Array<Scalars['String']>>;
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
  lockedUntil?: Maybe<Scalars['Date']>;
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
  bikeEventTypeByd?: Maybe<BikeEventType>;
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


export type QueryBikeEventTypeBydArgs = {
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
  unlockParticipant?: Maybe<Scalars['Boolean']>;
  updateParticipant: Participant;
  deleteParticipant: Scalars['Boolean'];
  createWorkshopType: WorkshopType;
  lockWorkshopType: WorkshopType;
  unlockWorkshopType: Scalars['Boolean'];
  updateWorkshopType: WorkshopType;
  deleteWorkshopType: Scalars['Boolean'];
  createWorkshop: Workshop;
  lockWorkshop: Workshop;
  unlockWorkshop: Scalars['Boolean'];
  updateWorkshop: Workshop;
  deleteWorkshop: Scalars['Boolean'];
  /** create new contactInfo */
  createContactInformation: ContactInformation;
  lockContactInformation: ContactInformation;
  unlockContactInformation: Scalars['Boolean'];
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
  unlockEngagement: Scalars['Boolean'];
  updateEngagement: Engagement;
  deleteEngagement: Scalars['Boolean'];
  createEngagementType: EngagementType;
  lockEngagementType: EngagementType;
  unlockEngagementType: Scalars['Boolean'];
  updateEngagementType: EngagementType;
  deleteEngagementType: Scalars['Boolean'];
  createProvider: Provider;
  lockProvider: Provider;
  unlockProvider: Scalars['Boolean'];
  updateProvider: Provider;
  deleteProvider: Scalars['Boolean'];
  createOrganisation: Organisation;
  lockOrganisation: Organisation;
  unlockOrganisation: Scalars['Boolean'];
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
  name: Scalars['String'];
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


export type UnlockContactInformationMutation = { __typename?: 'Mutation', unlockContactInformation: boolean };

export type DeleteContactInformationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteContactInformationMutation = { __typename?: 'Mutation', deleteContactInformation: boolean };

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

export type AddressFieldsFragment = { __typename?: 'Address', street: string, number: string, zip: string };

export type CargoBikeFieldsForTableFragment = { __typename?: 'CargoBike', id: string, group?: Maybe<Group>, name: string, modelName?: Maybe<string>, numberOfChildren?: Maybe<number>, numberOfWheels?: Maybe<number>, forCargo?: Maybe<boolean>, forChildren?: Maybe<boolean>, stickerBikeNameState?: Maybe<StickerBikeNameState>, note?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, insuranceData?: Maybe<{ __typename?: 'InsuranceData', billing?: Maybe<string>, hasFixedRate?: Maybe<boolean>, name?: Maybe<string>, benefactor?: Maybe<string>, noPnP?: Maybe<string>, maintenanceResponsible?: Maybe<string>, maintenanceBenefactor?: Maybe<string>, maintenanceAgreement?: Maybe<string>, fixedRate?: Maybe<number>, projectAllowance?: Maybe<any>, notes?: Maybe<string> }>, dimensionsAndLoad?: Maybe<{ __typename?: 'DimensionsAndLoad', bikeLength?: Maybe<number>, bikeWeight?: Maybe<number>, bikeHeight?: Maybe<number>, bikeWidth?: Maybe<number>, hasCoverBox?: Maybe<boolean>, lockable?: Maybe<boolean>, maxWeightBox?: Maybe<number>, maxWeightLuggageRack?: Maybe<number>, maxWeightTotal?: Maybe<number>, boxHeightRange?: Maybe<{ __typename?: 'NumRange', max?: Maybe<number>, min?: Maybe<number> }>, boxLengthRange?: Maybe<{ __typename?: 'NumRange', min?: Maybe<number>, max?: Maybe<number> }>, boxWidthRange?: Maybe<{ __typename?: 'NumRange', min?: Maybe<number>, max?: Maybe<number> }> }>, security?: Maybe<{ __typename?: 'Security', frameNumber?: Maybe<string>, adfcCoding?: Maybe<string>, keyNumberAXAChain?: Maybe<string>, keyNumberFrameLock?: Maybe<string>, policeCoding?: Maybe<string> }>, technicalEquipment?: Maybe<{ __typename?: 'TechnicalEquipment', bicycleShift?: Maybe<string>, isEBike?: Maybe<boolean>, hasLightSystem?: Maybe<boolean>, specialFeatures?: Maybe<string> }>, taxes?: Maybe<{ __typename?: 'Taxes', costCenter?: Maybe<string>, organisationArea?: Maybe<OrganisationArea> }>, provider?: Maybe<(
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
    { __typename?: 'Participant', id: string }
    & ParticipantFieldsForBikePageFragment
  )> };

export type BikeEventTypeFieldsFragment = { __typename?: 'BikeEventType', id: string, name: string, isLocked: boolean, isLockedByMe: boolean, lockedUntil?: Maybe<any> };

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
    & ParticipantFieldsForBikePageFragment
  ) };

export type EngagementTypeFieldsFragment = { __typename?: 'EngagementType', id: string, name: string, description: string, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any> };

export type EquipmentFieldsForBikePageFragment = { __typename?: 'Equipment', id: string, serialNo: string, title: string, description?: Maybe<string> };

export type EquipmentFieldsForTableFragment = { __typename?: 'Equipment', id: string, serialNo: string, title: string, description?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, cargoBike?: Maybe<{ __typename?: 'CargoBike', id: string, name: string }> };

export type EquipmentTypeFieldsFragment = { __typename?: 'EquipmentType', id: string, name: string, description: string, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any> };

export type LendingStationFieldsForBikePageFragment = { __typename?: 'LendingStation', id: string, name: string, address: (
    { __typename?: 'Address' }
    & AddressFieldsFragment
  ), organisation?: Maybe<(
    { __typename?: 'Organisation' }
    & OrganisationFieldsGeneralFragment
  )> };

export type LendingStationFieldsForTableFragment = { __typename?: 'LendingStation', id: string, name: string, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, contactInformationIntern?: Maybe<(
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
  )> }
  & LendingStationFieldsForTableFragment
);

export type OrganisationFieldsGeneralFragment = { __typename?: 'Organisation', id: string, name: string, address?: Maybe<(
    { __typename?: 'Address' }
    & AddressFieldsFragment
  )> };

export type ParticipantFieldsForBikePageFragment = { __typename?: 'Participant', id: string, start: any, end?: Maybe<any>, usernamefLotte?: Maybe<string>, usernameSlack?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, contactInformation: (
    { __typename?: 'ContactInformation' }
    & ContactInformationFieldsGeneralFragment
  ) };

export type PersonFieldsGeneralFragment = { __typename?: 'Person', id: string, name: string, firstName: string };

export type ProviderFieldsGeneralFragment = { __typename?: 'Provider', id: string, formName?: Maybe<string>, privatePerson?: Maybe<{ __typename?: 'ContactInformation', id: string, person: { __typename?: 'Person', id: string, name: string, firstName: string, contactInformation?: Maybe<Array<{ __typename?: 'ContactInformation', email?: Maybe<string> }>> } }> };

export type TimeFrameFieldsForBikePageFragment = { __typename?: 'TimeFrame', id: string, note?: Maybe<string>, dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, lendingStation: (
    { __typename?: 'LendingStation' }
    & LendingStationFieldsForBikePageFragment
  ) };

export type TimeFrameFieldsForLendingStationFragment = { __typename?: 'TimeFrame', id: string, note?: Maybe<string>, dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, cargoBike: { __typename?: 'CargoBike', id: string, name: string } };

export type TimeFrameFieldsFragment = { __typename?: 'TimeFrame', id: string, note?: Maybe<string>, isLocked: boolean, isLockedByMe: boolean, lockedBy?: Maybe<string>, lockedUntil?: Maybe<any>, dateRange: { __typename?: 'DateRange', from: any, to?: Maybe<any> }, lendingStation: { __typename?: 'LendingStation', id: string, name: string }, cargoBike: { __typename?: 'CargoBike', id: string, name: string } };

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

export const ProviderFieldsGeneralFragmentDoc = gql`
    fragment ProviderFieldsGeneral on Provider {
  id
  formName
  privatePerson {
    id
    person {
      id
      name
      firstName
      contactInformation {
        email
      }
    }
  }
}
    `;
export const AddressFieldsFragmentDoc = gql`
    fragment AddressFields on Address {
  street
  number
  zip
}
    `;
export const OrganisationFieldsGeneralFragmentDoc = gql`
    fragment OrganisationFieldsGeneral on Organisation {
  id
  name
  address {
    ...AddressFields
  }
}
    ${AddressFieldsFragmentDoc}`;
export const LendingStationFieldsForBikePageFragmentDoc = gql`
    fragment LendingStationFieldsForBikePage on LendingStation {
  id
  name
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
    notes
  }
  taxes {
    costCenter
    organisationArea
  }
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
  lockedUntil
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
export const ParticipantFieldsForBikePageFragmentDoc = gql`
    fragment ParticipantFieldsForBikePage on Participant {
  id
  start
  end
  usernamefLotte
  usernameSlack
  contactInformation {
    ...ContactInformationFieldsGeneral
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${ContactInformationFieldsGeneralFragmentDoc}`;
export const BikeEventFieldsForBikePageFragmentDoc = gql`
    fragment BikeEventFieldsForBikePage on BikeEvent {
  id
  bikeEventType {
    ...BikeEventTypeFields
  }
  responsible {
    ...ParticipantFieldsForBikePage
    id
  }
  date
  responsible {
    id
  }
}
    ${BikeEventTypeFieldsFragmentDoc}
${ParticipantFieldsForBikePageFragmentDoc}`;
export const EquipmentFieldsForBikePageFragmentDoc = gql`
    fragment EquipmentFieldsForBikePage on Equipment {
  id
  serialNo
  title
  description
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
    ...ParticipantFieldsForBikePage
  }
  isLocked
  isLockedByMe
  lockedBy
  lockedUntil
}
    ${EngagementTypeFieldsFragmentDoc}
${ParticipantFieldsForBikePageFragmentDoc}`;
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
export const ContactInformationFieldsFragmentDoc = gql`
    fragment ContactInformationFields on ContactInformation {
  ...ContactInformationFieldsGeneral
  isLocked
  isLockedByMe
  isLockedByMe
  lockedUntil
}
    ${ContactInformationFieldsGeneralFragmentDoc}`;
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
}
    ${LendingStationFieldsForTableFragmentDoc}
${TimeFrameFieldsForLendingStationFragmentDoc}`;
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
  unlockContactInformation(id: $id)
}
    `;

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