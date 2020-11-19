import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent {
  @Input()
  value: number | string | boolean;
  @Output() valueChange = new EventEmitter<number | string | boolean>();
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
  required: boolean = false;
  @Input()
  link: string = null;
  @Output() validityChange = new EventEmitter<boolean>();
  isValid: boolean = true;

  enumValues = [];

  htmlInputType: string = 'string';

  @ViewChild('input') input: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
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

  getHtmlInputType(type: string) {
    if (type.split('//')[0] === 'Enum') {
      this.enumValues = type.split('//').slice(1);
      this.htmlInputType = 'enum';
    } else if (type === 'Int' || type === 'Float') {
      this.htmlInputType = 'number';
    } else if (type === 'ID' || type === 'String') {
      this.htmlInputType = 'text';
    } else if (type === 'Boolean') {
      this.htmlInputType = 'boolean';
    }
  }

  change(newValue) {
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

  checkIfValid() {
    if (this.required && this.inputType !== 'Boolean') {
      this.isValid = this.input?.control?.valid || false;
      this.validityChange.emit(this.isValid);
    }
  }
}
