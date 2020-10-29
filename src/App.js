import React from 'react';
import { ExcelExporter } from './components';

function App() {
  const data = [
    {
      'Column Title 1': 'Value 1',
      'Column Title 2': 1,
    },
    {
      'Column Title 1': 'Value 2',
      'Column Title 2': 2,
    },
    {
      'Column Title 1': 'Value 3',
      'Column Title 2': 3,
      'Column Title 3': '25-12-2015',
    },
  ];
  return (
    <ExcelExporter
      jsonData={data}
      fileName="Excel Report Name"
      sheetName='Results'
    />
  );
}

export default App;
