import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email({
        message:"email is required"
    }),
    password: z.string().min(1,{
        message:"password is required"
    })
})


export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message:"name is required"
    }),
    email: z.string().email({
        message:"email is required"
    }),
    password: z.string().min(6,{
        message:"min 6 characters is required"
    }),
  
})
export const CreateEmployeeSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Email is required' }),
    mobile: z.string().min(10, { message: 'Mobile number is required' }),
    designation: z.enum(['HR', 'Manager', 'Sales']),
    gender: z.enum(['Male', 'Female'], { message: 'Gender is required' }),
    course: z.array(z.enum(['MCA', 'BCA', 'BSC'])).nonempty({ message: 'At least one course is required' }),
    image: z
      .any()
      .refine(
        (file) => file && ['image/png', 'image/jpeg'].includes(file.type),
        { message: 'Image must be a PNG or JPEG file' }
      ),
  });


export const EmployeeSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Email is required' }),
    mobile: z.string().min(10, { message: 'Mobile number is required' }),
    designation: z.enum(['HR', 'Manager', 'Sales']),
    gender: z.enum(['Male', 'Female'], { message: 'Gender is required' }),
    course: z.array(z.enum(['MCA', 'BCA', 'BSC'])).nonempty({ message: 'At least one course is required' }),
    image: z
      .any()
      .refine(
        (file) => file && ['image/png', 'image/jpeg'].includes(file.type),
        { message: 'Image must be a PNG or JPEG file' }
      ),
  });

  export const EditSchema = z.object({
    name: z.string().optional(),
    email: z.optional(z.string().email()),
    mobile: z.string().min(10, 'Mobile number must be at least 10 digits').optional(),
    designation: z.enum(['HR', 'Manager', 'Sales']),
    gender: z.enum(['Male', 'Female']).optional(),
    course: z.array(z.enum(['MCA', 'BCA', 'BSC'])).optional(),
    image: z.any().optional(),
  });