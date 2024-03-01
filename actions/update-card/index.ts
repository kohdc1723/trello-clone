"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }

    const { id, boardId, ...values } = data;

    let card;

    try {
        card = await db.card.update({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            },
            data: {
                ...values
            }
        });
    } catch (err) {
        return { error: "Failed to update card" }
    }

    revalidatePath(`/board/${boardId}`);

    return { data: card };
};

const updateCard = createSafeAction(UpdateCard, handler);

export default updateCard;