"use client";

import { CardWithList } from "@/types";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "../../ui/button";
import { Copy, Trash } from "lucide-react";
import useAction from "@/hooks/use-action";
import copyCard from "@/actions/copy-card";
import deleteCard from "@/actions/delete-card";
import { useParams } from "next/navigation";
import useCardModal from "@/hooks/use-card-modal";
import { toast } from "sonner";

interface ActionsProps {
    data: CardWithList;
}

const Actions = ({
    data
}: ActionsProps) => {
    const params = useParams();

    const cardModal = useCardModal();

    const {
        execute: executeCopyCard,
        isLoading: isLoadingCopyCard
    } = useAction(copyCard, {
        onSuccess: data => {
            toast.success(`Card "${data.title}" is copied`);
            cardModal.onClose();
        },
        onError: err => {
            toast.error(err);

        }
    });

    const {
        execute: executeDeleteCard,
        isLoading: isLoadingDeleteCard
    } = useAction(deleteCard, {
        onSuccess: data => {
            toast.success(`Card "${data.title}" is deleted`);
            cardModal.onClose();
        },
        onError: err => {
            toast.error(err);
            
        }
    });

    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopyCard({ id: data.id, boardId });
    };

    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDeleteCard({ id: data.id, boardId });
    };

    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Actions
            </p>
            <Button
                onClick={onCopy}
                disabled={isLoadingCopyCard}
                variant="gray"
                className="w-full justify-start"
                size="inline"
            >
                <Copy className="h-4 w-4 mr-2" />
                Copy
            </Button>
            <Button
                onClick={onDelete}
                disabled={isLoadingDeleteCard}
                variant="gray"
                className="w-full justify-start"
                size="inline"
            >
                <Trash className="h-4 w-4 mr-2" />
                Delete
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-full bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
            <Skeleton className="w-full h-8 bg-neutral-200" />
        </div>
    );
};

export default Actions;