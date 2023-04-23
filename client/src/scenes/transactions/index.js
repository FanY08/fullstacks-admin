import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import React, { useState } from "react";
import { useGetTransactionsQuery } from "store/api/adminApi";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => {
                return params.value.length;
            },
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header
                title="TRANSACTIONS"
                subtitle="Entire list of transactions"
            />
            <Box
                height="80vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                        fontSize: "1rem",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    columns={columns}
                    loading={isLoading || !data}
                    rows={(data && data.transactions) || []}
                    getRowId={(row) => row._id}
                    rowCount={(data && data.total) || 0}
                    pageSizeOptions={[20, 50, 100]}
                    pagination
                    paginationModel={{ page: page, pageSize }}
                    paginationMode="server"
                    sortingMode="server"
                    slots={{ toolbar: DataGridCustomToolbar }}
                    slotProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                    onSortModelChange={(newSortModel) =>
                        setSort(...newSortModel)
                    }
                    onPaginationModelChange={(e) => {
                        setPage(e.page);
                        setPageSize(e.pageSize);
                    }}
                />
            </Box>
        </Box>
    );
};

export default Transactions;
