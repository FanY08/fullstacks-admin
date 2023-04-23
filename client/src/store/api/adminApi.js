import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().global.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
                headers.set("Content-Type", "application/json");
            }

            return headers;
        },
    }),

    tagTypes: [
        "User",
        "Products",
        "Customers",
        "Transactions",
        "Geography",
        "Sales",
        "Admins",
        "Performance",
        "Dashboard",
    ],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        loginByEmailAndPwd: builder.mutation({
            query(user) {
                return {
                    url: "login/query",
                    method: "post",
                    body: { email: user.email, password: user.password },
                };
            },
            transformResponse: (response) => response.data,
            providesTags: ["User"],
        }),
        register: builder.mutation({
            query: (user) => {
                return {
                    url: "register/signin",
                    method: "post",
                    body: { ...user },
                };
            },
        }),
        getProducts: builder.query({
            query: () => {
                return `client/products`;
            },
            providesTags: ["Products"],
        }),
        getCustomers: builder.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
        getTransactions: builder.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        getGeography: builder.query({
            query: () => "client/geography",
            providesTags: ["Geography"],
        }),
        getSales: builder.query({
            query: () => "sales/sales",
            providesTags: ["Sales"],
        }),
        getAdmins: builder.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getUserPerformance: builder.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: builder.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useLoginByEmailAndPwdMutation,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
    useRegisterMutation,
} = adminApi;
