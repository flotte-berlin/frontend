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
  selector: 'app-date-range-cell',
  templateUrl: './date-range-cell.component.html',
  styleUrls: ['./date-range-cell.component.scss'],
})
export class DateRangeCellComponent implements OnInit {
  @Input()
  from: string;

  @Input()
  to: string;

  @Output() fromChange = new EventEmitter<string>();
  @Output() toChange = new EventEmitter<string>();

  @Input()
  editable = false;

  @Input()
  required = false;
  @Input()
  label: string = null;
  @Output() validityChange = new EventEmitter<boolean>();
  isValid = true;

  dateRangeGroup: FormGroup;

  constructor(private cdr: ChangeDetectorRef, public datepipe: DatePipe) {}

  ngOnInit() {
    this.dateRangeGroup = new FormGroup({
      from: new FormControl(),
      to: new FormControl(),
    });
    this.dateRangeGroup.controls['from'].markAsTouched();
    this.dateRangeGroup.controls['to'].markAsTouched();

    if (this.editable) {
    setTimeout(()=>this.checkIfDateRangeIsValid());
    }
  }

  startDateChange(event): void {
    this.from = this.transformDate(event.value);
    this.fromChange.emit(this.from);
    this.checkIfDateRangeIsValid();
  }

  endDateChange(event) {
    this.to = this.transformDate(event.value);
    this.toChange.emit(this.to);
    this.checkIfDateRangeIsValid();
  }

  checkIfDateRangeIsValid() {
    if (this.required && this.from == null) {
      this.setRangeError(true);
      return;
    }
    if (this.to == null || this.from == null) {
      this.setRangeError(false);
      return;
    }
    const isValid = new Date(this.to) >= new Date(this.from);
    this.setRangeError(!isValid);
  }

  setRangeError(error: boolean): void {
    console.log("error", error)
    this.validityChange.emit(!error);
    if (error) {
      this.dateRangeGroup.controls['from'].setErrors({ rangeError: true });
      this.dateRangeGroup.controls['to'].setErrors({ rangeError: true });
    } else {
      this.dateRangeGroup.controls['from'].setErrors(null);
      this.dateRangeGroup.controls['to'].setErrors(null);
    }
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
}
