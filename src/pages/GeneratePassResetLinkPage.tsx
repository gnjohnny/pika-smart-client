import FormFieldInput from "@/components/auth_components/auth-input-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { useGeneratePasswordLink } from "@/hooks/auth.hooks";
import { generatePasswordResetLinkSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Link } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const GeneratePassResetLinkPage = () => {
  const [resetLink, setResetLink] = useState<string>("");

  const copyRef = useRef<HTMLPreElement | null>(null);

  const [isCopied, setIsCopied] = useState(false);

  const form = useForm<GeneratePasswordResetLinkFormData>({
    resolver: zodResolver(generatePasswordResetLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const { generatePasswordResetLinkMutation, reset } =
    useGeneratePasswordLink();
  const { isSubmitting } = form.formState;

  const handleGenerateLink = async (
    data: GeneratePasswordResetLinkFormData,
  ) => {
    reset();
    try {
      const res = await generatePasswordResetLinkMutation(data);
      if (res.success) {
        toast.success(res.message);
        setResetLink(res.resetpasswordLink);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLinkCopy = () => {
    const content = copyRef.current?.innerText;
    if (content) {
      navigator.clipboard.writeText(content);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      toast.success("Reset Link was copied successfully");
      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    }
  });
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
            <CardTitle className="text-2xl">
              Generate Password Reset Link
            </CardTitle>
            <CardDescription className="text-sm">
              Enter your email and Click the button below to generate a
              passsword reset link. The Link will be generated and be provided
              below.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            {resetLink ? (
              <div className="space-y-6">
                <div className="w-full h-fit px-2 py-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-orange-400/40 shadow-md shadow-gray-300/40 relative overflow-hidden">
                  <pre
                    ref={copyRef}
                    className="h-fit text-wrap text-sm select-all selection:bg-orange-200 selection:text-black/80"
                  >
                    {resetLink}
                  </pre>
                  <div className="flex-1 bg-black/40 backdrop-blur-md h-full rounded-r-2xl absolute top-0 right-0 flex justify-center items-center p-2">
                    <Button
                      className="cursor-pointer"
                      onClick={handleLinkCopy}
                      title={isCopied ? "copied" : "copy"}
                    >
                      <Copy size={28} className="text-black/80 font-bold" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-600/80 transition-colors duration-300 cursor-pointer text-white/80">
                  <a
                    href={resetLink}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex justify-center items-center gap-2"
                  >
                    <Link /> Open Link
                  </a>
                </Button>
                <Separator />
                <p className="text-sm text-center text-primary/40">
                  Copy the link or Click the link above to open the link in a
                  new tab
                </p>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleGenerateLink)}
                    className="space-y-6"
                  >
                    <FormFieldInput
                      control={form.control}
                      name="email"
                      placeholder="example@something.com"
                      text="Enter your email"
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
                        Generate password reset link
                      </LoadingSwap>
                    </Button>
                  </form>
                </Form>
                <Separator />
                <p className="text-sm text-center text-primary/40">
                  Enter the your email above to generate a password reset link
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneratePassResetLinkPage;
