import LoginView from "@components/views/LoginView";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  if (cookies().get("token")) redirect("/");

  return <LoginView />;
}
