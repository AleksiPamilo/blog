import { HomeIcon, StarIcon, BellIcon, PenLine } from "lucide-react";

type NavItemType = {
    name: string,
    path: string,
    icon?: JSX.Element,
}

const iconStyle = "w-full h-full";

const NavItems: NavItemType[] = [
    {
        name: "Home",
        path: "/",
        icon: <HomeIcon className={iconStyle} />,
    },
    {
        name: "Popular",
        path: "/popular",
        icon: <StarIcon className={iconStyle} />
    },
    {
        name: "Newest",
        path: "/newest",
        icon: <BellIcon className={iconStyle} />
    },
    {
        name: "Create Post",
        path: "/create-post",
        icon: <PenLine className={iconStyle} />
    }
];

export default NavItems;
