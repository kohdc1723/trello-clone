import { Suspense } from "react";
import { User2 } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Info from "./_components/info";
import BoardList from "./_components/board-list";
import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div className="w-full mb-20">
            <Info isPro={isPro} />

            <Separator className="my-4" />
            
            <div className="px-2 md:px-4 space-y-4">
                <div className="flex items-center font-semibold text-lg text-neutral-700">
                    <User2 className="h-6 w-6 mr-2" />
                    Your Boards
                </div>
                <Suspense fallback={<BoardList.Skeleton />}>
                    <BoardList />
                </Suspense>
            </div>
        </div>
    );
};

export default OrganizationIdPage;