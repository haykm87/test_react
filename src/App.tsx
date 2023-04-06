import { FC, useEffect } from 'react'
import {Home  } from 'pages'
import { Routes, Route, Navigate } from 'react-router-dom'

const App: FC = () => {
  useEffect(() => {
    sessionStorage.setItem(
        'userId',
        (Date.now() + Math.floor(performance.now())).toString(),
    )
  })

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
      </Routes>
  )
}

export default App
