import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements AfterViewInit {
  @Input()
  set value(value: any) {
    this._value = value;
    setTimeout(() => {
      this.checkIfValid();
    });
  } // number | string | boolean | { start: string; end: string; };
  get value(): any {
    return this._value;
  }
  _value: any;

  rangeForm: FormGroup;
  minValue: number;
  maxValue: number;

  @Output() valueChange = new EventEmitter<
    number | string | boolean | { start: string; end: string }
  >();
  @Input()
  editable = false;
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
  required = false;
  @Input()
  link: string = null;
  @Input()
  label: string = null;
  @Output() validityChange = new EventEmitter<boolean>();
  isValid = true;

  enumValues = [];

  htmlInputType = 'string';

  @ViewChild('input') input: any;

  constructor(private cdr: ChangeDetectorRef, public datepipe: DatePipe) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    if (this.required) {
      this.input?.control?.markAsTouched();
      this.checkIfValid();
      this.cdr.detectChanges();

      if (
        this.value === undefined &&
        this.inputType === 'Boolean' &&
        this.editable
      ) {
        setTimeout(() => {
          this.change(false);
        }, 0);
      }
    }
  }

  getHtmlInputType(type: string): void {
    if (type.split('//')[0] === 'Enum') {
      this.enumValues = type.split('//').slice(1);
      this.htmlInputType = 'enum';
    } else if (type === 'Int' || type === 'Float') {
      this.htmlInputType = 'number';
    } else if (type === 'ID' || type === 'String') {
      this.htmlInputType = 'text';
    } else if (type === 'Boolean') {
      this.htmlInputType = 'boolean';
    } else if (type === 'Date') {
      this.htmlInputType = 'date';
    } else if (type === 'DateRange') {
      this.htmlInputType = 'dateRange';
    } else if (type === 'NumRange') {
      this.htmlInputType = 'numberRange';
      if (
        !this.value ||
        this.value.min === undefined ||
        this.value.max === undefined
      ) {
        this.value = { min: null, max: null };
      }
      this.rangeForm = new FormGroup({
        minValue: new FormControl(),
        maxValue: new FormControl(),
      });
      this.rangeForm.controls['minValue'].markAsTouched();
      this.rangeForm.controls['maxValue'].markAsTouched();
    }
  }

  change(newValue): void {
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

  startDateChange(event): void {
    console.log('start');
    console.log(event.value);
    console.log(this.transformDate(event.value));
    this.value.start = this.transformDate(event.value);
    this.valueChange.emit(this.value);
  }

  endDateChange(event) {
    console.log('end');
    console.log(event.value);
    console.log(this.transformDate(event.value));
    this.value.end = this.transformDate(event.value);
    this.valueChange.emit(this.value);
  }

  minValueChange(event) {
    this.value.min = Math.abs(this.toNumber(event.target.value));
    this.valueChange.emit(this.value);
    this.checkIfRangeIsValid();
  }

  maxValueChange(event) {
    this.value.max = Math.abs(this.toNumber(event.target.value));
    this.valueChange.emit(this.value);
    this.checkIfRangeIsValid();
  }

  checkIfRangeIsValid() {
    if (this.value.min === null || this.value.max === null) {
      this.setRangeError(false);
      return;
    }
    if (this.value.min <= this.value.max) {
      this.setRangeError(false);
      return;
    }
    this.setRangeError(true);
  }

  setRangeError(error: boolean): void {
    this.validityChange.emit(!error);
    if (error) {
      this.rangeForm.controls['minValue'].setErrors({ rangeError: true });
      this.rangeForm.controls['maxValue'].setErrors({ rangeError: true });
    } else {
      this.rangeForm.controls['minValue'].setErrors(null);
      this.rangeForm.controls['maxValue'].setErrors(null);
    }
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  checkIfValid() {
    if (this.required && this.inputType !== 'Boolean') {
      this.isValid = this.input?.control?.valid || false;
      this.validityChange.emit(this.isValid);
    }
  }

  toNumber(str: string): number {
    if (str === '') {
      return null;
    }
    return +str;
  }
}
