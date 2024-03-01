"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }

    const { items, boardId } = data;

    let lists;

    try {
        const transaction = items.map(list => db.list.update({
            where: {
                id: list.id,
                board: {
                    orgId
                }
            },
            data: {
                order: list.order
            }
        }));

        lists = await db.$transaction(transaction);
    } catch (err) {
        return { error: "Failed to reorder list" }
    }

    revalidatePath(`/board/${boardId}`);

    return { data: lists };
};

const updateListOrder = createSafeAction(UpdateListOrder, handler);

export default updateListOrder;