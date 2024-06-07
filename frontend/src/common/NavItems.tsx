import { HomeIcon, StarIcon, BellIcon, PenLine, FilePenLine } from "lucide-react";

type NavItemType = {
    name: string,
    path: string,
    icon?: JSX.Element,
}

const iconStyle = "w-full h-full";

const generateNavItems = (userSlug?: string): NavItemType[] => {
    const items: NavItemType[] = [
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
    ];

    if (userSlug) {
        items.push({
            name: "My Drafts",
            path: `/${userSlug}/drafts`,
            icon: <FilePenLine className={iconStyle} />,
        });
    }

    return items;
}

export default generateNavItems;