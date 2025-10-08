import FormInputField from "../../../Components/form_input_field";
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { ModuleSchemaType } from "../../actions/AddModule/Validations";
import FormTextarea from "../../../Components/form_textarea";
import SelectCourse from "./select_course";
import ModuleVideo from "./module_video";

type ErrorProps = {
    register: UseFormRegister<ModuleSchemaType>
    errors: FieldErrors<ModuleSchemaType>
}

export default function ModuleFormFields({ register, errors }: ErrorProps) {
    return (
        <div className='space-y-6 w-full'>
            {/* Course */}
            <SelectCourse />
            {/* Title */}
            <div className="space-y-2">
                <h6 className='text-[13.5px] font-medium'>Title <span className='text-red-500'>*</span></h6>
                <FormInputField
                    placeholder='Module Title'
                    register={register('module_title')}
                    error={errors.module_title?.message} />
            </div>
            {/* Video */}
            <ModuleVideo />
            {/* Description */}
            <div className="space-y-2">
                <h6 className='text-[13.5px] font-medium'>Description</h6>
                <FormTextarea
                    placeholder='Module Description'
                    register={register('module_descripton')} />
            </div>
        </div>
    )
}