"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import unsplash from "@/lib/unsplash";
import { cn } from "@/lib/utils";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {
    const { pending } = useFormStatus();

    const [images, setImages] = useState<Array<Record<string, any>>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const bgCollectionId = "317099";

                const result = await unsplash.photos.getRandom({
                    collectionIds: [bgCollectionId],
                    count: 9
                });

                if (result && result.response) {
                    const newImages = (result.response as Array<Record<string, any>>);
                    setImages(newImages);
                } else {
                    console.error("Failed to get images from unsplash");
                }
            } catch (err) {
                console.error(err);
                setImages([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    const onClickImage = (imageId: any) => {
        if (pending) return;

        setSelectedImageId(imageId);
    };

    if (isLoading) {
        return (
            <div className="p-6 flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-2">
                {images.map(image => (
                    <div
                        className={cn("cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted", pending && "opacity-50 hover:opacity-50 cursor-auto")}
                        onClick={() => onClickImage(image.id)}
                    >
                        <Image
                            fill
                            src={image.urls.thumb}
                            alt="unsplash-image"
                            className="object-cover rounded-sm"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormPicker;