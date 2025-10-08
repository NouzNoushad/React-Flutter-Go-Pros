import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import ModuleButtons from "./module_buttons";
import ModuleFormFields from "./module_form_fields";
import { ModuleFormValidation, type ModuleSchemaType } from "../../actions/AddModule/Validations";

export default function AddModuleForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ModuleSchemaType>({
        resolver: zodResolver(ModuleFormValidation)
    })

    const onSubmit = (data: ModuleSchemaType) => {
        console.log(data)
    }

    return (
        <div className="flex-1 mt-6 md:min-w-[800px] mx-auto min-w-full gap-6">
            <div className="col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5 space-y-5'>
                    <div className="lg:min-h-[330px] px-8 py-9 w-full bg-white rounded-md ring-1 ring-gray-300 space-y-5 shadow-md flex items-center">
                        <ModuleFormFields register={register} errors={errors} />
                    </div>
                    {/* Buttons */}
                    <ModuleButtons />
                </form>
            </div>
        </div>
    )
}