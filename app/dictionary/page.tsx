import DictionaryView from "@/components/views/DictionaryView";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function DictionaryPage() {
  if (!cookies().get("token")) redirect("/login");

  return <DictionaryView />;
}
