import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";

const FormFieldInput = ({
    control,
    name,
    placeholder,
    text,
}: FormFieldInputProps) => {
    const inputType =
        name === "email"
            ? "email"
            :  name === "password"
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
                        {name === "password" ? (
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
