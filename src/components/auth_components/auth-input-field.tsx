import type { FieldValues } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";

const FormFieldInput = <T extends FieldValues>({
    control,
    name,
    placeholder,
    text,
}: FormFieldInputProps<T>) => {
    const inputType =
        name === "email"
            ? "email"
            :  name === "password" || name === "confirmPassword"
            ? "password"
            : "text";
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-0.5">
                    <FormLabel className="">{text}</FormLabel>
                    <FormControl>
                        {name === "password" || name === "confirmPassword" ? (
                            <PasswordInput
                                {...field}
                                placeholder={placeholder}
                            />
                        ) : (
                            <Input
                                type={inputType}
                                {...field}
                                placeholder={placeholder}
                                className="p-2"
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldInput;
