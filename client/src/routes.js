import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {FilesPage} from './pages/FilesPage'
import {CreatePage} from './pages/CreatePage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/files" element={<FilesPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route
        path="*"
        element={<Navigate to="/create" replace />}
        />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
    </Routes>
  )
}