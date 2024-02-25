"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { InputType, OutputType } from "@/actions/create-board/types";
import { db } from "@/lib/db";
import createSafeAction from "@/lib/create-safe-action";
import CreateBoard from "@/actions/create-board/schema";

const handler = async (data: InputType): Promise<OutputType> => {
    const { userId } = auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const { title } = data;

    let board;

    try {
        board = await db.board.create({
            data: { title }
        });
    } catch (err) {
        return { error: "failed to create board" };
    }

    revalidatePath(`/board/${board.id}`);

    return { data: board };
};

const createBoard = createSafeAction(CreateBoard, handler);

export default createBoard;