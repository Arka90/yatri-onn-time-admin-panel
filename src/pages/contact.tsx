import DeleteAction from "@/components/actions/deleteAction";
import UpdateAction from "@/components/actions/updateAction";
import useApi from "@/hooks/userApi";
import BasicLayout from "@/layout/basicLayout";
import deleteContactById from "@/lib/contact/deleteContactById";
import getAllContacts from "@/lib/contact/getAllContacts";
import updateContactById from "@/lib/contact/updateContactById";
import useStore from "@/store";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";

type ContactProps = {};

const Contact: FC<ContactProps> = () => {
    const [rowId, setRowId] = useState<string>("");
    const api = useApi();
    const store = useStore();

    async function fetchAllContacts() {
        api.startLoading();
        try {
            const allContacts = await getAllContacts();
            store.actions.setContacts(allContacts);
            api.setSuccess();
        } catch (error) {
            const { response } = error as any;
            console.log(error);
            api.setError();
            api.setResponseMessage(response?.data?.message);
            store.actions.resetContacts();
        } finally {
            api.stopLoading();
        }
    }

    useEffect(() => {
        fetchAllContacts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // columns
    const columns: GridColDef[] = useMemo(
        () => [
            { field: "_id", headerName: "ID", width: 90 },
            {
                field: "date",
                headerName: "Date",
                width: 250,
                renderCell: (params) =>
                    moment(params.row.registered_at).format(
                        "DD/MM/YYYY (hh:mm)"
                    ),
            },
            {
                field: "email_or_phone",
                headerName: "Email or Phone",
                width: 250,
                editable: true,
            },
            {
                field: "message",
                headerName: "Message",
                width: 250,
                editable: true,
            },
            {
                field: "status",
                headerName: "Status",
                type: "boolean",
                width: 150,
                editable: true,
            },
            {
                field: "actions",
                headerName: "Actions",
                width: 250,
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                renderCell: (params) => {
                    return (
                        <>
                            <UpdateAction
                                {...{
                                    params,
                                    rowId,
                                    setRowId,
                                    action: updateContactById,
                                }}
                            />

                            <DeleteAction
                                {...{
                                    params,
                                    rowId,
                                    setRowId,
                                    action: deleteContactById,
                                    storeAction:
                                        store.actions.deleteContactById,
                                }}
                            />
                        </>
                    );
                },
            },
        ],

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rowId]
    );

    const rows = store.contactManagement.contacts;
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

export default Contact;
