/* eslint-disable @next/next/no-img-element */
import DeleteAction from "@/components/actions/deleteAction";
import UpdateAction from "@/components/actions/updateAction";
import AdvertisementForm from "@/components/forms/advertisementForm";
import useApi from "@/hooks/userApi";
import BasicLayout from "@/layout/basicLayout";
import deleteAdvertisementById from "@/lib/advertisements/deleteAdvertisementById";
import getAllAdvertisements from "@/lib/advertisements/getAllAdvertisements";
import updateAdvertisementById from "@/lib/advertisements/updateAdvertisementById";
import useStore from "@/store";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";

type AdvertisementProps = {};

const Advertisement: FC<AdvertisementProps> = () => {
  const server = "http://localhost:4000";
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
  async function fetchAllContacts() {
    api.startLoading();
    try {
      const allAdvertisements = await getAllAdvertisements();
      store.actions.setAdvertisements(allAdvertisements);
      api.setSuccess();
    } catch (error) {
      const { response } = error as any;
      console.log(error);
      api.setError();
      api.setResponseMessage(response?.data?.message);
      store.actions.resetAdvertisements();
    } finally {
      api.stopLoading();
    }
  }

  useEffect(() => {
    fetchAllContacts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "date",
        headerName: "Date",
        width: 250,
        renderCell: (params) =>
          moment(params.row.registered_at).format("DD/MM/YYYY (hh:mm)"),
      },
      {
        field: "title",
        headerName: "Title",
        width: 250,
        editable: true,
      },
      {
        field: "image",
        headerName: "Image",
        width: 75,
        renderCell: (params) => {
          return (
            <>
              <Image
                src={`${server}/${params.row.image}`}
                alt="alt"
                width={256}
                height={256}
                className="w-8 h-8 rounded-full object-cover object-center"
              />
            </>
          );
        },
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
                  action: updateAdvertisementById,
                }}
              />

              <DeleteAction
                {...{
                  params,
                  rowId,
                  setRowId,
                  action: deleteAdvertisementById,
                  storeAction: store.actions.deleteAdvertisemenById,
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

  const rows = store.advertisementManagement.advertisements;

  return (
    <BasicLayout>
      {/* add new faq */}
      <div aria-label="add a faq" className="py-4 mb-4 space-y-4 max-w-2xl">
        <h2 className="">Add New Advertisement</h2>
        <p className="heavy-p">
          Description should be less than or eqal to 55 characters and
          description2 should be of less than equal to 90 characters
        </p>
        {/* add button */}
        <button
          onClick={openForm}
          className="btn text-white bg-slate-800 hover:bg-slate-700"
        >
          New Advertisement
        </button>
        {/* popup form */}
        <Dialog open={isOpen} onClose={closeForm}>
          <div className="bg-slate-800 text-white ">
            <DialogTitle>
              <span className="text-white">Add new Advertisement</span>
            </DialogTitle>
            <DialogContent className="">
              <AdvertisementForm handleClose={closeForm} />
            </DialogContent>
          </div>
        </Dialog>
      </div>
      {/* advertisement grid */}
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

export default Advertisement;
