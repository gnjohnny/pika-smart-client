import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth.hooks";
import { Laptop } from "lucide-react";
import { useState, useEffect } from "react";
import Bowser from "bowser";

const SettingsPage = () => {
  const { authUser } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [passwords, setPasswords] = useState<{
    current: string;
    new: string;
  }>({
    current: "",
    new: "",
  });
  const isSubmitting = false;

  const [browserName, setBrowserName] = useState<string>("");
  const [os, setOs] = useState<string>("");

  useEffect(() => {
    if (authUser?.user.email) {
      setEmail(authUser.user.email);
    }
  }, [authUser?.user.email]);

  useEffect(() => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    setBrowserName(browser.getBrowserName());
    setOs(browser.getOSName());
  }, []);
  return (
    <div className="w-full space-y-6">
      <div className="w-full p-2">
        <h1 className="text-2xl lg:text-4xl font-semibold text-primary/80">
          Settings
        </h1>
        <p className="text-xs md:text-sm text-primary/70">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card className="w-full py-4 gap-4">
        <CardHeader className="px-4">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Email
          </CardTitle>
          <CardDescription>
            Enter the email you would like to log in with
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <Input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Separator className="my-4" />
        </CardContent>
        <CardFooter className="px-4 flex justify-between items-center">
          <p className="text-xs md:text-sm text-primary/80">
            Enter a valid email to update your account settings
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-600 hover:bg-orange-600/80 transition-colors duration-300 cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LoadingSwap
              isLoading={isSubmitting}
              className="text-white font-bold"
            >
              Save
            </LoadingSwap>
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full py-4 gap-4">
        <CardHeader className="px-4">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Change Password
          </CardTitle>
          <CardDescription>
            Enter your current password and a new password to update your
            account settings
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <div className="w-full  my-4">
            <p className="text-primary/95 my-2">Current Password</p>
            <Input
              type="password"
              placeholder="Current Password..."
              className="w-full p-2 border rounded-md"
              value={passwords.current}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, current: e.target.value }))
              }
            />
          </div>
          <div className="w-full  my-4">
            <p className="text-primary/95 my-2">New Password</p>
            <PasswordInput
              placeholder="New Password..."
              className="w-full p-2"
              value={passwords.new}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, new: e.target.value }))
              }
            />
          </div>
          <Separator className="my-4" />
        </CardContent>
        <CardFooter className="px-4 flex justify-between items-center">
          <p className="text-xs md:text-sm text-primary/80">
            Please use 6 characters at minimum.
          </p>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-600 hover:bg-orange-600/80 transition-colors duration-300 cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LoadingSwap
              isLoading={isSubmitting}
              className="text-white font-bold"
            >
              Save
            </LoadingSwap>
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full py-4 gap-4">
        <CardHeader className="px-4">
          <CardTitle className="text-xl lg:text-2xl font-semibold">
            Sessions
          </CardTitle>
          <CardDescription>Your active session device.</CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <div className="w-full  my-4">
            <p className="text-primary/95 my-2">Current Session</p>
            <div className="w-full p-4 border rounded-md flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center">
                <span className="text-white font-bold">
                  <Laptop size={22} />
                </span>
              </div>
              <div>
                <p className="font-semibold">{os}</p>
                <p className="text-sm text-primary/80">{browserName}</p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
