"use client";

import { useEffect, useState } from "react";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import ListItem from "./list-item";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

const ListContainer = ({
    data,
    boardId
}: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState<Array<ListWithCards>>(data);

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    return (
        <ol className="flex gap-x-3 h-full">
            {orderedData.map((list, index) => (
                <ListItem
                    key={list.id}
                    index={index}
                    data={list}
                />
            ))}

            <ListForm />
            
            <div className="flex-shrink-0 w-1" />
        </ol>
    );
};

export default ListContainer;