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
        schemas: {
            Tokens: {
                type: "object",
                properties: {
                    accessToken: {
                        type: "string",
                    },
                    refreshToken: {
                        type: "string",
                    },
                },
            },
            Order: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                    },
                    name: {
                        type: "string",
                        nullable: true,
                    },
                    surname: {
                        type: "string",
                        nullable: true,
                    },
                    email: {
                        type: "string",
                        format: "email",
                        nullable: true,
                    },
                    phone: {
                        type: "string",
                        nullable: true,
                    },
                    age: {
                        type: "integer",
                        nullable: true,
                    },
                    course: {
                        allOf: [
                            {
                                $ref: "#/components/schemas/Course",
                            },
                        ],
                        nullable: true,
                    },
                    courseFormat: {
                        allOf: [
                            {
                                $ref: "#/components/schemas/CourseFormat",
                            },
                        ],
                        nullable: true,
                    },
                    courseType: {
                        allOf: [
                            {
                                $ref: "#/components/schemas/CourseType",
                            },
                        ],
                        nullable: true,
                    },
                    orderStatus: {
                        allOf: [
                            {
                                $ref: "#/components/schemas/OrderStatus",
                            },
                        ],
                        nullable: true,
                    },
                    sum: {
                        type: "number",
                        nullable: true,
                    },
                    alreadyPaid: {
                        type: "number",
                        nullable: true,
                    },
                    group: {
                        allOf: [
                            {
                                $ref: "#/components/schemas/Group",
                            },
                        ],
                        nullable: true,
                    },
                    msg: {
                        type: "string",
                        nullable: true,
                    },
                    utm: {
                        type: "string",
                        nullable: true,
                    },
                    manager: {
                        allOf: [
                            {
                                $ref: "#/components/schemas/OrderManager",
                            },
                        ],
                        nullable: true,
                    },
                    comments: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Comment",
                        },
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                    },
                },
            },
            OrdersListResponse: {
                type: "object",
                properties: {
                    totalItems: {
                        type: "integer",
                    },
                    totalPages: {
                        type: "integer",
                    },
                    prevPage: {
                        type: "boolean",
                    },
                    nextPage: {
                        type: "boolean",
                    },
                    data: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Order",
                        },
                    },
                },
            },
            OrderManager: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                        format: "email",
                    },
                    name: {
                        type: "string",
                    },
                    surname: {
                        type: "string",
                    },
                },
            },
            CommentManager: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                        description: "Comment manager ID",
                    },
                    name: {
                        type: "string",
                        description: "Comment manager name",
                    },
                    surname: {
                        type: "string",
                        description: "Comment manager surname",
                    },
                },
            },
            Group: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                        description: "Group ID",
                    },
                    name: {
                        type: "string",
                        description: "Group name",
                    },
                },
            },
            Comment: {
                type: "object",
                properties: {
                    text: {
                        type: "string",
                        description: "Comment text",
                    },
                    manager: {
                        $ref: "#/components/schemas/CommentManager",
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        description: "Comment creation date",
                    },
                },
            },
            Course: {
                type: "string",
                enum: ["FS", "QACX", "JCX", "JSCX", "FE", "PCX"],
            },
            CourseFormat: {
                type: "string",
                enum: ["static", "online"],
            },
            CourseType: {
                type: "string",
                enum: ["pro", "minimal", "premium", "incubator", "vip"],
            },
            OrderStatus: {
                type: "string",
                enum: ["In work", "New", "Agree", "Disagree", "Dubbing"],
            },
        },
        parameters: {
            OrderName: {
                name: "name",
                in: "query",
                required: false,
                schema: {
                    type: "string",
                },
            },
            OrderSurname: {
                name: "surname",
                in: "query",
                required: false,
                schema: {
                    type: "string",
                },
            },
            OrderEmail: {
                name: "email",
                in: "query",
                required: false,
                schema: {
                    type: "string",
                    format: "email",
                },
            },
            OrderPhone: {
                name: "phone",
                in: "query",
                required: false,
                schema: {
                    type: "string",
                },
            },
            OrderAge: {
                name: "age",
                in: "query",
                required: false,
                schema: {
                    type: "integer",
                },
            },
            OrderCourse: {
                name: "course",
                in: "query",
                required: false,
                schema: {
                    $ref: "#/components/schemas/Course",
                },
            },
            OrderCourseFormat: {
                name: "courseFormat",
                in: "query",
                required: false,
                schema: {
                    $ref: "#/components/schemas/CourseFormat",
                },
            },
            OrderCourseType: {
                name: "courseType",
                in: "query",
                required: false,
                schema: {
                    $ref: "#/components/schemas/CourseType",
                },
            },
            OrderStatus: {
                name: "orderStatus",
                in: "query",
                required: false,
                schema: {
                    $ref: "#/components/schemas/OrderStatus",
                },
            },
            OrderGroupId: {
                name: "groupId",
                in: "query",
                required: false,
                schema: {
                    type: "string",
                },
            },
            MyOrders: {
                name: "myOrders",
                in: "query",
                required: false,
                schema: {
                    type: "boolean",
                },
            },
            OrderDateFrom: {
                name: "dateFrom",
                in: "query",
                required: false,
                description: "Filter orders created from this date",
                schema: {
                    type: "string",
                    format: "date-time",
                },
            },
            OrderDateTo: {
                name: "dateTo",
                in: "query",
                required: false,
                description: "Filter orders created until this date",
                schema: {
                    type: "string",
                    format: "date-time",
                },
            },
            OrderSort: {
                name: "order",
                in: "query",
                required: false,
                description: "Sort orders",
                schema: {
                    type: "string",
                    enum: [
                        "_id",
                        "name",
                        "surname",
                        "email",
                        "phone",
                        "age",
                        "course",
                        "courseFormat",
                        "courseType",
                        "orderStatus",
                        "sum",
                        "alreadyPaid",
                        "group",
                        "createdAt",
                        "manager",
                    ],
                },
            },
            Page: {
                name: "page",
                in: "query",
                required: false,
                schema: {
                    type: "integer",
                    minimum: 1,
                    default: 1,
                },
            },
            PageSize: {
                name: "pageSize",
                in: "query",
                required: false,
                schema: {
                    type: "integer",
                    minimum: 1,
                    default: 25,
                },
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
                                    required: [
                                        "_id",
                                        "email",
                                        "name",
                                        "surname",
                                        "lastLogin",
                                        "role",
                                        "createdAt",
                                        "updatedAt",
                                    ],
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                _id: {
                                                    type: "string",
                                                    description:
                                                        "MongoDB user ID",
                                                },
                                                email: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                lastLogin: {
                                                    type: "string",
                                                    format: "date-time",
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
                                                createdAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                },
                                                updatedAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                },
                                            },
                                        },
                                        tokens: {
                                            $ref: "#/components/schemas/Tokens",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Request body is invalid",
                    },
                    401: {
                        description: "Email or password invalid",
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
                                    $ref: "#/components/schemas/Tokens",
                                },
                            },
                        },
                    },
                    401: {
                        description:
                            "Refresh token is not provided or is invalid/expired",
                    },
                    403: {
                        description:
                            "Refresh token is valid but does not exist in the database",
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
                        description:
                            "Refresh token is not provided or is invalid/expired",
                    },
                    403: {
                        description:
                            "Refresh token is valid but does not exist in the database",
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
                        description: "Password successfully created /changed",
                    },
                    400: {
                        description:
                            "Request body is invalid or new password is equal to the previous one",
                    },
                    401: {
                        description:
                            "Action token is not provided or is invalid/expired",
                    },
                    403: {
                        description: "Account is banned",
                    },
                    404: {
                        description: "User not found",
                    },
                },
            },
        },
        "/admin/managers": {
            get: {
                tags: ["Admin"],
                summary: "Get managers list",
                description: "Allowed only for role 'admin'",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "order",
                        in: "query",
                        required: false,
                        description: "Sort managers list",
                        schema: {
                            type: "string",
                            enum: ["name", "createdAt"],
                        },
                    },
                    {
                        $ref: "#/components/parameters/Page",
                    },
                    {
                        $ref: "#/components/parameters/PageSize",
                    },
                ],
                responses: {
                    200: {
                        description: "Managers successfully retrieved",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totalItems: {
                                            type: "integer",
                                        },
                                        totalPages: {
                                            type: "integer",
                                        },
                                        prevPage: {
                                            type: "boolean",
                                        },
                                        nextPage: {
                                            type: "boolean",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: {
                                                        type: "string",
                                                        description:
                                                            "Manager ID",
                                                    },
                                                    email: {
                                                        type: "string",
                                                        format: "email",
                                                    },
                                                    name: {
                                                        type: "string",
                                                    },
                                                    surname: {
                                                        type: "string",
                                                    },
                                                    role: {
                                                        type: "string",
                                                        enum: ["manager"],
                                                    },
                                                    status: {
                                                        type: "string",
                                                        enum: [
                                                            "new",
                                                            "active",
                                                            "banned",
                                                        ],
                                                    },
                                                    lastLogin: {
                                                        type: "string",
                                                        format: "date-time",
                                                        nullable: true,
                                                    },
                                                    createdAt: {
                                                        type: "string",
                                                        format: "date-time",
                                                    },
                                                    updatedAt: {
                                                        type: "string",
                                                        format: "date-time",
                                                    },
                                                    statistics: {
                                                        type: "object",
                                                        properties: {
                                                            total: {
                                                                type: "integer",
                                                            },
                                                            inWork: {
                                                                type: "integer",
                                                            },
                                                            agree: {
                                                                type: "integer",
                                                            },
                                                            disagree: {
                                                                type: "integer",
                                                            },
                                                            dubbing: {
                                                                type: "integer",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Request query is invalid",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Access denied. Admin role required",
                    },
                    500: {
                        description:
                            "Manager status is missing in the database",
                    },
                },
            },
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
                responses: {
                    201: {
                        description: "Manager successfully created",
                    },
                    400: {
                        description: "Request body is invalid",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Access denied. Admin role required",
                    },
                    409: {
                        description: "A user with this email already exists",
                    },
                },
            },
        },
        "/admin/managers/{id}/ban": {
            post: {
                tags: ["Admin"],
                summary: "Ban manager",
                description: "Allowed only for role admin",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Manager ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    204: {
                        description: "Manager successfully banned",
                    },
                    400: {
                        description:
                            "Invalid user id, user is not a manager or this manager already banned",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Access denied. Admin role required",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Manager status is missing",
                    },
                },
            },
        },
        "/admin/managers/{id}/unban": {
            post: {
                tags: ["Admin"],
                summary: "Unban manager",
                description: "Allowed only for role admin",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Manager ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    204: {
                        description: "Manager successfully unbanned",
                    },
                    400: {
                        description:
                            "Invalid user id, user is not a manager or this manager already unbanned",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Access denied. Admin role required",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Manager status is missing",
                    },
                },
            },
        },
        "/admin/managers/{id}/activate-request": {
            post: {
                tags: ["Admin"],
                summary: "Request for an activation link",
                description: "Allowed only for role admin",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Manager ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Activation token successfully generated",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                    description: "Activation action token",
                                },
                            },
                        },
                    },
                    400: {
                        description: "Invalid user ID or user is not a manager",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "Access denied. Admin role required",
                    },
                    404: {
                        description: "User not found",
                    },
                    500: {
                        description: "Manager status is missing",
                    },
                },
            },
        },
        "/admin/statistics/orders": {
            get: {
                tags: ["Admin"],
                summary: "Get orders statistics",
                description: "Allowed only for role admin",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: "Orders statistics successfully retrieved",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        total: {
                                            type: "integer",
                                            description:
                                                "Total number of orders",
                                        },
                                        inWork: {
                                            type: "integer",
                                            description:
                                                "Number of orders currently in work",
                                        },
                                        agree: {
                                            type: "integer",
                                            description:
                                                "Number of orders with agree status",
                                        },
                                        disagree: {
                                            type: "integer",
                                            description:
                                                "Number of orders with disagree status",
                                        },
                                        new: {
                                            type: "integer",
                                            description:
                                                "Number of orders with new status",
                                        },
                                        noStatus: {
                                            type: "integer",
                                            description:
                                                "Number of orders without a status (status null)",
                                        },
                                        dubbing: {
                                            type: "integer",
                                            description:
                                                "Number of orders with dubbing status",
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
                        description: "Access denied. Admin role required",
                    },
                },
            },
        },
        "/groups": {
            get: {
                tags: ["Groups"],
                summary: "Get orders groups",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: "Groups successfully retrieved",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Group",
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: "Unauthorized",
                    },
                },
            },
            post: {
                tags: ["Groups"],
                summary: "Create new orders group",
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
                                required: ["name"],
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "Group name",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Group successfully created",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Group",
                                },
                            },
                        },
                    },
                    400: {
                        description: "Request body is invalid",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    409: {
                        description: "Group already exists",
                    },
                },
            },
        },
        "/orders": {
            get: {
                tags: ["Orders"],
                summary: "Get orders",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        $ref: "#/components/parameters/OrderName",
                    },
                    {
                        $ref: "#/components/parameters/OrderSurname",
                    },
                    {
                        $ref: "#/components/parameters/OrderEmail",
                    },
                    {
                        $ref: "#/components/parameters/OrderPhone",
                    },
                    {
                        $ref: "#/components/parameters/OrderAge",
                    },
                    {
                        $ref: "#/components/parameters/OrderCourse",
                    },
                    {
                        $ref: "#/components/parameters/OrderCourseFormat",
                    },
                    {
                        $ref: "#/components/parameters/OrderCourseType",
                    },
                    {
                        $ref: "#/components/parameters/OrderStatus",
                    },
                    {
                        $ref: "#/components/parameters/OrderGroupId",
                    },
                    {
                        $ref: "#/components/parameters/MyOrders",
                    },
                    {
                        $ref: "#/components/parameters/OrderDateFrom",
                    },
                    {
                        $ref: "#/components/parameters/OrderDateTo",
                    },
                    {
                        $ref: "#/components/parameters/OrderSort",
                    },
                    {
                        $ref: "#/components/parameters/Page",
                    },
                    {
                        $ref: "#/components/parameters/PageSize",
                    },
                ],
                responses: {
                    200: {
                        description: "Orders successfully retrieved",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/OrdersListResponse",
                                },
                            },
                        },
                    },
                    400: {
                        description: "Request query is invalid",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                },
            },
        },
        "/orders/export": {
            get: {
                tags: ["Orders"],
                summary: "Export orders to Excel",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        $ref: "#/components/parameters/OrderName",
                    },
                    {
                        $ref: "#/components/parameters/OrderSurname",
                    },
                    {
                        $ref: "#/components/parameters/OrderEmail",
                    },
                    {
                        $ref: "#/components/parameters/OrderPhone",
                    },
                    {
                        $ref: "#/components/parameters/OrderAge",
                    },
                    {
                        $ref: "#/components/parameters/OrderCourse",
                    },
                    {
                        $ref: "#/components/parameters/OrderCourseFormat",
                    },
                    {
                        $ref: "#/components/parameters/OrderCourseType",
                    },
                    {
                        $ref: "#/components/parameters/OrderStatus",
                    },
                    {
                        $ref: "#/components/parameters/OrderGroupId",
                    },
                    {
                        $ref: "#/components/parameters/MyOrders",
                    },
                    {
                        $ref: "#/components/parameters/OrderDateFrom",
                    },
                    {
                        $ref: "#/components/parameters/OrderDateTo",
                    },
                    {
                        $ref: "#/components/parameters/OrderSort",
                    },
                ],
                responses: {
                    200: {
                        description: "Orders successfully exported to Excel",
                        content: {
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                {
                                    schema: {
                                        type: "string",
                                        format: "binary",
                                    },
                                },
                        },
                    },
                    400: {
                        description: "Request query is invalid",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                },
            },
        },
        "/orders/{id}": {
            patch: {
                tags: ["Orders"],
                summary: "Edit order",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Order ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    groupId: {
                                        type: "string",
                                        nullable: true,
                                        description: "Order group ID",
                                    },
                                    managerId: {
                                        type: "string",
                                        nullable: true,
                                        description: "Manager ID",
                                    },
                                    orderStatus: {
                                        type: "string",
                                        enum: [
                                            "In work",
                                            "New",
                                            "Agree",
                                            "Disagree",
                                            "Dubbing",
                                        ],
                                        nullable: true,
                                    },
                                    name: {
                                        type: "string",
                                        nullable: true,
                                    },
                                    surname: {
                                        type: "string",
                                        nullable: true,
                                    },
                                    email: {
                                        type: "string",
                                        format: "email",
                                        nullable: true,
                                    },
                                    phone: {
                                        type: "string",
                                        nullable: true,
                                    },
                                    age: {
                                        type: "integer",
                                        nullable: true,
                                    },
                                    sum: {
                                        type: "number",
                                        nullable: true,
                                    },
                                    alreadyPaid: {
                                        type: "number",
                                        nullable: true,
                                    },
                                    course: {
                                        type: "string",
                                        enum: [
                                            "FS",
                                            "QACX",
                                            "JCX",
                                            "JSCX",
                                            "FE",
                                            "PCX",
                                        ],
                                        nullable: true,
                                    },
                                    courseFormat: {
                                        type: "string",
                                        enum: ["static", "online"],
                                        nullable: true,
                                    },
                                    courseType: {
                                        type: "string",
                                        enum: [
                                            "pro",
                                            "minimal",
                                            "premium",
                                            "incubator",
                                            "vip",
                                        ],
                                        nullable: true,
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Order successfully updated",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Order",
                                },
                            },
                        },
                    },
                    400: {
                        description: "Invalid user ID or request body",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "You cannot edit this order",
                    },
                    404: {
                        description: "Order not found",
                    },
                },
            },
        },
        "/orders/{id}/comments": {
            post: {
                tags: ["Orders"],
                summary: "Create comment to order",
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "Order ID",
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["text"],
                                properties: {
                                    text: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Comment created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Comment",
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Invalid user id or request body",
                    },
                    401: {
                        description: "Unauthorized",
                    },
                    403: {
                        description: "You cannot edit this order",
                    },
                    404: {
                        description: "Order not found",
                    },
                },
            },
        },
    },
};

export { swaggerDocument, swaggerUI };
