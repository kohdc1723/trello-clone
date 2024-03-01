"use client";

import { useEffect, useState } from "react";
import CardModal from "../card-modal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <CardModal />
        </>
    );
};

export default ModalProvider;