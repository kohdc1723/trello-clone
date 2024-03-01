"use server";

import { auth } from "@clerk/nextjs";
import { InputType, OutputType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import createSafeAction from "@/lib/create-safe-action";
import { CopyCard } from "./schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }

    const { id, boardId } = data;

    let card;

    try {
        const cardToCopy = await db.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            }
        });

        if (!cardToCopy) {
            return { error: "Card is not found" };
        }

        const lastCard = await db.card.findFirst({
            where: {
                listId: cardToCopy.listId
            },
            orderBy: {
                order: "desc"
            },
            select: {
                order: true
            }
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title: `${cardToCopy.title} - Copy`,
                description: cardToCopy.description,
                order: newOrder,
                listId: cardToCopy.listId
            }
        });
    } catch (err) {
        return { error: "Failed to copy the card" }
    }

    revalidatePath(`/board/${boardId}`);
    
    return { data: card }
};

const copyCard = createSafeAction(CopyCard, handler);

export default copyCard;