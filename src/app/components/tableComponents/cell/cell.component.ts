import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
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
  @Input()
  inputType = 'text';

  enumValues = [];

  htmlInputType: string = 'string';

  ngOnChanges() {
    this.getHtmlInputType(this.inputType);
  }

  getHtmlInputType(type: string) {
    if (this.inputType.split('//')[0] === 'Enum') {
      this.enumValues = this.inputType.split('//').slice(1);
      this.htmlInputType = 'enum';
    } else if (this.inputType === 'Int' || this.inputType === 'Float') {
      this.htmlInputType = 'number';
    } else if (this.inputType === 'ID' || this.inputType === 'String') {
      this.htmlInputType = 'text';
    } else if (this.inputType === 'Boolean') {
      this.htmlInputType = 'boolean';
    }
  }

  change(newValue) {
    if (this.inputType === "Int") {
      newValue = newValue.toString().replace('.', '');
    }
    this.value = this.htmlInputType === 'number' ? +newValue : newValue;
    this.valueChange.emit(this.value);
  }
}
