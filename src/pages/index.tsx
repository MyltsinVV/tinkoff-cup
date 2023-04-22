import React, {lazy, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

const HomePage = lazy(() => import('./home'))

export const Routing = () => {
  return (
    <Suspense fallback='Loading...'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Suspense>
  )
}
