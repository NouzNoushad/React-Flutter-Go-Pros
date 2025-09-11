import React, { useState } from 'react'
import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { Todo } from '../../../Lib/APINetwork/APIResponse'

export default function TodoItem({ todo }: { todo: Todo }) {
    const [enabled, setEnabled] = useState(todo.is_complete)

    return (
        <div className='flex-1 flex flex-row items-start justify-between'>
            <div className="">
                <h1 className={`text-[13px] font-medium ${enabled ? 'line-through' : ''}`}>{todo.title}</h1>
                <h3 className={`text-xs text-[#BEBEBE] ${enabled ? 'line-through' : ''}`}>{todo.description}</h3>
            </div>
            <Checkbox
                checked={enabled}
                onChange={setEnabled}
                className="group size-4 rounded-[5px] bg-white/10 flex items-center justify-center ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-[checked]:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
            >
                <CheckIcon className="hidden size-3 text-black group-data-[checked]:block" />
            </Checkbox>
        </div>
    )
}
