import z from "zod";

//  module validation
export const ModuleFormValidation = z.object({
    module_title: z.string()
        .nonempty("Module title is required")
        .min(2, { message: "Title must be at least 2 characters long" })
        .trim(),
    module_descripton: z.string().nullable(),
})

export type ModuleSchemaType = z.infer<typeof ModuleFormValidation>