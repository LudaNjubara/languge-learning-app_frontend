import LogoutButton from "../button/LogoutButton";
import HeaderNavigaton from "./HeaderNavigation";

export default function Header() {
  return (
    <header className="container mx-auto px-10">
      <div className="py-10 flex justify-between">
        <div></div>

        <div className="flex gap-5 items-center">
          <HeaderNavigaton />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
