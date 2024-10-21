import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FileInput, FileLabel, DropArea, Button } from '../styles/ButtonStyles';
import { ProgressBar } from '../styles/ProgressBarStyles';  
import DataPreview from './DataPreview';


const FileUploader = ({ onFileUpload, loading }) => {
  const [file, setFile] = useState(null);
  const [dataPreview, setDataPreview] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    parseFile(uploadedFile);
  };

  const parseFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setDataPreview(jsonData.slice(0, 5));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFileUpload(file);
    setProgress(100);  // This can be dynamically updated based on the upload status
  };

  return (
    <form onSubmit={handleSubmit}>
      <DropArea>
        <FileInput type="file" id="fileInput" onChange={handleFileChange} accept=".xlsx,.csv" />
        <FileLabel htmlFor="fileInput">Drag & Drop or Select File</FileLabel>
        {file && <p>Selected file: {file.name}</p>}
      </DropArea>
      {dataPreview && <DataPreview dataPreview={dataPreview} />}
      {loading && <ProgressBar progress={progress} />}
      <Button type="submit" disabled={!file || loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </Button>
    </form>
  );
};

export default FileUploader;
