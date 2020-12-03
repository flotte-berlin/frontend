import {async, TestBed} from '@angular/core/testing';
import {CellComponent} from './cell.component';
import {DatePipe} from '@angular/common';

describe('CellComponent', () => {
  let fixture, cell;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CellComponent],
      providers: [DatePipe]
    });

    fixture = TestBed.createComponent(CellComponent);
    cell = fixture.componentInstance;
  });

  it('should accept value true', async(() => {
    cell._value = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._value).toBe(true);
    });
  }));


  it('should set value true', async(() => {
    cell.value = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._value).toBe(true);
    });
  }));

  it('should return value false', async(() => {
    cell._value = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell.value).toBe(false);
    });
  }));

  it('should accept editable true', async(() => {
    cell._editable = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._editable).toBe(true);
    });
  }));

  it('should set editable false', async(() => {
    cell.editable = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._editable).toBe(false);
    });
  }));

  it('should return editable false', async(() => {
    cell._editable = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell.editable).toBe(false);
    });
  }));


  it('should accept input type String', async(() => {
    cell._inputType = 'String';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._inputType).toBe('String');
    });
  }));

  it('should set input type String', async(() => {
    cell.inputType = 'String';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._inputType).toBe('String');
    });
  }));

  it('should return input type String', async(() => {
    cell._inputType = 'String';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell.inputType).toBe('String');
    });
  }));


  it('should accept required true', async(() => {
    cell._required = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._required).toBe(true);
    });
  }));

  it('should set required false', async(() => {
    cell.required = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell._required).toBe(false);
    });
  }));

  it('should return required true', async(() => {
    cell._required = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(cell.required).toBe(true);
    });
  }));

  it('should return html input type text', async(() => {
      cell.getHtmlInputType('String');
      expect(cell.htmlInputType).toBe('text');
  }));

  it('should return html input type enum', async(() => {
    cell.getHtmlInputType('Enum');
    expect(cell.htmlInputType).toBe('enum');
  }));

  it('should return html input type number', async(() => {
    cell.getHtmlInputType('Int');
    expect(cell.htmlInputType).toBe('number');
  }));

  it('should return html input type boolean', async(() => {
    cell.getHtmlInputType('Boolean');
    expect(cell.htmlInputType).toBe('boolean');
  }));

});
