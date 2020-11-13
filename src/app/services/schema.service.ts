import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
      if (field.type.kind === 'ENUM') {
        return (
          'Enum//' + this.getEnumValuesFromSchema(field.type.name).join('//')
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
}
