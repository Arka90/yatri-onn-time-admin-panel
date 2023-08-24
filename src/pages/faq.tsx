import DeleteAction from "@/components/actions/deleteAction";
import UpdateAction from "@/components/actions/updateAction";
import useApi from "@/hooks/userApi";
import BasicLayout from "@/layout/basicLayout";
import deleteFaqsById from "@/lib/faq/deleteFaqsById";
import getAllFaqs from "@/lib/faq/getAllFaqs";
import updateFaqsById from "@/lib/faq/updateFaqsById";
import useStore from "@/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useEffect, useMemo, useState } from "react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import FaqForm from "@/components/forms/faqForm";

type FaqProps = {};

const Faq: FC<FaqProps> = () => {
    const [rowId, setRowId] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const api = useApi();
    const store = useStore();

    function openForm() {
        setIsOpen(true);
    }

    function closeForm() {
        setIsOpen(false);
    }

    async function fetchAllFaqs() {
        api.startLoading();
        try {
            const allFaqs = await getAllFaqs();
            store.actions.setFaqs(allFaqs);
            api.setSuccess();
        } catch (error) {
            const { response } = error as any;
            console.log(error);
            api.setError();
            api.setResponseMessage(response?.data?.message);
        } finally {
            api.stopLoading();
        }
    }
    useEffect(() => {
        fetchAllFaqs();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // columns
    const columns: GridColDef[] = useMemo(
        () => [
            { field: "_id", headerName: "ID", width: 90 },
            {
                field: "subject",
                headerName: "Subject",
                width: 250,
                editable: true,
            },
            {
                field: "body",
                headerName: "Description",
                width: 400,
                editable: true,
            },
            {
                field: "isActive",
                headerName: "Active",
                type: "boolean",
                width: 150,
                editable: true,
            },
            {
                field: "actions",
                headerName: "Actions",
                width: 120,
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
                                    action: updateFaqsById,
                                }}
                            />

                            <DeleteAction
                                {...{
                                    params,
                                    rowId,
                                    setRowId,
                                    action: deleteFaqsById,
                                    storeAction: store.actions.deleteFaqsById,
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

    const rows = store.faqManagement.faqs;

    return (
        <BasicLayout>
            {/* add new faq */}
            <div
                aria-label="add a faq"
                className="py-4 mb-4 space-y-4 max-w-2xl"
            >
                <h2 className="">Frequently asked questions</h2>
                <p className="heavy-p">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia facere, quasi soluta sed quisquam suscipit
                    necessitatibus impedit.
                </p>
                {/* add button */}
                <button
                    onClick={openForm}
                    className="btn text-white bg-slate-800 hover:bg-slate-700"
                >
                    Add a new FAQ
                </button>
                {/* popup form */}
                <Dialog open={isOpen} onClose={closeForm}>
                    <div className="bg-slate-800 text-white ">
                        <DialogTitle>
                            <h2 className="text-white">Add new FAQ</h2>
                        </DialogTitle>
                        <DialogContent className="">
                            <FaqForm handleClose={closeForm} />
                        </DialogContent>
                    </div>
                </Dialog>
            </div>
            {/* faq management grid */}
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

export default Faq;
