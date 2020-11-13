import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  schema: BehaviorSubject<any> = new BehaviorSubject({});

  nextSchema(schema: any) {
    this.schema.next(schema);
  }

  /** expects startingObject and variablePath and returns its type e.g. cargoBike, security.name -> returns the type of the name variable */
  getPropertyTypeFromSchema(
    startingObjectName: String,
    variable: String
  ): String {
    const variablePath = variable.split('.');
    const types = this.schema.value.types;
    const startingObject = types.find(
      (type) => type.name === startingObjectName
    );
    const field = startingObject.fields.find(
      (field) => field.name === variablePath[0]
    );
    const type = field.type.name || field.type.ofType.name;
    if (variablePath.length === 1) {
      if ((field.type.kind === "ENUM")) {
        return "Enum//" + this.getEnumValuesFromSchema(field.type.name).join("//");
      }
      return type;
    } else {
      return this.getPropertyTypeFromSchema(type, variablePath.slice(1).join('.'));
    }
  }


  getEnumValuesFromSchema(typeName: String): String[] {
    const types= this.schema.value.types;
    const type = types.find(type => type.name === typeName);
    return type.enumValues.map((value) => value.name);
  }
}
