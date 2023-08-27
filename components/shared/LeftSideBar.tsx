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
    <aside className="fixed left-0 h-full bg-light w-1/5 z-0 border-r-2 border-gray-300">
      <h1 className="text-2xl font-bold text-neutral-800 m-10">PurelyBlog</h1>
      <div className="flex flex-col mx-10 my-12 justify-between text-cyan-900 h-full">
        {links.map((link: Link) => (
          <Link href={link.link} key={link.label} className="text-xl font-bold">
            <div className="flex flex-row gap-3 items-center">
              <span className="text-4xl">{link.icon}</span>
              {link.label}
            </div>
          </Link>
        ))}
        {/* <div className="mt-auto z-100">
          <AvatarDropDown name="John Doe" email="" imgUrl="" />
        </div> */}
      </div>
    </aside>
  );
};

export default LeftSideBar;
