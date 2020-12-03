import {async, TestBed} from "@angular/core/testing";
import {CellComponent} from "../cell/cell.component";
import {DatePipe} from "@angular/common";
import {DateRangeCellComponent} from "./date-range-cell.component";

describe('DateRangeCellComponent', () => {
  let fixture, daterangecell;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateRangeCellComponent],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(DateRangeCellComponent);
    daterangecell = fixture.componentInstance;
  });

  it('should set from date value', async(() => {
    let event = {
      value: '2020-11-23'
    };
    daterangecell.startDateChange(event);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(daterangecell.from).toBe('2020-11-23');
    });
  }));

  it('should set to date value', async(() => {
    let event = {
      value: '2020-11-23'
    };
    daterangecell.endDateChange(event);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(daterangecell.to).toBe('2020-11-23');
    });
  }));

  it('should transform 23-Nov-2020 to 2020-11.23', async(() => {

    expect(daterangecell.transformDate('23-Nov-2020')).toBe('2020-11-23');
  }));

  it('should return 2020-11-23 as 23.11.2020 ', async(() => {
    expect(daterangecell.toLocaleDate('2020-11-23')).toBe('23.11.2020');
  }));


});
