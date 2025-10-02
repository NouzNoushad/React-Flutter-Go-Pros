import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from './Admin/page'
import './App.css'
import VideosTrialPage from './Website/page'
import VideoMain from './Website/pages/video_main'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/admin' element={<AdminPage />} />
                    <Route path='/' element={<VideosTrialPage />} />
                    <Route path='/video-item' element={<VideoMain />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
