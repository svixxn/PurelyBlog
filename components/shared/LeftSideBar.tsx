import links from "../../constants/links";
import Link from "next/link";
import AvatarDropDown from "../profile/AvatarDropDown";

type Link = {
  label: string;
  link: string;
  icon: React.ReactNode;
};

const LeftSideBar = () => {
  return (
    <aside className="sticky left-0 top-0 h-screen text-cyan-900 bg-gray-300 bg-light border-r-2 border-gray-300">
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold text-neutral-800 m-10">PurelyBlog</h1>
        <div className="flex flex-col gap-10 mx-10">
          {links.map((link: Link) => (
            <Link
              href={link.link}
              key={link.label}
              className="text-xl font-bold"
            >
              <div className="flex flex-row gap-3 p-2 items-center border-b-[1px] border-gray-300">
                <span className="text-3xl">{link.icon}</span>
                {link.label}
              </div>
            </Link>
          ))}
        </div>
        <div className="mx-10 mt-auto mb-10">
          <AvatarDropDown />
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;
