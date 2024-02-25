import React from "react";
import { startCase } from "lodash";

import OrganizationControl from "./_components/organization-control";
import { auth } from "@clerk/nextjs";

export const generateMetadata = () => {
    const { orgSlug } = auth();

    return {
        title: startCase(orgSlug || "organization")
    };
};

const OrganizationIdLayout = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <>
            <OrganizationControl />
            {children}
        </>
    );
};

export default OrganizationIdLayout;