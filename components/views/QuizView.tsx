import { fetchUserData } from "@/lib/fetchers/fetchers";
import { TUserData } from "@/typings";
import QuizWrapper from "../pages/quiz";

export default async function QuizView() {
  let userData: TUserData = {};

  try {
    userData = await fetchUserData();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h1 className="relative pb-3 text-9xl font-thin text-center after:block after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:from-15% to-transparent">
        Quiz
      </h1>

      <p className="text-center text-lg mt-6 text-neutral-300 font-extralight">
        Test your knowledge of the language by answering questions.
      </p>

      <main>
        <QuizWrapper userData={userData} />
      </main>
    </>
  );
}
