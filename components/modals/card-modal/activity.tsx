"use client";

import { AuditLog } from "@prisma/client";
import { Skeleton } from "../../ui/skeleton";
import { ActivityIcon } from "lucide-react";
import ActivityItem from "../../activity-item";

interface ActivityProps {
    items: AuditLog[];
}

const Activity = ({
    items
}: ActivityProps) => {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Activity
                </p>
                <ol className="mt-2 space-y-4">
                    {items.map(item => (
                        <ActivityItem
                            key={item.id}
                            data={item}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
};

Activity.Skeleton = () => {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="h-6 w-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className="w-full h-10 bg-neutral-200" />
            </div>
        </div>
    );
};

export default Activity;