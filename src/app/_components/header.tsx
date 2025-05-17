import Link from "next/link";
import { ThemeSwitcher } from "@/app/_components/theme-switcher";
import SearchButton from "./search-icon";


const Header = () => {
  return ( <>

    <div className="static top-0 right-20 items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
      {/*<div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96 font-bold ">*/}
     <div className="no-scrollbar max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96 font-bold ">
    {/*<h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">*/}
      <Link href="/" className="hover:underline">
        Home
      </Link>
      <Link href="/search" className="hover:underline">
         <SearchButton />
      </Link>
    {/*</h2>*/}

      </div >
      </div >
        <ThemeSwitcher /> 
        </>
  );
};

export default Header;
