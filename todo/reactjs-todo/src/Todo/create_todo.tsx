import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import { API_ENDPOINTS, getEndPoints } from '../Lib/APINetwork/EndPoints'
import { postData } from '../Lib/APINetwork/BaseClients'
import { APIResponse } from '../Lib/APINetwork/APIResponse'

export default function CreateTodo() {
    const [enabled, setEnabled] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const queryClient = useQueryClient()

    const createTodoMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const url = getEndPoints(API_ENDPOINTS.TODO)
            const data = await postData<APIResponse>(url, formData)
            return data
        },
        onSuccess: (result: APIResponse) => {
            console.log(`message: ${result.message}`)
            queryClient.invalidateQueries({ queryKey: ['todo'] })
            toast.success("Todo created")

            formRef.current?.reset()
            setEnabled(false)
        },
        onError: (error) => {
            console.log(`Failed: ${error.message}`)
            toast.error(`${error.message}`)
        }
    })

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        formData.append("is_complete", enabled.toString())

        if (!title.trim()) {
            toast.error("Title is required")
            return
        } else {
            console.log(`///////////// title: ${title}, des: ${description}, iscomplete: ${formData.get('is_complete')}`);

            createTodoMutation.mutate(formData)
        }
    }

    return (
        <div className="bg-primaryColor rounded-xl px-6 py-5">
            <h1 className='text-center'>Create Todo</h1>
            <form onSubmit={handleFormSubmit} action="" ref={formRef} className='mt-8 space-y-2'>
                <input type="text" name='title' className='w-full text-sm px-3 py-3 border border-white rounded-lg bg-primaryColor focus:outline-none focus:ring-0' placeholder='Title' />
                <textarea rows={6} name="description" id="" className='w-full text-sm px-3 py-3 border border-white rounded-lg bg-primaryColor focus:outline-none focus:ring-0' placeholder='Description'></textarea>
                <div className="flex flex-row items-center gap-3">
                    <Checkbox
                        checked={enabled}
                        onChange={setEnabled}
                        className="group size-4 rounded-[5px] bg-white/10 flex items-center justify-center ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-[checked]:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
                    >
                        <CheckIcon className="hidden size-3 text-black group-data-[checked]:block" />
                    </Checkbox>
                    <p className='text-sm font-normal'>Completed</p>
                </div>
                <div className="pt-5 flex items-center justify-center">
                    <button type='submit' className='border border-white text-sm bg-backgroundColor rounded-xl px-2 py-2 min-w-[150px]'>Save</button>
                </div>
            </form>
        </div>
    )
}
