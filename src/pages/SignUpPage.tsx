import FormFieldInput from "@/components/auth_components/auth-input-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useSignUp } from "@/hooks/auth.hooks";
import { signUpSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const SignUpPage = () => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {signUp, reset} = useSignUp();
  const { isSubmitting } = form.formState;

  const handleSignUp = async (data: SignUpFormData) => {
    reset()
    try{
        const res = await signUp({
            email: data.email,
            password: data.confirmPassword
        })

        if(res.success){
            toast.success(res.message)
        }else{
            toast.error(res.message)
        }
    }catch(err: any){
        toast.error(err.message || "Something went wrong")
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
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription className="text-sm">
              Create a pika smart account to get all out of it. With an account
              you'll be able to save recipes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignUp)}
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
                <FormFieldInput
                  control={form.control}
                  name="confirmPassword"
                  placeholder="******"
                  text="Confirm Password"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-600/80 transition-colors duration-300 cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <LoadingSwap
                    isLoading={isSubmitting}
                    className="text-white font-bold"
                  >
                    Sign Up
                  </LoadingSwap>
                </Button>
              </form>
            </Form>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-center items-center">
            <p className="text-sm">
             Already have an account?{"  "}
              <Link to={"/sign-in"} className="underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
          <Separator />
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
