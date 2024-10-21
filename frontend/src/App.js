import React, { useState } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import { AppContainer, Content } from './styles/AppStyles';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars

  const handleFileUpload = async (file) => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <Header />
      <Content>
        <FileUploader onFileUpload={handleFileUpload} />
        {pdfUrl && (
          <p>
            <a href={pdfUrl} download="report.pdf">
              Download PDF Report
            </a>
          </p>
        )}
      </Content>
    </AppContainer>
  );
};

export default App;
