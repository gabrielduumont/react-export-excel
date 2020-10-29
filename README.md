# @gabrielduumont/react-export-excel

React component that will export an array of objects into XLSX

## Install

```bash
npm install --save @gabrielduumont/react-export-excel
```
or

```bash
yarn add @gabrielduumont/react-export-excel
```

## Usage

```jsx
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
      data={data}
      fileName="Excel Report Name"
      sheetName='Results'
    />
  );
}

export default App;

```
## Props

| Prop | Required | Description | values |
| --- | --- | --- | --- |
| data | no | no | no |


    data = [],
    fileName = null,
    sheetName = null,
    disabled = false,
    children = null,
    label = 'Export',
    className = '',
    minCellWidth = null,
# @gabrielduumont/react-export-excel

React component that will export an array of objects into XLSX

## Install

```bash
npm install --save @gabrielduumont/react-export-excel
```
or

```bash
yarn add @gabrielduumont/react-export-excel
```

## Usage

```jsx
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
      data={data}
      fileName="Excel Report Name"
      sheetName='Results'
    />
  );
}

export default App;

```
## Props

No props are required, but if you don't provide at least the 'data' props, nothing will happen.

| Prop | Required | Type | Default |
| --- | --- | --- | --- |
| data | no | array of objects | [] |
| children | no | React Component | null |
| fileName | no | string | 'Download' |
| sheetName | no | string | 'Sheet 1' |
| disabled | no | bool | false |
| label | no | string | 'Export' (if there is data to export) / 'No data to export.' (otherwise) |
| className | no | string | '' |
| minCellWidth | no | number | 20 |
