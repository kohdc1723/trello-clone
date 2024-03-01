"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }

    const { id, boardId } = data;

    let card;

    try {
        card = await db.card.delete({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            }
        });
    } catch (err) {
        return { error: "Failed to delete the card" }
    }

    revalidatePath(`/board/${boardId}`);
    
    return { data: card }
};

const deleteCard = createSafeAction(DeleteCard, handler);

export default deleteCard;