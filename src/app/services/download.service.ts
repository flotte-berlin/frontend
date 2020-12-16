import { Injectable } from "@angular/core";
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const JSON_TYPE = 'data:text/json;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';
const JSON_EXTENSION = '.json';


@Injectable({ providedIn: "root" })
export class DownloadService {
  csvChar: string = ";";


  /*public exportAsExcelFile(json: any[], excelFileName: string, sheetName: string): void {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
    const workbook: XLSX.WorkBook = { Sheets: { [sheetName] : worksheet }, SheetNames: [sheetName] };  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }*/ 
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});   
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

  public exportJSONFile(json: any, fileName: string){
    const data: Blob = new Blob([JSON.stringify(json, null, 2)], {type: JSON_TYPE});   
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + JSON_EXTENSION);
  }
}
