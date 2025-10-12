import MainFooter from "../footer";
import MainHeader from "../header";
import AddModule from "./pages/add_module";

export default function AddModuleHome() {
    return (
        <div className="w-full flex-1 h-full overflow-x-hidden overflow-y-auto min-h-screen flex flex-col">
            <MainHeader />
            <div className="flex-1">
                <AddModule />
            </div>
            <MainFooter />
        </div>
    )
}
