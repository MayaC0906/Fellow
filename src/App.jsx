import React from 'react'
import { Routes, Route } from 'react-router'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { Workspace } from './pages/Workspace'
import { BoardDetails } from './pages/BoardDetails'
import { LoginSignup } from './pages/LoginSignup'

export function App() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/workspace" element={<Workspace />} />
                    <Route path="/board" element={<BoardDetails />} />
                    <Route path="/login" element={<LoginSignup />} />
                    <Route path='/board/:boardId' element={<BoardDetails/>} />
                </Routes>
            </main>
        </div>
    )
}


