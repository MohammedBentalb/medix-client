import * as z from 'zod';


const loginSchema = z.object({
    email: z.email('Valid email is required'),
    password: z.string('Valid password is Required').min(8, 'Password minimum charaters has not been reached')
})

type TLoginData = z.infer<typeof loginSchema> 


export {type TLoginData, loginSchema}