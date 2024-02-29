"use client";

import { ListWithCards } from "@/types";

interface CardItemProps {
    data: ListWithCards;
    index: number;
}

const CardItem = ({
    data,
    index
}: CardItemProps) => {
    return (
        <div className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
            {data.title}
        </div>
    );
};

export default CardItem;