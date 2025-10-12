import type { Module } from "../../../Lib/APINetwork/APIResponse";
import { ModulesSearchAction } from "../actions/ModulesSearchAction";

export default function MainModulesSearch({ modules }: { modules: Module[] }) {
    const { setSearchQuery } = ModulesSearchAction(modules)
    return (
        <span className='flex-1'>
            <input type="text" placeholder='Search by module title' className='w-full text-sm p-1 bg-transparent focus:outline-none focus:ring-0 placeholder:text-gray-400' onChange={(e) => setSearchQuery(e.target.value)} />
        </span>
    )
}
