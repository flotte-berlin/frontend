import {async, TestBed} from '@angular/core/testing';
import {DatePipe} from '@angular/common';
import {NumberRangeCellComponent} from './number-range-cell.component';
import {FormControl, FormGroup} from '@angular/forms';

describe('NumberRangeCellComponent', () => {
  let fixture, cell;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberRangeCellComponent],
      providers: [DatePipe]
    });

    fixture = TestBed.createComponent(NumberRangeCellComponent);
    cell = fixture.componentInstance;
  });

  it('should set minimum value as 0', async(() => {
    cell.min = 0;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._min).toBe(0);
    });
  }));

  it('should return minimum value 0', async(() => {
    cell._min = 0;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell.min).toBe(0);
    });
  }));

  it('should set max value as 100', async(() => {
    cell.max = 100;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._max).toBe(100);
    });
  }));

  it('should return max value 100', async(() => {
    cell._max = 100;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell.max).toBe(100);
    });
  }));

  it('should set editable true', async(() => {
    cell.editable = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._editable).toBe(true);
    });
  }));

  it('should change min value, from event with value -5, to 5', async(() => {
    const targ = {
      value: -5
    };
    const event = {
      target: targ
    };
    let rangeForm = new FormGroup({
      minValue: new FormControl(),
      maxValue: new FormControl(),
    });
    cell.rangeForm = rangeForm;
    cell.minValueChange(event);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell.min).toBe(5);
    });
  }));


  it('should change max value, from event with value -100, to 100', async(() => {
    const targ = {
      value: -100
    };
    const event = {
      target: targ
    };
    let rangeForm = new FormGroup({
      minValue: new FormControl(),
      maxValue: new FormControl(),
    });
    cell.rangeForm = rangeForm;
    cell.maxValueChange(event);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell.max).toBe(100);
    });
  }));

  it('should set rangeError at check for invalid range of min 50 and max 10', async(() => {
    let rangeForm = new FormGroup({
      minValue: new FormControl(),
      maxValue: new FormControl(),
    });
    cell.rangeForm = rangeForm;
    cell.min = 50;
    cell.max = 10;
    cell.checkIfRangeIsValid();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(rangeForm.controls['minValue'].errors.rangeError).toBe(true);
      expect(rangeForm.controls['maxValue'].errors.rangeError).toBe(true);

    });
  }));

  it('should set rangeError for parameter true', async(() => {
    let rangeForm = new FormGroup({
      minValue: new FormControl(),
      maxValue: new FormControl(),
    });
    cell.rangeForm = rangeForm;
    cell.setRangeError(true);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(rangeForm.controls['minValue'].errors.rangeError).toBe(true);
      expect(rangeForm.controls['maxValue'].errors.rangeError).toBe(true);

    });
  }));

  it('should return 5 from string -5', async(() => {
    expect(cell.toPositiveNumber('-5')).toBe(5);
  }));

  it('should return null from string "" ', async(() => {
    expect(cell.toPositiveNumber('')).toBe(null);
  }));


});
