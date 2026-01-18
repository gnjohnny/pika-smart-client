import type { Control, FieldPath, FieldValues } from 'react-hook-form'

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
}