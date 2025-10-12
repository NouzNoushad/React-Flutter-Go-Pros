import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './Views/Admin/page'
import ModulesHome from './Views/Admin/modules/modules_home'
import AddModuleHome from './Views/Admin/add-module/add_module_home'
import AddCourseHome from './Views/Admin/add-course/add_course_home'
import HomePage from './Views/Main/home/home'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Admin */}
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/modules" element={<ModulesHome />} />
                    <Route path="/admin/add-module" element={<AddModuleHome />} />
                    <Route path="/admin/add-course" element={<AddCourseHome />} />
                    {/* Main */}
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
