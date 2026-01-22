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
import { useSignIn } from "@/hooks/auth.hooks";
import { signInSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

const SignInPage = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn, reset } = useSignIn();
  const { isSubmitting } = form.formState;

  const handleSignIn = async (data: SignInFormData) => {
    reset();
    try {
      const res = await signIn(data);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
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
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription className="text-sm">
              Welcome back! Please enter your details to sign in to your account
              continue getting more from pika smart
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignIn)}
                className="space-y-4"
              >
                {/* email input */}
                <FormFieldInput
                  control={form.control}
                  name="email"
                  placeholder="john@example.com"
                  text="Email"
                />
                {/* password input */}
                <FormFieldInput
                  control={form.control}
                  name="password"
                  placeholder="******"
                  text="Password"
                />

                <p className="text-sm">
                  Don't remember your password?{"  "}
                  <Link
                    to={"/generate-password-reset-link"}
                    className="underline"
                  >
                    Forgot Password
                  </Link>
                </p>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-600/80 transition-colors duration-300 cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LoadingSwap
                    isLoading={isSubmitting}
                    className="text-white font-bold"
                  >
                    Sign In
                  </LoadingSwap>
                </Button>
              </form>
            </Form>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-center items-center">
            <p className="text-sm">
              Don't have an account?{"  "}
              <Link to={"/sign-up"} className="underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
