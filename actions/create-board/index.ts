"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { InputType, OutputType } from "@/actions/create-board/types";
import { db } from "@/lib/db";
import createSafeAction from "@/lib/create-safe-action";
import CreateBoard from "@/actions/create-board/schema";
import createAuditLog from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" };
    }

    const { title, image } = data;

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|");

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: "Missing fields. Failed to create board."
        };
    }

    let board;

    try {
        board = await db.board.create({
            data: { title, orgId, imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName }
        });

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE
        });
    } catch (err) {
        return { error: "failed to create board" };
    }

    revalidatePath(`/board/${board.id}`);

    return { data: board };
};

const createBoard = createSafeAction(CreateBoard, handler);

export default createBoard;