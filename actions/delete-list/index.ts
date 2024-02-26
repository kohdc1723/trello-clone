"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }

    const { id, boardId } = data;

    let list;

    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            },
        });
    } catch (err) {
        return { error: "Failed to delete list" }
    }

    revalidatePath(`/board/${boardId}`);
    
    return { data: list }
};

const deleteList = createSafeAction(DeleteList, handler);

export default deleteList;