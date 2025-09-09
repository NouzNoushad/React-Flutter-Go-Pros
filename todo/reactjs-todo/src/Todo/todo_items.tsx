import React from 'react'
import { todos } from '../Utils/lists'
import Todo from './todo'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function TodoItems() {
    return (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
            {
                todos.map((todoGroup) =>
                    <div key={todoGroup.id} className='bg-primaryColor rounded-lg text-white'>
                        <div className="bg-secondaryColor rounded-tl-lg rounded-tr-lg px-3 py-2">
                            <div className="flex flex-row items-center justify-between">
                                <h4 className='text-xs'>{todoGroup.date}</h4>
                                <div className="flex flex-row items-center gap-2">
                                    <PencilIcon className='size-4 text-white' />
                                    <TrashIcon className='size-4 text-white'/>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-2 space-y-2">
                            {
                                todoGroup.todos.map((todo) => <Todo todo={todo} />
                                )
                            }
                        </div>

                    </div>)
            }
        </div>
    )
}
