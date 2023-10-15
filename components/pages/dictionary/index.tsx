"use client";

import { LEXICALA_API_URL, lexicalaHeaders } from "@/lib/constants/consts";
import { TDictionaryApiResponse, TDictionaryWord, TLanguage } from "@/typings";
import { FormEvent, useState } from "react";

type TProps = {
  languages: TLanguage[];
};

export default function DictionaryForm({ languages }: TProps) {
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(
    languages.find((language) => language.code === "en")?.code
  );
  const [nResults, setNResults] = useState<number | undefined>(undefined);
  const [results, setResults] = useState<TDictionaryWord[]>([]);

  const handleLanguageChange = (e: FormEvent<HTMLSelectElement>) => {
    const { value: currValue } = e.currentTarget;
    if (currValue === selectedLanguageCode) return;

    setSelectedLanguageCode(currValue);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search_query") as string;

    if (!searchQuery || !selectedLanguageCode) return;

    const searchParams = new URLSearchParams({
      text: searchQuery,
      language: selectedLanguageCode!,
    });

    try {
      const res = await fetch(`${LEXICALA_API_URL}/search-entries?${searchParams.toString()}`, {
        method: "GET",
        headers: lexicalaHeaders,
      });

      if (!res.ok) throw new Error("Something went wrong");

      const { n_results, results } = (await res.json()) as TDictionaryApiResponse;

      setNResults(n_results);
      setResults(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto mt-16">
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <select
          className="w-1/5 appearance-none bg-neutral-900 text-white py-3 px-4 rounded cursor-pointer border-2 border-neutral-800 hover:bg-neutral-800 focus:bg-neutral-800 transition-colors duration-300"
          value={selectedLanguageCode}
          onChange={handleLanguageChange}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
        <input
          className="w-3/5 bg-neutral-900 text-white py-3 px-4 rounded border-2 border-neutral-800 placeholder:text-neutral-500"
          type="text"
          name="search_query"
          placeholder="Search for a word"
        />
        <button
          className="w-1/5 bg-neutral-900 text-white py-3 px-4 rounded border-2 border-neutral-800 hover:bg-neutral-800 focus:bg-neutral-800 transition-colors duration-300"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="mt-6 p-5 border-2 border-neutral-800 border-b-0 rounded-tl-md rounded-tr-md">
        <h2 className="text-4xl font-thin text-center">Results</h2>
        {nResults !== undefined && (
          <span className="block w-fit mx-auto mt-2 text-sm py-1 px-3 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-full">
            {nResults ? `${nResults} result(s)` : "No results"}
          </span>
        )}

        <div className="mt-6 overflow-y-auto max-h-[700px] pr-5">
          {results.map((result) => (
            <div className="mt-8" key={result.id}>
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-2xl font-thin">{result.headword.text}</h3>
                <button className="bg-neutral-900 text-white py-3 px-4 rounded border-2 border-neutral-800 hover:bg-neutral-800 focus:bg-neutral-800 transition-colors duration-300">
                  Add to favorites
                </button>
              </div>

              {result.senses.map((sense) => (
                <div className="mt-4 p-4 bg-neutral-950 rounded-md" key={sense.id}>
                  {!!sense.compositional_phrases ? (
                    <>
                      <h4 className="text-xl font-bold">Compositional phrases</h4>
                      <ul className="list-disc list-inside">
                        {sense.compositional_phrases.map((phrase) => (
                          <>
                            <li className="text-base font-extralight" key={phrase.text}>
                              {phrase.text}
                            </li>

                            <h4 className="text-xl font-medium mt-4">Examples</h4>
                            <ul className="list-disc list-inside">
                              {phrase.examples?.map((example) => (
                                <li className="text-base font-extralight" key={example.text}>
                                  {example.text}
                                </li>
                              ))}
                            </ul>
                          </>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <h4 className="text-xl font-bold">Definition</h4>
                      <p className="text-base font-extralight">{sense.definition}</p>

                      <h4 className="text-xl font-medium mt-4">Examples</h4>
                      <ul className="list-disc list-inside">
                        {sense.examples?.map((example) => (
                          <li className="text-base font-extralight" key={example.text}>
                            {example.text}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
