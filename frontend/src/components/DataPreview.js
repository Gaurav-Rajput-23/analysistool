import React from 'react';
import { Table, Th, Td, Tr } from '../styles/TableStyles';

const DataPreview = ({ dataPreview }) => (
  <Table>
    <thead>
      <tr>
        {dataPreview[0].map((header, index) => (
          <Th key={index}>{header}</Th>
        ))}
      </tr>
    </thead>
    <tbody>
      {dataPreview.slice(1).map((row, rowIndex) => (
        <Tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Td key={cellIndex}>{cell}</Td>
          ))}
        </Tr>
      ))}
    </tbody>
  </Table>
);

export default DataPreview;
