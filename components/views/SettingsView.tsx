import { fetchSupportedLanguages, fetchUserData } from "@/lib/fetchers/fetchers";
import { TUserData } from "@/typings";
import SettingsForm, { TLearningLanguage } from "../pages/settings";

type TSettingsData = {
  learningLanguages: TLearningLanguage[];
};

export default async function SettingsView() {
  let userData: TUserData = {};
  let learningLanguages: TLearningLanguage[] = [];

  let settingsData: TSettingsData = { learningLanguages: [] };

  try {
    userData = await fetchUserData();
    learningLanguages = await fetchSupportedLanguages();
    settingsData = {
      learningLanguages,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h1 className="relative pb-3 text-9xl font-thin text-center after:block after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:from-10% to-transparent">
        Settings
      </h1>

      <p className="text-center text-lg mt-6 text-neutral-300 font-extralight">
        Change the app&apos;s settings.
      </p>

      <main>
        <SettingsForm data={settingsData} userData={userData} />
      </main>
    </>
  );
}
