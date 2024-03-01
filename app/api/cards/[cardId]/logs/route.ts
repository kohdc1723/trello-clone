import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
    request: Request,
    { params }: { params: { cardId: string } }
) => {
    try {
        const { userId, orgId } = auth();

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const auditLogs = await db.auditLog.findMany({
            where: {
                orgId,
                entityId: params.cardId,
                entityType: ENTITY_TYPE.CARD
            },
            orderBy: {
                createAt: "desc"
            },
            take: 3
        });

        return NextResponse.json(auditLogs);
    } catch (err) {
        return new NextResponse("Internal error", { status: 500 });
    }
};