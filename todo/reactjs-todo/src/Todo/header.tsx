import React from 'react'
import { AddIcon } from '../Components/icons'

export default function Header() {
    return (
        <header className='bg-primaryColor'>
            <div className="w-full container-lg lg:py-4 py-3">
                <div className="flex flex-row items-center justify-between">
                    <a href="#todo">
                        <h1 className='md:text-xl text-lg text-whiteColor font-bold uppercase'>Todo</h1>
                    </a>
                    <div className="h-8 w-8 border border-whiteColor rounded-lg lg:hidden flex items-center justify-center">
                        <AddIcon className='size-6 text-white' />
                    </div>
                </div>
            </div>
        </header>
    )
}
