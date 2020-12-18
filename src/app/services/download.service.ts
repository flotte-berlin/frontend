import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const JSON_TYPE = 'data:text/json;charset=UTF-8';
const CSV_TYPE = 'text/csv;charset=utf-8';

const EXCEL_EXTENSION = '.xlsx';
const JSON_EXTENSION = '.json';
const CSV_EXTENSION = '.csv';

@Injectable({ providedIn: 'root' })
export class DownloadService {
  csvChar: string = ';';

  public saveTableDataAsCSV(tableData: any, columnInfo: any, fileName: string) {
    const csvData = [];
    const header = columnInfo
      .map((column) => column.translation)
      .join(this.csvChar);
    csvData.push(header);
    for (const row of tableData) {
      const newRow = columnInfo.map((column) => {
        let cellData = row[column.dataPath];
        if (Array.isArray(cellData)) {
          cellData = cellData.join('", "');
        } else if (column.type === 'NumRange') {
          cellData =
            (row[column.dataPath + '.min'] || '') +
            ' bis ' +
            (row[column.dataPath + '.max'] || '');
        } else if (column.type === 'DateRange') {
          cellData =
            (row[column.dataPath + '.from'] || '') +
            ' bis ' +
            (row[column.dataPath + '.to'] || '');
        }
        return '"' + (cellData ?? '').toString().replace(/"/g, "''") + '"';
      });
      csvData.push(newRow.join(this.csvChar));
    }
    const BOM = '\uFEFF';
    const csv = BOM + csvData.join('\r\n');
    const blob = new Blob([csv], { type: CSV_TYPE });
    FileSaver.saveAs(
      blob,
      fileName + '_export_' + new Date().toLocaleString() + CSV_EXTENSION
    );
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  public exportJSONFile(json: any, fileName: string) {
    const data: Blob = new Blob([JSON.stringify(json, null, 2)], {
      type: JSON_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + JSON_EXTENSION
    );
  }
}
