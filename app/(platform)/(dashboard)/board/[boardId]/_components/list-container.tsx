"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";
import ListForm from "./list-form";
import ListItem from "./list-item";
import useAction from "@/hooks/use-action";
import updateListOrder from "@/actions/update-list-order";
import { toast } from "sonner";
import updateCardOrder from "@/actions/update-card-order";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result
};

const ListContainer = ({
    data,
    boardId
}: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("List is reordered");
        },
        onError: err => {
            toast.error(err);
        }
    });

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success("Card is reordered");
        },
        onError: err => {
            toast.error(err);
        }
    });

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;

        if (!destination) return;

        // if dropped in the same position
        if ((destination.droppableId === source.droppableId) && (destination.index === source.index)) {
            return;
        }

        // user moves a list
        if (type === "list") {
            const items = reorder(orderedData, source.index, destination.index)
                .map((item, index) => ({ ...item, order: index }));

            setOrderedData(items);
            executeUpdateListOrder({ items, boardId });
        }

        // user moves a card
        if (type === "card") {
            let newOrderedData = [...orderedData];

            const sourceList = newOrderedData.find(list => list.id === source.droppableId);
            const destList = newOrderedData.find(list => list.id === destination.droppableId);

            if (!sourceList || !destList) return;

            if (!sourceList.cards) sourceList.cards = [];

            if (!destList.cards) destList.cards = [];

            // moving the card in the same list
            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(sourceList.cards, source.index, destination.index);

                reorderedCards.forEach((card, index) => {
                    card.order = index;
                });

                sourceList.cards = reorderedCards;

                setOrderedData(newOrderedData);

                executeUpdateCardOrder({ boardId, items: reorderedCards });
            } else {
                // moving the card to other list

                // remove card from the source list
                const [movedCard] = sourceList.cards.splice(source.index, 1);
                // assign the new listId to the moved card
                movedCard.listId = destination.droppableId;
                // add card to the destination list
                destList.cards.splice(destination.index, 0, movedCard);

                sourceList.cards.forEach((card, index) => {
                    card.order = index;
                });

                // update the order for each card in the dest list
                destList.cards.forEach((card, index) => {
                    card.order = index;
                });

                setOrderedData(newOrderedData);

                executeUpdateCardOrder({ boardId, items: destList.cards });
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId="lists"
                type="list"
                direction="horizontal"
            >
                {provided => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full"
                    >
                        {orderedData.map((list, index) => (
                            <ListItem
                                key={list.id}
                                index={index}
                                data={list}
                            />
                        ))}
                        {provided.placeholder}

                        <ListForm />

                        <div className="flex-shrink-0 w-1" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ListContainer;