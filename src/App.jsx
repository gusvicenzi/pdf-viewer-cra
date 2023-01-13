import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.parcel2'
import './App.css'
import { useQuery } from 'react-query'
import { login } from './services/login'
import { getPDF } from './services/getPDF'

function App() {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  const { data: token } = useQuery(
    ['login'],
    () =>
      login(
        process.env.REACT_APP_WSPDFBASE64_USERNAME,
        process.env.REACT_APP_WSPDFBASE64_PASSWORD
      ),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      keepPreviousData: true
    }
  )

  const { data: pdf } = useQuery(
    ['pdf', token],
    async () => {
      if (token) {
        const { retorno } = await getPDF(token)
        return retorno
      }
    },
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      keepPreviousData: true
    }
  )

  function showPDF() {
    return (
      <>
        <Document
          // file='sample.pdf'
          file={`data:application/pdf;base64,${pdf}`}
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            height={800}
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
      </>
    )
  }

  return <div className='App'>{showPDF()}</div>
}

export default App
