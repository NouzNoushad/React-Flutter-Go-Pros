import { useNavigate } from "react-router-dom"

export default function CourseButtons() {

    const router = useNavigate()

    const handleCancel = () => {
        router(-1)
    }

    return (
        <div className="pt-2 flex items-center justify-end space-x-4">
            <button type='button' onClick={handleCancel} className='px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors bg-gray-100 border border-gray-300 shadow-md hover:bg-white cursor-pointer'>Cancel</button>
            <button type='submit' className='px-5 py-3 rounded-md text-sm font-medium focus:outline-none foucs:ring-0 transition-colors bg-gray-100 border border-gray-300 shadow-md hover:bg-white cursor-pointer'>{
                'Save Changes'
            }</button>
        </div>
    )
}
