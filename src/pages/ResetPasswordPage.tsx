import FormFieldInput from "@/components/auth_components/auth-input-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { useResetPassword } from "@/hooks/auth.hooks";
import { resetPasswordLinkSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("_token");
  const hasToken = Boolean(token);

  const form = useForm<ResetPasswordLinkFormData>({
    resolver: zodResolver(resetPasswordLinkSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { resetPasswordMutation, reset } = useResetPassword();
  const { isSubmitting } = form.formState;

  const handleResetPassword = async (data: ResetPasswordLinkFormData) => {
    if (!token) {
      toast.error("Invalid reset link");
    }
    reset();
    try {
      const res = await resetPasswordMutation({
        newPassword: data.confirmPassword,
        token: token as string,
      });
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    }
  };
  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center px-4">
      <div className="w-full md:w-3/4 lg:w-[38%] mx-auto">
        <Card className="w-full p-4">
          <CardHeader>
            <div className="w-full flex justify-center items-center">
              <img
                src={"/pika-smart-logo.svg"}
                alt="pika smart brand logo"
                width={250}
                height={50}
              />
            </div>
            <CardTitle className="text-2xl">Reset your Password</CardTitle>
            <CardDescription className="text-sm">
              Enter your new preferred password
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleResetPassword)}
                className="space-y-4"
              >
                {/* password input */}
                <FormFieldInput
                  control={form.control}
                  name="password"
                  placeholder="******"
                  text="Password"
                />
                <FormFieldInput
                  control={form.control}
                  name="confirmPassword"
                  placeholder="******"
                  text="Confirm Password"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || !hasToken}
                  className="w-full bg-orange-600 hover:bg-orange-600/80 transition-colors duration-300 cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LoadingSwap
                    isLoading={isSubmitting}
                    className="text-white font-bold"
                  >
                    Reset Password
                  </LoadingSwap>
                </Button>
              </form>
            </Form>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-center items-center">
            <p className="text-sm">
              Remember your password?
              <Link to="/sign-in" className="underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
