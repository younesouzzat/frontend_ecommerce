"use client";
import { useState } from "react";
import FacebookLogin, {
  SuccessResponse,
} from "@greatsumini/react-facebook-login";
import { Button } from "./ui/button";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FacebookLoginButton = () => {
  const router = useRouter();
  const [message, setMessage] = useState<{
    text: string;
    severity: "error" | "success";
  }>();

  const onSuccessHandler = async (response: SuccessResponse) => {
    const apiResponse = await fetch("/api/facebook-login", {
      method: "POST",
      body: JSON.stringify({
        userId: response.userID,
        accessToken: response.accessToken,
      }),
    });
    
    const resp = await apiResponse.json();

    if (resp.success) toast.success("Welcome");
    setCookie("auth_data", JSON.stringify(resp.data.user), {
      path: "/",
      maxAge: 604800,
    });
    router.push("/dashboard");
  };

  return (
    <div>
      <FacebookLogin
        appId="981645750761610"
        onSuccess={onSuccessHandler}
        onFail={(error: any) => {
          console.log(error);
          setMessage({ text: "Error occured", severity: "error" });
        }}
        render={({ onClick }) => (
          <Button variant="outline" onClick={onClick} className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.407.595 24 1.325 24H12.82v-9.293H9.692v-3.622h3.128V8.412c0-3.1 1.894-4.788 4.662-4.788 1.325 0 2.462.099 2.794.143v3.24l-1.916.001c-1.504 0-1.794.716-1.794 1.765v2.315h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"
                fill="currentColor"
              />
            </svg>
            Login with Facebook
          </Button>
        )}
      />
      {message && (
        <div
          className={`${
            message.severity === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default FacebookLoginButton;
