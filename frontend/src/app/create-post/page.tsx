import Editor from "@/components/Editor/Editor";
import { Input } from "@/components/ui/input";

export default function CreatePost() {
    return (
        <div className="flex flex-col items-center justify-center pb-16">
            <div className="max-w-[1024px] w-full mt-4 flex max-md:flex-col max-md:gap-2 md:items-center justify-between">
                <div className="mt-12 px-2 w-full flex flex-col gap-4 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
                    <Input placeholder="Blog title..." className="shadow-md" />
                    <Editor />
                </div>

            </div>
        </div>
    )
}