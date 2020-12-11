import { DatePipe } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements AfterViewInit {
  @Input()
  set value(value: any) {
    if (this.inputType === 'Money') {
      value = value.toString().replace('$', '').replace('€', '');
    }
    this._value = value;
    setTimeout(() => {
      this.checkIfValid();
    });
  }
  get value(): any {
    return this._value;
  }
  _value: number | string | boolean | [];

  @Output() valueChange = new EventEmitter<number | string | boolean | []>();
  @Input()
  set editable(value: boolean) {
    this._editable = value;
    if (value) {
      this.input?.control?.markAsTouched();
      this.checkIfValid();
    }
  }
  get editable(): boolean {
    return this._editable;
  }
  _editable = false;
  _inputType = 'text';
  get inputType(): string {
    return this._inputType;
  }
  @Input()
  set inputType(type: string) {
    this._inputType = type;
    this.getHtmlInputType(type);
  }
  @Input()
  set required(value) {
    this._required = value;
    if (value) {
      this.input?.control?.markAsTouched();
      this.checkIfValid();
    }
  }
  get required(): boolean {
    return this._required;
  }
  _required = false;
  @Input()
  link: string = null;
  @Input()
  isList: boolean;
  @Input()
  label: string = null;
  @Output() validityChange = new EventEmitter<boolean>();
  isValid = true;

  enumValues = [];

  htmlInputType = 'string';

  @ViewChild('input') input: any;

  dateGroup: FormGroup;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private cdr: ChangeDetectorRef, public datepipe: DatePipe) {}

  ngOnInit() {
    if (this.htmlInputType === 'date') {
      this.dateGroup = new FormGroup({
        dateControl: new FormControl(),
      });
      this.dateGroup.controls['dateControl'].markAsTouched();
    }
  }

  ngAfterViewInit(): void {
    if (this.required) {
      this.input?.control?.markAsTouched();

      this.checkIfValid();
      this.cdr.detectChanges();

      if (this.inputType === 'Boolean' && this.editable) {
        setTimeout(() => {
          this.change(false);
        });
      }
    }
  }

  getHtmlInputType(type: string): void {
    if (type.split('//')[0] === 'Enum') {
      this.enumValues = type.split('//').slice(1);
      this.htmlInputType = 'enum';
    } else if (type === 'Int' || type === 'Float' || type === 'Money') {
      this.htmlInputType = 'number';
    } else if (type === 'ID' || type === 'String') {
      this.htmlInputType = 'text';
      if (this.isList) {
        this.htmlInputType = 'stringList';
      }
    } else if (type === 'Boolean') {
      this.htmlInputType = 'boolean';
    } else if (type === 'Date') {
      this.htmlInputType = 'date';
    } else if (type === 'DateRange') {
      this.htmlInputType = 'dateRange';
    } else if (type === 'Link') {
      this.htmlInputType = 'link';
      if (this.isList) {
        this.htmlInputType = 'linkList';
      }
    } else {
      console.error('Cell got invalid type: ' + type);
    }
  }

  change(newValue): void {
    if (this.inputType === 'Money') {
      newValue = newValue.toString().replace('$', '');
    }
    if (this.inputType === 'Int') {
      newValue = newValue.toString().replace('.', '');
    }
    this.value = this.htmlInputType === 'number' ? +newValue : newValue;
    if (newValue === '') {
      this.value = null;
    }
    this.valueChange.emit(this.value);
    this.checkIfValid();
  }

  addElementToList(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (this.value == null) {
      this.value = [];
    }
    // Add element
    if ((value || '').trim()) {
      this.value.push(value.trim());
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.valueChange.emit(this.value);
  }

  removeElementFromList(string: string): void {
    const index = this.value.indexOf(string);
    if (index >= 0) {
      this.value.splice(index, 1);
    }
    this.valueChange.emit(this.value);
  }

  checkIfValid() {
    setTimeout(() => {
      if (!this.value && this.isList) {
        this.value = [];
        this.valueChange.emit([]);
      } else if (this.htmlInputType === 'date') {
        if (this.editable && this.required) {
          const dateIsEmpty = !this.value;
          this.isValid = !dateIsEmpty;
          this.validityChange.emit(this.isValid);
          if (dateIsEmpty) {
            this.dateGroup.controls['dateControl'].setErrors({
              rangeError: true,
            });
          } else {
            this.dateGroup.controls['dateControl'].setErrors(null);
          }
        } else {
          this.validityChange.emit(this.isValid);
          this.dateGroup.controls['dateControl'].setErrors(null);
        }
      } else if (
        this.editable &&
        this.required &&
        this.inputType !== 'Boolean' &&
        !this.isList
      ) {
        this.isValid = this.input?.control?.valid || false;
        this.validityChange.emit(this.isValid);
      }
    });
  }

  dateChange(event) {
    this.value = this.transformDate(event.value);
    this.valueChange.emit(this.value);
    this.checkIfValid();
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  toLocaleDate(date: string): string {
    if (date == '') {
      return '';
    }
    return new Date(date).toLocaleDateString();
  }

  stringToDate(dateString: string): Date {
    if (!dateString) return null;
    return new Date(dateString) || null;
  }
}
