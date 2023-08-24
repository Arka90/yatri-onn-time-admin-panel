import UpdateAction from "@/components/actions/updateAction";
import BasicLayout from "@/layout/basicLayout";
import getAllReminders from "@/lib/reminders/getAllReminders";
import updateRemindersById from "@/lib/reminders/updateRemindersById";
import useStore from "@/store";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";

type RemindersProps = {};

const Reminders: FC<RemindersProps> = () => {
    const [rowId, setRowId] = useState<string>("");
    const store = useStore();

    async function fetchReminders() {
        store.actions.startLoading();
        try {
            const reminders = await getAllReminders();
            store.actions.setReminders(reminders);
        } catch (error) {
            const { response } = error as any;
            console.log(response.data.message);
        } finally {
            store.actions.stopLoading();
        }
    }

    useEffect(() => {
        fetchReminders();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // columns
    const columns: GridColDef[] = useMemo(
        () => [
            { field: "_id", headerName: "ID", width: 90 },
            {
                field: "name",
                headerName: "Name",
                width: 150,
            },
            {
                field: "title",
                headerName: "Title",
                width: 150,
                editable: true,
            },
            {
                field: "message",
                headerName: "Message",
                width: 150,
                editable: true,
            },
            {
                field: "category",
                headerName: "Travel Medium",
                type: "singleSelect",
                valueOptions: ["train", "bus", "flight", "others"],
                width: 150,
                editable: true,
            },
            {
                field: "source",
                headerName: "Source",
                width: 100,
            },
            {
                field: "destination",
                headerName: "Destination",
                width: 110,
            },
            {
                field: "number",
                headerName: "Number",
                width: 150,
                editable: true,
            },
            {
                field: "status",
                headerName: "Status",
                type: "boolean",
                width: 110,
                editable: true,
            },
            {
                field: "phone",
                headerName: "Phone",
                width: 150,
            },
            {
                field: "call_time",
                headerName: "Call Time",
                renderCell: (params) =>
                    moment(params.row.call_time).format("DD/MM/YYYY (hh:mm)"),
                width: 200,
            },
            {
                field: "actions",
                headerName: "Actions",
                type: "actions",
                renderCell: (params) => (
                    <UpdateAction
                        {...{
                            params,
                            rowId,
                            setRowId,
                            action: updateRemindersById,
                        }}
                    />
                ),
            },
        ],
        [rowId]
    );

    // rows
    const rows = store.reminderManagement.reminders;

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

export default Reminders;
