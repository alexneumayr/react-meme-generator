import React from 'react';

export const DownloadImage = ({ url, fileName }) => {
  // Function to download files with the browser (based on an online code snippet)
  const handleDownload = () => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const tempUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = tempUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error fetching the file:', error);
      });
  };

  // Shows "Download" button which triggers handleDownload
  return <button onClick={handleDownload}>Download</button>;
};
