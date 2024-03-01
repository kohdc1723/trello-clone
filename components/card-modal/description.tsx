"use client";

import { CardWithList } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { AlignLeft } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormTextarea from "../form/form-textarea";
import FormSubmit from "../form/form-submit";
import { Button } from "../ui/button";
import useAction from "@/hooks/use-action";
import { toast } from "sonner";
import updateCard from "@/actions/update-card";

interface DescriptionProps {
    data: CardWithList;
}

const Description = ({
    data
}: DescriptionProps) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const textareaRef = useRef<ElementRef<"textarea">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") disableEditing();
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            });
            toast.success(`Card "${data.title}" is updated`);
            disableEditing();
        },
        onError: err => {
            toast.error(err);
        }
    });

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({ id: data.id, description, boardId });
    };

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {isEditing ? (
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className="space-y-2"
                    >
                        <FormTextarea
                            id="description"
                            className="w-full mt-2"
                            placeholder="Add a more detailed description"
                            defaultValue={data.description || undefined}
                            errors={fieldErrors}
                            ref={textareaRef}
                        />
                        <div className="flex items-center gap-x-2">
                            <FormSubmit>
                                Save
                            </FormSubmit>
                            <Button
                                type="button"
                                onClick={disableEditing}
                                size="sm"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={enableEditing}
                        role="button"
                        className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                    >
                        {data.description || "Add a more detailed description"}
                    </div>
                )}
            </div>
        </div>
    );
};

Description.Skeleton = () => {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className="w-full h-[78px] bg-neutral-200" />
            </div>
        </div>
    );
};

export default Description;