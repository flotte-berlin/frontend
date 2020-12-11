import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-row',
  templateUrl: './filter-row.component.html',
  styleUrls: ['./filter-row.component.scss']
})
export class FilterRowComponent {

  @Input()
  column: any;

  @Input()
  filter: any;

  @Output() filtersChange = new EventEmitter<any>();

  newFilterValue() {
    this.filtersChange.emit(this.filter);
  }

}
