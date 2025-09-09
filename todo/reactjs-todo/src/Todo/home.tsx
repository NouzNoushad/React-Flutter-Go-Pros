import React from 'react'
import TodoItems from './todo_items';

export default function Home() {
    return (
        <section>
            <div className="container-lg py-[2rem]">
                <div className='grid grid-cols-12 gap-2 h-full'>
                    <div className="lg:col-span-8 col-span-12 w-full h-full">
                        <TodoItems />
                    </div>
                    <div className="lg:col-span-4 bg-blue-300 w-full h-full"></div>
                </div>
            </div>
        </section>
    )
}
