import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';

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
  }
  get value(): any {
    return this._value;
  }
  _value: number | string | boolean;

  @Output() valueChange = new EventEmitter<number | string | boolean>();
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

  transformDate(date) {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  checkIfValid() {
    setTimeout(() => {
      if (this.editable && this.required && this.inputType !== 'Boolean') {
        this.isValid = this.input?.control?.valid || false;
        this.validityChange.emit(this.isValid);
      }
    });
  }
}
