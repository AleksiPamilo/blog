import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { IPost } from "@/interfaces";
import BlogCard from "../BlogCard";

export default function BlogCarousel({ posts, loop }: {
    posts: IPost[],
    loop?: boolean,
    thumbnails?: boolean,
}) {
    return (
        <Carousel opts={{ loop: loop ?? false, align: "start", dragFree: true }}>
            <CarouselContent className="m-0 space-x-2">
                {
                    posts.map((post, index) => (
                        <CarouselItem key={index} className="w-full h-full relative rounded-md p-2 basis-[21rem]">
                            <BlogCard post={post} author={post.author} key={post.id} className="hover:scale-100" />
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
            <CarouselPrevious className="z-30 absolute left-1 top-1/2 transform -translate-y-1/2" />
            <CarouselNext className="z-30 absolute right-1 top-1/2 transform -translate-y-1/2" />
        </Carousel>
    )
}