import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.parcel2'
import './App.css'
import { pdfB64 } from './assets/arq'

function App() {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div className='App'>
      <Document
        file='sample.pdf'
        // file={`data:application/pdf;base64,${pdfB64}`}
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      {pageNumber > 1 && (
        <button onClick={() => setPageNumber(prev => prev - 1)}>
          Previous page
        </button>
      )}
      {pageNumber < numPages && (
        <button onClick={() => setPageNumber(prev => prev + 1)}>
          Next page
        </button>
      )}
    </div>
  )
}

export default App

