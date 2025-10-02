import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './Admin/page'
import './App.css'
import VideosTrialPage from './Website/page'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/admin' element={<AdminPage />} />
                    <Route path='/' element={<VideosTrialPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
