import React from 'react'
import { AddIcon } from '../Components/icons'
import CustomDialog from '../Components/dailog_box'
import FormTitle from './create_todo/pages/title'
import FormDescription from './create_todo/pages/description'
import FormButton from './create_todo/pages/button'
import { useTodoStore } from '../Store/TodoStore'
import { CreateTodoAction } from './actions/CreateTodoAction'
import FormCheckbox from './create_todo/pages/checkbox'

export default function Header() {
    const { isOpenCreateTodo, setIsOpenCreateTodo } = useTodoStore()
    const { handleFormSubmit } = CreateTodoAction()
    return (
        <>
            <header className='bg-primaryColor'>
                <div className="w-full container-lg lg:py-4 py-3">
                    <div className="flex flex-row items-center justify-between">
                        <a href="#todo">
                            <h1 className='md:text-xl text-lg text-whiteColor font-bold uppercase'>Todo</h1>
                        </a>
                        <button onClick={() => setIsOpenCreateTodo(true)} className="h-8 w-8 border border-whiteColor rounded-lg lg:hidden flex items-center justify-center">
                            <AddIcon className='size-6 text-white' />
                        </button>
                    </div>
                </div>
            </header>
            {/* Create Dialog */}
            <CustomDialog
                isOpen={isOpenCreateTodo}
                onClose={() => {
                    setIsOpenCreateTodo(false)
                }}
                onConfirm={undefined}
                title="Create Todo"
                description=""
            >
                <form action="" onSubmit={(e) => {
                    handleFormSubmit(e)
                    setIsOpenCreateTodo(false)
                }} className='mt-8 space-y-2'>
                    <FormTitle />
                    <FormDescription />
                    <FormCheckbox />
                    <FormButton />
                </form>
            </CustomDialog>
        </>
    )
}
