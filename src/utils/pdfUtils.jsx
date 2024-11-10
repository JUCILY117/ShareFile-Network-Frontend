import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source path
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export const getPdfThumbnail = async (pdfUrl) => {
  try {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    const viewport = page.getViewport({ scale: 0.3 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    await page.render(renderContext).promise;

    return canvas.toDataURL();
  } catch (error) {
    console.error('Error generating PDF thumbnail:', error);
    return null;
  }
};
