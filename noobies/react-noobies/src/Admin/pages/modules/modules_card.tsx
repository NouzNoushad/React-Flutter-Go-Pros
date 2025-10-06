import MainModulesHeader from "./modules_header";
import MainModulesTable from "./modules_table";

export default function MainModulesCard() {

    return (
        <div className="px-8 py-9 w-full rounded-md ring-1 ring-gray-300 space-y-5 shadow-md relative">
            {/* Main Modules Header */}
            <MainModulesHeader />
            {/* Main Modules Table */}
            <div className="w-full overflow-x-auto overflow-y-hidden">
                <MainModulesTable />
            </div>
            {/* Page & Pagination */}
            {/* <PagePagination /> */}
        </div>
    )
}
