"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const deleteBoard = async (id: string) => {
    await db.board.delete({
        where: {
            id
        }
    });

    revalidatePath("/organization/org_2ciCgEG1awsvXVEz5xMMBt3gIQq");
};

export default deleteBoard;