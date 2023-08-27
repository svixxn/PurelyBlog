import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { IoIosNotificationsOutline, IoIosCreate } from "react-icons/io";
const links = [
  {
    label: "Home",
    link: "/",
    icon: <AiFillHome />,
  },
  {
    label: "Search",
    link: "/search",
    icon: <AiOutlineSearch />,
  },
  {
    label: "Create",
    link: "/new-post",
    icon: <IoIosCreate />,
  },
  {
    label: "Notifications",
    link: "/notifications",
    icon: <IoIosNotificationsOutline />,
  },
];

export default links;
