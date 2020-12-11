import { Injectable } from '@angular/core';
import jsonSchema from 'src/generated/graphql.schema.json';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  getEnumValuesFromSchema(typeName: string): string[] {
    const types = jsonSchema.__schema.types;
    const type = types.find((type) => type.name === typeName);
    return type.enumValues.map((value) => value.name);
  }

  /** expects startingObject and variablePath and returns TypeInformation like isPartOfType, type, isRequired  e.g. cargoBike, security.name -> returns {isPartOfType: true, type: "string", isRequired: false} */
  getTypeInformation(
    startingObjectName: string,
    variable: string
  ): {
    isPartOfType: boolean;
    type: string;
    isRequired: boolean;
    isList: boolean;
  } {
    const variablePath = variable.split('.');
    const types = jsonSchema.__schema.types;
    const startingObject = types.find(
      (type) => type.name === startingObjectName
    );
    if (!startingObject) {
      //console.error("Did't found " + startingObjectName + " in ", startingObject);
      return {
        isPartOfType: false,
        type: '',
        isRequired: false,
        isList: false,
      };
    }
    const fields = startingObject.fields || startingObject.inputFields;
    if (!fields) {
      //console.error("Did't found fields in ", startingObject);

      return {
        isPartOfType: false,
        type: '',
        isRequired: false,
        isList: false,
      };
    }
    const field = fields.find((field) => field.name === variablePath[0]);
    if (!field) {
      //console.error("[" + startingObjectName + ", " + variable + "] " + "Did't found field in ", fields);

      return {
        isPartOfType: false,
        type: '',
        isRequired: false,
        isList: false,
      };
    }
    const type = this.getTypeNameFromTypeObject(field.type);
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
          isList: false,
        };
      } else
        return {
          isPartOfType: true,
          type: type,
          isRequired: isRequired,
          isList:
            field.type?.kind === 'LIST' || field.type?.ofType?.kind === 'LIST',
        };
    } else {
      return this.getTypeInformation(type, variablePath.slice(1).join('.'));
    }
  }

  private getTypeNameFromTypeObject(typeObject: any) {
    let object = typeObject;
    while (object.name == null && object.ofType != null) {
      object = object.ofType;
    }
    return object.name;
  }

  filterObject(graphQLTypeName: string, object: object): any {
    let filteredObject;
    if (Array.isArray(object)) {
      return object;
      //TODO: check if array consists of objects?
    } else filteredObject = new Object();

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
