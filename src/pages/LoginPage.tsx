import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useBackendStore } from "../store/useBackendStore.js";
import { AppRoutes } from "../constants/constants.js";
import { FilledButton } from "../components/FilledButton.js";

interface IFormInput {
    domain: string;
    token: string;
}

export const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            domain: "",
            token: process.env.TIGER_API_TOKEN ?? "",
        },
    });
    const { setBackend } = useBackendStore();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        setBackend(data.domain, data.token);
        navigate(AppRoutes.Workspaces);
    };

    return (
        <Box w="100%" h="100%" backgroundColor="#FFF5F7">
            <Center minH="100vh">
                <Card backgroundColor={"white"} borderRadius={"8px"} width={"30rem"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={!!errors.domain}>
                            <CardHeader>
                                <Heading size="md">Organization management</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack paddingBottom={"1rem"}>
                                    <Text>
                                        <FormLabel>Domain</FormLabel>
                                    </Text>
                                    <Input
                                        {...register("domain", { required: true })}
                                        placeholder={"xyz.trial.cloud.gooddata.com"}
                                    />
                                    {!errors.domain && (
                                        <FormHelperText>Please enter your GoodData domain</FormHelperText>
                                    )}
                                    {errors.domain?.type === "required" ? (
                                        <FormErrorMessage>This is required</FormErrorMessage>
                                    ) : (
                                        <FormErrorMessage>{errors?.token?.message}</FormErrorMessage>
                                    )}
                                </Stack>
                                <Stack>
                                    <Text>
                                        <FormLabel>API Token</FormLabel>
                                    </Text>
                                    <Input
                                        {...register("token", { required: true })}
                                        placeholder={"API token"}
                                    />
                                    {errors.domain?.type === "required" ? (
                                        <FormErrorMessage>This is required</FormErrorMessage>
                                    ) : (
                                        <FormErrorMessage>{errors?.domain?.message}</FormErrorMessage>
                                    )}
                                    {!errors.token && (
                                        <FormHelperText>Please enter your API Token</FormHelperText>
                                    )}
                                    {/* TODO: Validation of the Token */}
                                </Stack>
                            </CardBody>
                            <CardFooter justifyContent="flex-end">
                                <FilledButton type="submit">Continue</FilledButton>
                            </CardFooter>
                        </FormControl>
                    </form>
                </Card>
            </Center>
        </Box>
    );
};
