import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="sticky w-full h-24 border-b-2 border-gray-200">
        <div className="flex flex-row container mx-auto items-center h-full">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={64}
            height={64}
            className="rounded object-cover"
          ></Image>
        </div>
      </div>
    </header>
  );
};

export default Header;
