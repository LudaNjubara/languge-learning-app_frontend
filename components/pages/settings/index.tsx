"use client";

import { handleLanguageSettingChange } from "@/lib/handlers/handlers";
import { useSettingsStore } from "@/lib/store/SettingsStore";
import { TUserData } from "@/typings";
import { useMemo } from "react";

export type TLearningLanguage = {
  languageCode: string;
  languageName: string;
};

type TSettingsItem = {
  title: string;
  description: string;
  component: JSX.Element;
};

type TLearningLanguageSettingProps = {
  languages: TLearningLanguage[];
};

const LearningLanguageSetting = ({ languages }: TLearningLanguageSettingProps) => {
  const learningLanguage = useSettingsStore((state) => state.learningLanguage);

  return (
    <select
      className="w-full max-w-[300px] px-4 py-2 text-neutral-200 bg-neutral-900 border border-neutral-500 rounded-md focus:outline-none focus:border-white"
      defaultValue={learningLanguage?.languageCode}
      name="languageCode"
    >
      <option disabled>Select a language...</option>
      {languages.map((language) => (
        <option key={language.languageCode} value={language.languageCode}>
          {language.languageName}
        </option>
      ))}
    </select>
  );
};

type TSettingsFormProps = {
  data: {
    learningLanguages: TLearningLanguage[];
  };
  userData: TUserData;
};

export default function SettingsForm({ data, userData }: TSettingsFormProps) {
  useSettingsStore((state) => state.setUsername)(userData?.username);
  useSettingsStore((state) => state.setLearningLanguage)(userData?.selectedLanguage);

  const settingsItems: TSettingsItem[] = useMemo(
    () => [
      {
        title: "Learning Language",
        description:
          "Select your preferred learning language. This will be used to provide you with learning material in the selected language.",
        component: <LearningLanguageSetting languages={data.learningLanguages} />,
      },
    ],
    [data.learningLanguages]
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        action={(e) => handleLanguageSettingChange(e)}
        className="flex flex-col gap-4 max-w-5xl mx-auto bg-neutral-950 rounded-lg p-8 mt-6"
      >
        {settingsItems.map((item) => (
          <div key={item.title}>
            <h2 className="text-xl font-semibold text-neutral-300">{item.title}</h2>
            <p className="text-neutral-400">{item.description}</p>
            <div className="mt-4">{item.component}</div>
          </div>
        ))}

        <button className="self-end px-4 py-2 mt-8 text-base text-neutral-800 font-semibold bg-neutral-100 border border-neutral-950 rounded-md focus:outline-none focus:border-black hover:scale-95 transition-all duration-200">
          Save Changes
        </button>
      </form>
    </div>
  );
}
