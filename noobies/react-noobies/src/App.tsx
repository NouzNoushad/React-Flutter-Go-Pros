import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './Admin/page'
import ModulesHome from './Admin/pages/modules/modules_home'
import AddModuleHome from './Admin/pages/add-module/add_module_home'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/modules" element={<ModulesHome />} />
                    <Route path="/admin/add-module" element={<AddModuleHome />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
