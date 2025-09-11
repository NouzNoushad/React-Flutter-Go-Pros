import React, { useRef } from 'react'
import FormTitle from './pages/title'
import FormDescription from './pages/description'
import FormCheckbox from './pages/checkbox'
import FormButton from './pages/button'
import { CreateTodoAction } from '../actions/CreateTodoAction'

export default function CreateTodo() {

    const formRef = useRef<HTMLFormElement>(null)
    const { handleFormSubmit } = CreateTodoAction()

    return (
        <div className="bg-primaryColor rounded-xl px-6 py-5">
            <h1 className='text-center'>Create Todo</h1>
            <form onSubmit={(e) => {
                handleFormSubmit(e)
                formRef.current?.reset()
            }} action="" ref={formRef} className='mt-8 space-y-2'>
                <FormTitle />
                <FormDescription />
                <FormCheckbox />
                <FormButton />
            </form>
        </div>
    )
}
