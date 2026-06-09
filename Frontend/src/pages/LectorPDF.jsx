import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useSearchParams } from 'react-router-dom'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

export default function LectorPDF() {
  const [searchParams] = useSearchParams()
  const url = searchParams.get('url')
  const titulo = searchParams.get('titulo') || 'Documento'
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  if (!url) return <p style={{ padding: '2rem' }}>No se especificó un archivo.</p>

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <h2 style={{ color: 'white', marginBottom: '1rem', textAlign: 'center' }}>{titulo}</h2>

      <Document
        file={url}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page pageNumber={pageNumber} width={Math.min(window.innerWidth - 48, 900)} />
      </Document>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => setPageNumber(p => Math.max(p - 1, 1))}
          disabled={pageNumber <= 1}
          style={{ background: '#8b00ff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ← Anterior
        </button>

        <span style={{ color: 'white' }}>Página {pageNumber} de {numPages ?? '...'}</span>

        <button
          onClick={() => setPageNumber(p => Math.min(p + 1, numPages))}
          disabled={pageNumber >= numPages}
          style={{ background: '#8b00ff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Siguiente →
        </button>

        <a href={url} download
          style={{ background: '#c8a900', color: 'black', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          ⬇ Descargar
        </a>
      </div>
    </div>
  )
}