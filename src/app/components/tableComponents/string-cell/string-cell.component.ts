import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-string-cell',
  templateUrl: './string-cell.component.html',
  styleUrls: ['./string-cell.component.scss'],
})
export class StringCellComponent {
  @Input()
  value: number | string;
  @Output() valueChange = new EventEmitter<number | string>();
  @Input()
  editable = false;
  @Input()
  inputType = 'text';

  change(newValue) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
