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
  styleUrls: ['./date-range-cell.component.scss']
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

  constructor(private cdr: ChangeDetectorRef, public datepipe: DatePipe) {}

  ngOnInit() {
  }

  startDateChange(event): void {
    this.from = this.transformDate(event.value);
    this.fromChange.emit(this.from);
  }

  endDateChange(event) {
    this.to = this.transformDate(event.value);
    this.toChange.emit(this.to);
  }

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  toLocaleDate(date: string): string {
    if (date == "") {
      return "";
    }
    return new Date(date).toLocaleDateString();
  }

}
