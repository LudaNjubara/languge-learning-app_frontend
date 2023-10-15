import { fetchAllLanguages } from "@/lib/utils";
import { TLanguage } from "@/typings";
import DictionaryForm from "../pages/dictionary";

export default async function DictionaryView() {
  let languages: TLanguage[] = [];

  try {
    const { language_names } = await fetchAllLanguages();

    const languageCodes = Object.keys(language_names);

    languages = languageCodes.map((code) => ({
      name: language_names[code],
      code,
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <h1 className="relative pb-3 text-9xl font-thin text-center after:block after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:from-10% to-transparent">
        Dictionary
      </h1>

      <p className="text-center text-lg mt-6 text-neutral-300 font-extralight">
        Study the language by specifically learning about the words you&apos;re interested in.
      </p>

      <main>
        <DictionaryForm languages={languages} />
      </main>
    </>
  );
}
