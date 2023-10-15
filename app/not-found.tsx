import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto mt-16">
      <h1 className="relative text-9xl font-thin text-center after:block after:absolute after:inset-0 after:bg-gradient-to-t after:from-black after:from-10% to-transparent">
        404
      </h1>

      <p className="text-center text-lg mt-6 text-neutral-300 font-extralight">
        Page you&apos;re looking for does not exist. Try the{" "}
        <Link href="/" className="text-white/50 cursor-pointer">
          home page
        </Link>
        .
      </p>
    </div>
  );
}
