import { Injectable } from '@angular/core';
import jsonSchema from 'src/generated/graphql.schema.json';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  /** expects startingObject and variablePath and returns its type e.g. cargoBike, security.name -> returns the type of the name variable */
  getPropertyTypeFromSchema(
    startingObjectName: string,
    variable: string
  ): string {
    const variablePath = variable.split('.');
    const types = jsonSchema.__schema.types;
    const startingObject = types.find(
      (type) => type.name === startingObjectName
    );
    const field = startingObject.fields.find(
      (field) => field.name === variablePath[0]
    );
    const type = field.type.name || field.type.ofType.name;
    if (variablePath.length === 1) {
      if (
        field.type.kind === 'ENUM' ||
        (field.type.kind === 'NON_NULL' && field.type.ofType.kind === 'ENUM')
      ) {
        return (
          'Enum//' +
          this.getEnumValuesFromSchema(
            field.type.name || field.type.ofType.name
          ).join('//')
        );
      }
      return type;
    } else {
      return this.getPropertyTypeFromSchema(
        type,
        variablePath.slice(1).join('.')
      );
    }
  }

  getEnumValuesFromSchema(typeName: string): string[] {
    const types = jsonSchema.__schema.types;
    const type = types.find((type) => type.name === typeName);
    return type.enumValues.map((value) => value.name);
  }

  /** expects startingObject and variablePath and returns TypeInformation like isPartOfType, type, isRequired  e.g. cargoBike, security.name -> returns {isPartOfType: true, type: "string", isRequired: false} */
  getTypeInformation(
    startingObjectName: string,
    variable: string
  ): { isPartOfType: boolean; type: string; isRequired: boolean } {
    const variablePath = variable.split('.');
    const types = jsonSchema.__schema.types;
    const startingObject = types.find(
      (type) => type.name === startingObjectName
    );
    if (!startingObject) {
      return { isPartOfType: false, type: '', isRequired: false };
    }
    const fields = startingObject.fields || startingObject.inputFields;
    if (!fields) {
      return { isPartOfType: false, type: '', isRequired: false };
    }
    const field = fields.find((field) => field.name === variablePath[0]);
    if (!field) {
      return { isPartOfType: false, type: '', isRequired: false };
    }
    const type = field.type.name || field.type.ofType.name;
    if (variablePath.length === 1) {
      const isRequired = field.type.kind === 'NON_NULL';
      if (
        field.type.kind === 'ENUM' ||
        (isRequired && field.type.ofType.kind === 'ENUM')
      ) {
        return {
          isPartOfType: true,
          type:
            'Enum//' +
            this.getEnumValuesFromSchema(
              field.type.name || field.type.ofType.name
            ).join('//'),
          isRequired: isRequired,
        };
      } else
        return {
          isPartOfType: true,
          type: type,
          isRequired: isRequired,
        };
    } else {
      return this.getTypeInformation(type, variablePath.slice(1).join('.'));
    }
  }

  filterObject(graphQLTypeName: string, object: object): any {
    const filteredObject = {};
    for (const prop in object) {
      if (typeof object[prop] === 'object' && object[prop] !== null) {
        const info = this.getTypeInformation(graphQLTypeName, prop);
        if (info.isPartOfType) {
          filteredObject[prop] = this.filterObject(info.type, object[prop]);
        }
      } else {
        const info = this.getTypeInformation(graphQLTypeName, prop);
        if (info.isPartOfType) {
          filteredObject[prop] = object[prop];
        }
      }
    }
    return filteredObject;
  }
}
