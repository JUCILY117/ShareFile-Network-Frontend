import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source path
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export const getPdfThumbnail = async (pdfUrl) => {
  try {
    // Ensure the PDF URL is accessible (Cloudinary URL)
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1); // Get the first page of the PDF

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

    return canvas.toDataURL(); // Return thumbnail as a DataURL
  } catch (error) {
    console.error('Error generating PDF thumbnail:', error);
    return null;
  }
};
