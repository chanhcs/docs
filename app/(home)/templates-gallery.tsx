"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "../constants/templates";
import { useRouter } from "next/navigation";

const TemplatesGallery = () => {
    const router = useRouter()

    const handleTemplateClick = () => {
        router.push("/documents/123")
    }

    return (
        <div className="w-full bg-muted/60 border-b">
            <div className="flex flex-col items-start gap-4 px-16 max-sm:px-4 py-8 max-w-6xl mx-auto">
                <p className="text-lg font-medium">Start a new document</p>
                <Carousel opts={{ align: "start" }} className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="-ml-2 pt-2">
                        {templates.map(template => (
                            <CarouselItem
                                key={template.id}
                                onClick={handleTemplateClick}
                                className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                            >
                                <div className="flex flex-col gap-2 cursor-pointer group">
                                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-md border bg-white shadow-sm transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-blue-400 group-hover:ring-1 group-hover:ring-blue-400/50">
                                        <Image
                                            src={template.imageUrl}
                                            alt={template.label}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-sm text-center text-muted-foreground transition-colors group-hover:text-foreground">
                                        {template.label}
                                    </span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};

export default TemplatesGallery;