"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { parsePostTitleFromSlug } from "@/utils/createSlug";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function Breadcrumbs() {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <div className="max-md:hidden flex items-center justify-center capitalize mt-2">
            <div className="w-4/5">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        {
                            pathNames.map((link, index) => {
                                const href = `/${pathNames.slice(0, index + 1).join('/')}`;
                                const itemLink = link[0].toUpperCase() + link.slice(1, link.length).replaceAll("-", " ");
                                const isLastItem = index === pathNames.length - 1;
                                const parsedSlug = parsePostTitleFromSlug(href);

                                if (isLastItem) {
                                    return (
                                        <Fragment key={index}>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>{parsedSlug?.postSlug ?? itemLink}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </Fragment>
                                    );
                                } else {
                                    return (
                                        <Fragment key={href}>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </Fragment>
                                    );
                                }
                            })
                        }
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}
