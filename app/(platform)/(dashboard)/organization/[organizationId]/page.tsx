import {auth, OrganizationSwitcher} from "@clerk/nextjs";

const OrganizationIdPage = () => {
    const { userId, orgId } = auth();

    return (
        <div>
            OrgIdPage
        </div>
    );
};

export default OrganizationIdPage;