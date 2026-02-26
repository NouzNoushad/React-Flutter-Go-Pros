import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginIndex from "../website/features/auth/login/pages/login_index";
import HomeIndex from "../website/features/modules/home/home_index";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<LoginIndex />} />
                <Route path='/' element={<HomeIndex />} />
            </Routes>
        </BrowserRouter >
    )
}
