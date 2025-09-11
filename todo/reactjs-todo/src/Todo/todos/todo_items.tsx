import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TodoAction } from './actions/TodoAction';
import TodoItem from './pages/todo';
import { formatDate, formatTime } from '../../Lib/Helpers';
import CustomDialog from '../../Components/dailog_box';
import { useTodoStore } from '../../Store/TodoStore';

export default function TodoItems() {
    const { todoData, todoError, isTodoLoading, handleDeleteTodo } = TodoAction()
    const { isOpenDeleteTodo, setIsOpenDeleteTodo, selectedTodoId } = useTodoStore()

    if (isTodoLoading) {
        <div className="text-center py-10">
            <span className='text-gray-500 text-sm'>Loading...</span>
        </div>
    }
    if (todoError) {
        <div className="text-center py-10">
            <p>Failed to load todos</p>
        </div>
    }
    if (!todoData || todoData.todos.length <= 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p>{"Todos not found"}</p>
            </div>
        )
    }
    return (
        <>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
                {
                    todoData.todos.map((todo) =>
                        <div key={todo.id} className='flex flex-col bg-primaryColor rounded-lg text-white'>
                            <div className="bg-secondaryColor rounded-tl-lg rounded-tr-lg px-3 py-2">
                                <div className="flex flex-row items-center justify-between">
                                    <h4 className='text-xs'>{formatDate(todo.created_at)}</h4>
                                    <div className="flex flex-row items-center gap-2">
                                        <PencilIcon className='size-4 text-white' />
                                        <button type='button' onClick={() => setIsOpenDeleteTodo(true, todo.id)}>
                                            <TrashIcon className='size-4 text-white cursor-pointer' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 px-3 py-2 space-y-2 flex flex-col">
                                <TodoItem todo={todo} />
                                <h4 className='flex-shrink-0 text-[10px] text-end'>{formatTime(todo.created_at)}</h4>
                            </div>

                        </div>)
                }
            </div>
            {/* Delete Dialog */}
            <CustomDialog
                isOpen={isOpenDeleteTodo}
                onClose={() => {
                    setIsOpenDeleteTodo(false)
                }}
                onConfirm={() => {
                    if (selectedTodoId) {
                        handleDeleteTodo(selectedTodoId)
                    }
                    setIsOpenDeleteTodo(false)
                }}
                title="Delete Todo"
                description="Are you sure you want to delete your todo? This action cannot be undone."
            />
        </>
    )
}
