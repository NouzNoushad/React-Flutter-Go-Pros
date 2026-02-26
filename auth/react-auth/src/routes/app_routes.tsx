import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginIndex from "../website/features/auth/login/pages/login_index";


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={<LoginIndex />} />
            </Routes>
        </BrowserRouter >
    )
}
