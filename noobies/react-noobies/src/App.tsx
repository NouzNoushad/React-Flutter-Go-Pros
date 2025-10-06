import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './Admin/page'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
