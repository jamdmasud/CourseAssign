import { Injectable } from '@angular/core';
import * as alasql from 'alasql';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class JsonToXlsxService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const style = this.getExcelStyle();

    alasql('SELECT semester, course, teacher, totalCredit, assignedCredit INTO XLS("CourseReport.xls",?) FROM ?', [style, json]);
    }

  public getExcelStyle () {
    var excelStyle = {
      sheetid: 'Teacher Assigned Credit',
      headers: true,
      column: {
          style: 'font-size:15px'
      },
      columns: [
        { columnid: 'semester', title: 'Semester' },
        { columnid: 'course', title: 'Course Code with Course Title' },
        { columnid: 'teacher', title: 'Course Teacher' },
        { columnid: 'totalCredit', title: 'Total Credit' },
        { columnid: 'assignedCredit', title: 'Assigned Credit' }
      ]
    };

    return excelStyle;
  }
  }





