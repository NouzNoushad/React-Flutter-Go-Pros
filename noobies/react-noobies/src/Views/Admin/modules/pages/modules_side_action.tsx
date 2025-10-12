import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import type { Module } from '../../../../Lib/APINetwork/APIResponse'
import { useModulesStore } from '../../../../Store/Admin/ModuleStore'
import { ModuleAction } from '../actions/ModuleAction'
import CustomDialog from '../../../../Components/dialog_box'

export default function MainModulesSideAction({ module }: { module: Module }) {
    const { handleDeleteModule } = ModuleAction()
    const { isOpenDeleteModule, setIsOpenDeleteModule } = useModulesStore()

    const handleOpenDeleteDialog = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpenDeleteModule(true)
    }

    const handleCancelDeleteDialog = () => {
        setIsOpenDeleteModule(false)
    }

    return (
        <div className="">
            <Menu>
                <MenuButton className="inline-flex items-center gap-2 font-normal shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white justify-between space-x-2 px-2 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none text-start focus:ring-0 text-[13px] cursor-pointer">
                    Actions
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>

                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom"
                    className="w-30 origin-top-right rounded-md p-1 border border-gray-500 bg-white text-[13px]  transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                >
                    <MenuItem>
                        <button className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-start transition-colors hover:bg-primary-mid-light hover:text-primary-color w-full focus:outline-none focus:ring-0 cursor-pointer">
                            Edit
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <div className="">
                            <button onClick={handleOpenDeleteDialog} className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-start transition-colors hover:bg-primary-mid-light hover:text-primary-color w-full focus:outline-none focus:ring-0 cursor-pointer">
                                Delete
                            </button>
                            <CustomDialog
                                isOpen={isOpenDeleteModule}
                                onClose={handleCancelDeleteDialog}
                                onConfirm={() => handleDeleteModule(module.id)}
                                title="Delete module"
                                description="Are you sure you want to delete module? This action cannot be undone."
                            />
                        </div>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    )
}
