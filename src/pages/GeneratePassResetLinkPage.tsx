import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const GeneratePassResetLinkPage = () => {
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
              Click the button below to generate a passsword reset link. The
              Link will be generated and be provided below.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="w-full h-16 p-2 rounded-2xl border border-orange-400 shadow-sm shadow-orange-300/10">
              <pre className="text-center">
                http://localhost:5173/reset-password?_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5ueUBwaWthc21hcnQuY29tIiwiaWF0IjoxNzY4OTA4NzAwLCJleHAiOjE3Njg5MDkzMDB9.YfseQ_Ck0l4IETGjZjFalCmKyfgaVQt4lA1tkGAYCdA
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneratePassResetLinkPage;
