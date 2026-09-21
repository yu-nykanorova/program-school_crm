import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Programming school CRM API documentation",
        version: "1.0.0",
        description: "API documentation for Programming school CRM",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description:
                    "Enter your access JWT token like this - Bearer < token >",
            },
        },
    },
    tags: [
        {
            name: "Auth",
            description: "Authentication endpoints",
        },
        {
            name: "Admin",
            description: "Admin panel endpoints",
        },
        {
            name: "Orders",
            description: "Orders endpoints",
        },
        {
            name: "Groups",
            description: "Order groups endpoints",
        },
    ],
    paths: {
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "User successfully logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                lastLogin: {
                                                    type: "string",
                                                    nullable: true,
                                                },
                                                role: {
                                                    type: "string",
                                                    enum: ["admin", "manager"],
                                                },
                                                status: {
                                                    type: "string",
                                                    enum: [
                                                        "new",
                                                        "active",
                                                        "banned",
                                                    ],
                                                },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Account is not activated or banned",
                    },
                },
            },
        },
        "/auth/refresh": {
            post: {
                tags: ["Auth"],
                summary: "Refresh tokens pair",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["refreshToken"],
                                properties: {
                                    refreshToken: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Tokens successfully refreshed",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        accessToken: { type: "string" },
                                        refreshToken: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Invalid refresh token",
                    },
                },
            },
        },
        "/auth/logout": {
            post: {
                tags: ["Auth"],
                summary: "User logout",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["refreshToken"],
                                properties: {
                                    refreshToken: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    204: {
                        description: "User successfully logged out",
                    },
                    401: {
                        description: "Invalid refresh token",
                    },
                },
            },
        },
        "/auth/activate": {
            post: {
                tags: ["Auth"],
                summary: "Activate account / Set new password",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["password", "confirmPassword"],
                                properties: {
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                    confirmPassword: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    204: {
                        description: "Password successfully created (changed)",
                    },
                    400: {
                        description: "New password is equal to previous one",
                    },
                    403: {
                        description: "These manager is banned",
                    },
                },
            },
        },
        "admin/managers": {
            get: {},
            post: {
                tags: ["Admin"],
                summary: "Create new manager",
                description: "Allowed only for role 'admin'",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "name", "surname"],
                                properties: {
                                    email: { type: "string", format: "email" },
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                },
                            },
                        },
                    },
                },
                responses: {},
            },
        },
    },
};

export { swaggerDocument, swaggerUI };
