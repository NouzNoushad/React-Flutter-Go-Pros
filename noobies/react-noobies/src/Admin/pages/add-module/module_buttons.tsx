export default function ModuleButtons() {

    return (
        <div className="pt-2 flex items-center justify-end space-x-4">
            <button type='button' className='px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors bg-gray-100 border border-gray-300 shadow-md hover:bg-white cursor-pointer'>Cancel</button>
            <button type='submit' className='px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors bg-gray-100 border border-gray-300 shadow-md hover:bg-white cursor-pointer'>{
                'Save Changes'
            }</button>
        </div>
    )
}
