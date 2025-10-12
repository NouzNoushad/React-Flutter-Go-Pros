import FormInputField from "../../../Components/form_input_field";
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import FormTextarea from "../../../Components/form_textarea";
import type { CourseSchemaType } from "../actions/Validations";

type ErrorProps = {
    register: UseFormRegister<CourseSchemaType>
    errors: FieldErrors<CourseSchemaType>
}

export default function CourseFormFields({ register, errors }: ErrorProps) {
    return (
        <div className='space-y-6 w-full'>
            {/* Title */}
            <div className="space-y-2">
                <h6 className='text-[13.5px] font-medium'>Title <span className='text-red-500'>*</span></h6>
                <FormInputField
                    placeholder='Title'
                    register={register('title')}
                    error={errors.title?.message} />
            </div>
            {/* Description */}
            <div className="space-y-2">
                <h6 className='text-[13.5px] font-medium'>Description</h6>
                <FormTextarea
                    placeholder='Description'
                    register={register('description')} />
            </div>
        </div>
    )
}