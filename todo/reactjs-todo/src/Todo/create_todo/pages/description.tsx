import React from 'react'

export default function FormDescription({ defaultValue }: { defaultValue?: string }) {
  return (
      <textarea rows={6} name="description" id="" defaultValue={defaultValue} className='w-full text-sm px-3 py-3 border border-white rounded-lg bg-primaryColor focus:outline-none focus:ring-0' placeholder='Description'></textarea>
  )
}
