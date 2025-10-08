import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import CourseButtons from "./course_buttons";
import { CourseFormValidation, type CourseSchemaType } from "../../actions/AddCourse/Validations";
import CourseFormFields from "./course_form_fields";
import { AddCourseAction } from "../../actions/AddCourse/AddCourseAction";

export default function AddCourseForm() {
    const { handleFormSubmit } = AddCourseAction()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CourseSchemaType>({
        resolver: zodResolver(CourseFormValidation)
    })

    const onSubmit = (data: CourseSchemaType) => {
        handleFormSubmit(data)
        console.log(data)
    }

    return (
        <div className="flex-1 mt-6 md:min-w-[800px] mx-auto min-w-full gap-6">
            <div className="col-span-2">
                <form onSubmit={handleSubmit(onSubmit)} className='mb-5 space-y-5'>
                    <div className="lg:min-h-[330px] px-8 py-9 w-full bg-white rounded-md ring-1 ring-gray-300 space-y-5 shadow-md flex items-center">
                        <CourseFormFields register={register} errors={errors} />
                    </div>
                    {/* Buttons */}
                    <CourseButtons />
                </form>
            </div>
        </div>
    )
}