"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }

    const { items, boardId } = data;

    let cards;

    try {
        const transaction = items.map(card => (
            db.card.update({
                where: {
                    id: card.id,
                    list: {
                        board: {
                            orgId
                        }
                    }
                },
                data: {
                    order: card.order,
                    listId: card.listId
                }
            })
        ));

        cards = await db.$transaction(transaction);
    } catch (err) {
        return { error: "Failed to reorder card" }
    }

    revalidatePath(`/board/${boardId}`);

    return { data: cards };
};

const updateCardOrder = createSafeAction(UpdateCardOrder, handler);

export default updateCardOrder;