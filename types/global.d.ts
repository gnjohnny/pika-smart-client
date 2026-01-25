import type {
  generatePasswordResetLinkSchema,
  resetPasswordLinkSchema,
  signInSchema,
  signUpSchema,
} from "@/schemas/schema";
import type { LucideIcon } from "lucide-react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { z } from "zod";

export {};

declare global {
  type FormFieldInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
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
  type SignInFormData = z.infer<typeof signInSchema>;
  type SignUpFormData = z.infer<typeof signUpSchema>;
  type GeneratePasswordResetLinkFormData = z.infer<
    typeof generatePasswordResetLinkSchema
  >;
  type ResetPasswordLinkFormData = z.infer<typeof resetPasswordLinkSchema>;
  type ItemsLinkType = {
    title: string;
    url: string;
    icon: LucideIcon;
  };
  type StatItemsType = {
    title: string;
    icon: LucideIcon;
    stat: number | null;
    desc: string;
  };

  type QuickActionItemsType = {
    title: string;
    icon: LucideIcon;
    desc: string;
    url: string;
  };
  type Recipe = {
    cook_time: number;
    createdAt: Date;
    description: string;
    generated_by_AI: boolean;
    ingredients: Array<{
      name: string;
      quantity: string;
      unit: string;
    }>;
    instructions: Array<string>;
    prep_time: number;
    servings: number;
    title: string;
    _id: string;
    reason: string;
  };
}
