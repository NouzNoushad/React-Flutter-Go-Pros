import React from 'react'

export default function FormTitle({ defaultValue }: { defaultValue?: string }) {
    return (
        <input type="text" name='title' defaultValue={defaultValue} className='w-full text-sm px-3 py-3 border border-white rounded-lg bg-primaryColor focus:outline-none focus:ring-0' placeholder='Title' />
    )
}
