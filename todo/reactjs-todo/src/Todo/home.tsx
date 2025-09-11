import React from 'react'
import TodoItems from './todos/todo_items';
import CreateTodo from './create_todo/create_todo';

export default function Home() {
    return (
        <section>
            <div className="container-lg py-[2rem]">
                <div className='grid grid-cols-12 gap-2 h-full'>
                    <div className="lg:col-span-8 col-span-12 w-full h-full">
                        <TodoItems />
                    </div>
                    <div className="lg:col-span-4 hidden lg:block text-white px-5 w-full h-full">
                        <CreateTodo />
                    </div>
                </div>
            </div>
        </section>
    )
}
