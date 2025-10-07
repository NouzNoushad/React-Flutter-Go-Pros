import { ModulesAction } from "../../actions/Modules/ModulesAction";
import MainModulesHeader from "./modules_header";
import MainModulesTable from "./modules_table";

export default function MainModulesCard() {
    const { modulesData, modulesError, isModulesLoading } = ModulesAction()

    if (isModulesLoading) {
        return (
            <div className="text-center py-10">
                <span className='text-gray-500 text-sm'>Loading...</span>
            </div>
        )
    }
    if (modulesError) {
        return (
            <div className="text-center py-10">
                <p>Failed to load modules</p>
            </div>
        )
    }

    const modules = Array.isArray(modulesData?.modules) ? modulesData.modules : []
    if (modules.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>Modules not found</p>
            </div>
        )
    }

    return (
        <div className="px-8 py-9 w-full rounded-md ring-1 ring-gray-300 space-y-5 shadow-md relative">
            {/* Main Modules Header */}
            <MainModulesHeader modules={modules} />
            {/* Main Modules Table */}
            <div className="w-full overflow-x-auto overflow-y-hidden">
                <MainModulesTable />
            </div>
            {/* Page & Pagination */}
            {/* <PagePagination /> */}
        </div>
    )
}
