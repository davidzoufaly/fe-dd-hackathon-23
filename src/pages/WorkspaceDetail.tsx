import { useParams } from "react-router-dom";
import React from "react";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

import { useWorkspaces } from "../hooks/useWorkspaces.js";
import { WorkspacesList } from "../components/WorkspacesList/WorkspacesList.js";
import { CenteredLoading } from "../components/CenteredLoading.js";
import { BreadCrumb } from "../components/BreadCrumb.js";
import { Layout } from "../components/Layout.js";

export const WorkspaceDetail = () => {
    const { workspaceId } = useParams();

    const { workspaces, loading } = useWorkspaces(workspaceId);

    const [workspace] = workspaces;

    const hasChildren = workspace?.children.length > 0;

    return (
        <Layout>
            <BreadCrumb />
            {loading ? (
                <CenteredLoading />
            ) : workspace ? (
                <Card>
                    <CardHeader>
                        <Heading size="md">{workspace.name}</Heading>
                    </CardHeader>
                    <CardBody>
                        {hasChildren ? (
                            <WorkspacesList workspaces={workspace.children} />
                        ) : (
                            <p>Workspace has no connected workspaces.</p>
                        )}
                    </CardBody>
                </Card>
            ) : (
                <Text color="red" p={8}>
                    Workspace not found
                </Text>
            )}
        </Layout>
    );
};
