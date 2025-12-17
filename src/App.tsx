import { Routes, Route } from 'react-router-dom'
import GSOCPresentation from './GSOCPresentation'
import SlideEditor from './SlideEditor'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GSOCPresentation />} />

        {import.meta.env.DEV && (
          <Route path="/dev-editor" element={<SlideEditor />} />
        )}
      </Routes>

      <Analytics />
    </>
  )
}

export default App
