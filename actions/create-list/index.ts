"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }

    const { title, boardId } = data;

    let list;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        });

        if (!board) {
            return { error: "Board is not found" };
        }

        const lastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: "desc" },
            select: { order: true }
        });

        const order = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                title,
                boardId,
                order: order
            }
        });
    } catch (err) {
        return { error: "Failed to update board" }
    }

    revalidatePath(`/board/${boardId}`);

    return { data: list };
};

const createList = createSafeAction(CreateList, handler);

export default createList;