import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-number-range-cell',
  templateUrl: './number-range-cell.component.html',
  styleUrls: ['./number-range-cell.component.scss'],
})
export class NumberRangeCellComponent implements OnInit {
  @Input()
  set min(value: number) {
    this._min = value;
    this.rangeForm?.controls['minValue'].setValue(value);
  }
  get min() {
    return this._min;
  }
  _min: number;

  @Input()
  set max(value: number) {
    this._max = value;
    this.rangeForm?.controls['maxValue'].setValue(value);
  }
  get max() {
    return this._max;
  }
  _max: number;

  rangeForm: FormGroup;

  @Input()
  placeholderMin = '';
  @Input()
  placeholderMax = '';

  @Output() minChange = new EventEmitter<number>();
  @Output() maxChange = new EventEmitter<number>();

  @Input()
  set editable(value) {
    this._editable = value;
    if (value) {
      this.rangeForm?.controls['minValue'].enable();
      this.rangeForm?.controls['maxValue'].enable();
    } else {
      this.rangeForm?.controls['minValue'].disable();
      this.rangeForm?.controls['maxValue'].disable();
    }
  }
  _editable = false;
  get editable() {
    return this._editable;
  }
  @Input()
  required = false;
  @Input()
  label: string = null;
  @Output() validityChange = new EventEmitter<boolean>();
  isValid = true;

  constructor(private cdr: ChangeDetectorRef, public datepipe: DatePipe) {}

  ngOnInit() {
    this.rangeForm = new FormGroup({
      minValue: new FormControl(),
      maxValue: new FormControl(),
    });
    if (!this.editable) {
      this.rangeForm?.controls['minValue'].disable();
      this.rangeForm?.controls['maxValue'].disable();
    }
    this.rangeForm.controls['minValue'].markAsTouched();
    this.rangeForm.controls['maxValue'].markAsTouched();
    this.rangeForm?.controls['minValue'].setValue(this.min);
    this.rangeForm?.controls['maxValue'].setValue(this.max);
  }

  minValueChange(event) {
    this.min = this.toPositiveNumber(event.target.value);
    this.minChange.emit(this.min);
    this.checkIfRangeIsValid();
  }

  maxValueChange(event) {
    this.max = this.toPositiveNumber(event.target.value);
    this.maxChange.emit(this.max);
    this.checkIfRangeIsValid();
  }

  checkIfRangeIsValid() {
    if (this.min == null || this.max == null) {
      this.setRangeError(false);
      return;
    }
    if (this.min <= this.max) {
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

  toPositiveNumber(str: string): number {
    if (str === '') {
      return null;
    }
    const number = +str;
    if (number < 0) {
      return Math.abs(number);
    }
    return number;
  }
}
