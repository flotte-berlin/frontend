import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  ngOnChanges() {
    if (this.inputType.split('//')[0] === 'Enum') {
      this.enumValues = this.inputType.split('//').slice(1);
    } else if (this.inputType === 'Int' || this.inputType === 'Float') {
      this.inputType = 'number';
    } else if (this.inputType === 'ID' || this.inputType === 'String') {
      this.inputType = 'text';
    }
  }

  change(newValue) {
    this.value = this.inputType === 'number' ? +newValue : newValue;
    this.valueChange.emit(this.value);
  }
}
