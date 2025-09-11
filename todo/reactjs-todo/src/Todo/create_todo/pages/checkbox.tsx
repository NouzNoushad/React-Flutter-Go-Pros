import React from 'react'
import { useCreateTodoStore } from '../../../Store/CreateTodoStore'
import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function FormCheckbox() {
    const { isComplete, setIsComplete } = useCreateTodoStore()
    return (
        <div className="flex flex-row items-center gap-3">
            <Checkbox
                checked={isComplete}
                onChange={setIsComplete}
                className="group size-4 rounded-[5px] bg-white/10 flex items-center justify-center ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-[checked]:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
            >
                <CheckIcon className="hidden size-3 text-black group-data-[checked]:block" />
            </Checkbox>
            <p className='text-sm font-normal'>Completed</p>
        </div>
    )
}
