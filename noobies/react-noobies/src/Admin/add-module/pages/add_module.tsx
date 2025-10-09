import AddModuleForm from "./module_form";

export default function AddModule() {
    return (
        <main className='lg:px-8 lg:py-5 px-4 py-4 flex flex-col'>
            <div className="flex-shrink-0">
                <h1 className='text-lg font-semibold'>Module</h1>
                <p className='text-gray-400 text-xs font-medium'>Home - Module - Add</p>
            </div>
            <AddModuleForm />
        </main>
    )
}