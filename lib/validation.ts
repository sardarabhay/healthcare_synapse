import { z } from "zod"
export const UserFormValidation = z.object({
    name: z.string()
        .min(2, "Username must be at least 2 characters.")
        .max(30, "Username must be at most 30 characters."),
    email: z.string()
        .email("Invalid email address."),
    phone: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number."),

})
