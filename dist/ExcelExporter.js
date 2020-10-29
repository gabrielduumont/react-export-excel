import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

const arrayDistinctEvaluator = (value, index, self) => self.indexOf(value) === index;

const arrayFlatten = arrayOfArrays => [].concat.apply([], [...arrayOfArrays]);

const getHeaders = (worksheetData = []) => [...arrayFlatten([...worksheetData].map(item => Object.keys(item)))].filter(arrayDistinctEvaluator);

const getFile = ({
  file,
  worksheetData,
  sheet
}) => {
  const wb = {
    Sheets: {
      [sheet]: worksheetData
    },
    SheetNames: [sheet]
  };
  const excelBuffer = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array'
  });
  const data = new Blob([excelBuffer], {
    type: fileType
  });
  FileSaver.saveAs(data, file + fileExtension);
};

const parseXLSXStyle = ({
  worksheetData = {},
  originalDataArray = [],
  minCellWidth = null
}) => {
  const ws = { ...worksheetData
  };
  const minimalCellWidth = minCellWidth ? minCellWidth : 20;
  ws['!cols'] = [];
  ws['!rows'] = [];

  for (let i = 0; i < (Object.keys(worksheetData).length - 1) / originalDataArray.length; ++i) {
    ws['!cols'].push({
      /* visibility */
      //hidden: false, // if true, the column is hidden

      /* column width is specified in one of the following ways: */
      //wpx?: number,  // width in screen pixels
      //width?: number,  // width in Excel's "Max Digit Width", width*256 is integral
      //wch?: number,  // width in characters
      wch: minimalCellWidth
      /* other fields for preserving features from files */
      //MDW?: number,  // Excel's "Max Digit Width" unit, always integral

    });
  } //for (let i = 0; i < originalDataArray.length + 1; ++i) {
  //     ws['!rows'].push({
  //         /* visibility */
  //         //hidden?: boolean, // if true, the row is hidden
  //         /* row height is specified in one of the following ways: */
  //         //hpx?: number,  // height in screen pixels
  //         //hpt?: number,  // height in points
  //         //level?: number,  // 0-indexed outline / group level
  //     });
  //}


  return ws;
};

const exportToXLSX = ({
  jsonData = [],
  fileName = null,
  sheetName = null,
  minCellWidth = null
}) => {
  const sheet = sheetName ? sheetName : 'Sheet 1';
  const file = fileName ? fileName : 'Download';
  const headers = getHeaders(jsonData);
  const ws = XLSX.utils.json_to_sheet(jsonData, {
    header: headers
  });
  const worksheetData = parseXLSXStyle({
    originalDataArray: jsonData,
    worksheetData: ws,
    minCellWidth
  });
  getFile({
    file,
    sheet,
    worksheetData
  });
};

const renderChildrenOrDefault = (children, className, label = null, disabled = false, action = null) => {
  const onClickAction = action ? action : () => {};

  if (!children) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClickAction,
      className: className,
      disabled: disabled
    }, label ? label : 'No data to export.');
  }

  return /*#__PURE__*/React.createElement("span", {
    onClick: onClickAction,
    className: className
  }, children);
};

function ExcelExporter({
  data = [],
  fileName = null,
  sheetName = null,
  disabled = false,
  children = null,
  label = 'Export',
  className = '',
  minCellWidth = null
}) {
  const handleExport = event => {
    if (!disabled) {
      exportToXLSX({
        data,
        fileName,
        sheetName,
        minCellWidth
      });
    }
  };

  if (!data || data.length === 0) {
    return renderChildrenOrDefault(children, className, null, true);
  }

  return renderChildrenOrDefault(children, className, label, disabled, handleExport);
}

export default ExcelExporter;