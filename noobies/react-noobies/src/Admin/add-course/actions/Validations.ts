import z from "zod";

//  course validation
export const CourseFormValidation = z.object({
    title: z.string()
        .nonempty("Title is required")
        .min(2, { message: "Title must be at least 2 characters long" })
        .trim(),
    description: z.string().nullable(),
})

export type CourseSchemaType = z.infer<typeof CourseFormValidation>