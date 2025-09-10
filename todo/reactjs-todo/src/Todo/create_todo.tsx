import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function CreateTodo() {
    const [enabled, setEnabled] = useState(false)
    return (
        <div className="bg-primaryColor rounded-xl px-6 py-5">
            <h1 className='text-center'>Create Todo</h1>
            <form action="" className='mt-8 space-y-2'>
                <input type="text" className='w-full text-sm px-3 py-3 border border-white rounded-lg bg-primaryColor focus:outline-none focus:ring-0' placeholder='Title' />
                <textarea rows={6} name="" id="" className='w-full text-sm px-3 py-3 border border-white rounded-lg bg-primaryColor focus:outline-none focus:ring-0' placeholder='Description'></textarea>
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
                    <button className='border border-white text-sm bg-backgroundColor rounded-xl px-2 py-2 min-w-[150px]'>Save</button>
                </div>
            </form>
        </div>
    )
}
