import type { signInSchema, signUpSchema } from '@/schemas/schema';
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type z from 'zod';

export {};

declare global{
     type FormFieldInputProps<
        TFieldValues extends FieldValues = FieldValues,
        TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
    > = {
        control: Control<TFieldValues>;
        name: TName;
        placeholder: string;
        text: string;
     };
     type ProtectRoutesPropTypes = {
        isAllowed: boolean;
        redirectPath?: string;
        children?: React.ReactNode;
    };
    type SignInFormData = z.infer<typeof signInSchema>
    type SignUpFormData = z.infer<typeof signUpSchema>
}