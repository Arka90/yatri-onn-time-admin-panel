import BasicLayout from "@/layout/basicLayout";
import getAllUsers from "@/lib/users/getAllUsers";
import useStore from "@/store";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import UpdateAction from "@/components/actions/updateAction";
import updateUserById from "@/lib/users/updateUserById";

const Users: NextPage = () => {
    const store = useStore();
    const [rowId, setRowId] = useState<string>("");
    async function fetchUsers() {
        try {
            const allUsers = await getAllUsers();
            store.actions.setUsers(allUsers);
        } catch (error) {
            const { response } = error as any;
            console.log(response.data.message);
        }
    }

    useEffect(() => {
        fetchUsers();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // columns
    const columns: GridColDef[] = useMemo(
        () => [
            { field: "_id", headerName: "ID", width: 90 },
            {
                field: "image",
                headerName: "Avatar",
                width: 150,
                editable: true,
            },
            {
                field: "name",
                headerName: "Name",
                width: 150,
                editable: true,
            },
            {
                field: "verified",
                headerName: "Verified",
                type: "boolean",
                width: 100,
            },
            {
                field: "status",
                headerName: "Status",
                type: "boolean",
                width: 100,
                editable: true,
            },
            {
                field: "balance",
                headerName: "Balance",
                type: "number",
                width: 110,
            },
            {
                field: "reminder",
                headerName: "Reminders",
                type: "number",
                width: 110,
            },
            {
                field: "phone",
                headerName: "Phone",
                type: "number",
                width: 150,
            },
            {
                field: "registered_at",
                headerName: "Registation Date",
                renderCell: (params) =>
                    moment(params.row.registered_at).format(
                        "DD/MM/YYYY hh:mm:ss"
                    ),
                width: 200,
            },
            {
                field: "actions",
                headerName: "Actions",
                type: "actions",
                renderCell: (params) => (
                    <UpdateAction
                        {...{ params, rowId, setRowId, action: updateUserById }}
                    />
                ),
            },
        ],
        [rowId]
    );

    // rows
    const rows = store.userManagement.users;
    return (
        <BasicLayout>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15]}
                    disableRowSelectionOnClick
                    onCellEditStop={(params) => setRowId(params.id as string)}
                />
            </Box>
        </BasicLayout>
    );
};

export default Users;
