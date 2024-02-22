import React from "react";
import OrganizationControl from "./_components/organization-control";

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