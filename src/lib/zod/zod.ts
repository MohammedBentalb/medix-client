import * as z from 'zod';


const loginSchema = z.object({
    email: z.email('Valid email is required'),
    password: z.string('Valid password is Required').min(8, 'Password minimum charaters has not been reached')
})

type TLoginData = z.infer<typeof loginSchema> 


const doctorRegisterSchema = z.object({
    email: z.email('Valid Email Is Required'),
    password: z.string().min(8, 'Minimum Character has not been reached'),
    password_confirm: z.string().min(8, 'Minimum Character has not been reached'),
   
    firstName: z.string().min(2, 'First Name Is Required'),
    lastName: z.string().min(2, 'Last Name Is Required'),
    
    speciality: z.string().min(2, 'Speciality Is Required'),
    licenseNumber: z.string().min(1, 'License number is required'),
    yearsExperience: z.number().int().min(0, 'Years of experience is required'),

    consultationFee: z.number().min(0, 'Consultation fee is required'),
    bio: z.string().min(1, 'Bio is required'),
    nationalId: z.string().min(1, 'National ID is required'),
    phone: z.string().regex(/^\+?[0-9]+(?:[\s-][0-9]+)*$/, 'Invalid phone number'),

}).refine(data => data.password === data.password_confirm, {
    message: "Passwords Don't Match",
    path: ['password_confirm']
})

type TDoctorRegisterSchema = z.infer<typeof doctorRegisterSchema>


const assistantRegisterSchema = z.object({
    email: z.email('Valid email is required'),
    password: z.string().min(8, 'Minimum 8 characters required'),
    password_confirm: z.string().min(8, 'Minimum 8 characters required'),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    nationalId: z.string().min(1, 'National ID is required'),
    phone: z.string().regex(/^\+?[0-9]+(?:[\s-][0-9]+)*$/, 'Invalid phone number'),
}).refine(data => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ['password_confirm'],
})

type TAssistantRegisterSchema = z.infer<typeof assistantRegisterSchema>


const patientRegisterSchema = z.object({
    email: z.email('Valid email is required'),
    password: z.string().min(8, 'Minimum 8 characters required'),
    password_confirm: z.string().min(8, 'Minimum 8 characters required'),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    gender: z.string().min(1, 'Gender is required'),
    bloodType: z.string().optional(),
    nationalId: z.string(),
    phone: z.string().regex(/^\+?[0-9]+(?:[\s-][0-9]+)*$/, 'Invalid phone number').optional(),
    address: z.string(),
    emergencyContactName: z.string(),
    emergencyContactPhone: z.string(),
}).refine(data => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ['password_confirm'],
})

type TPatientRegisterSchema = z.infer<typeof patientRegisterSchema>


export { type TLoginData, loginSchema, type TDoctorRegisterSchema, doctorRegisterSchema, type TAssistantRegisterSchema, assistantRegisterSchema, type TPatientRegisterSchema, patientRegisterSchema }