import { Component, Input, Output, EventEmitter } from '@angular/core';
import { catchError } from 'rxjs/operators';

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
  @Input()
  enumValues: string[] = [];

  change(newValue) {
    this.value = this.inputType === 'number' ? +newValue : newValue;
    this.valueChange.emit(this.value);
  }
}
