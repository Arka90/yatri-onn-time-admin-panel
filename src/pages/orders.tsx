import DeleteAction from "@/components/actions/deleteAction";
import EditAction from "@/components/actions/editAction";
import EditSubscriptionForm from "@/components/forms/editSubscriptionForm";
import SubscriptionForm from "@/components/forms/subscriptionForm";
import useApi from "@/hooks/userApi";
import BasicLayout from "@/layout/basicLayout";
import deleteSubcriptionById from "@/lib/subscriptions/deleteSubscription";
import getAllSubscriptions from "@/lib/subscriptions/getAllSubscriptions";
import useStore from "@/store";
import { TSubcription } from "@/types/subcriptions";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";

type SubcriptionsProps = {};

const initialSubState: TSubcription = {
  _id: "",
  title: "",
  validity: 0,
  price: 0,
  compare_price: 0,
  no_of_reminder: 0,
  status: false,
};

const Order: FC<SubcriptionsProps> = () => {
  const [rowId, setRowId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showItems, setShowItems] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [subscription, setSubcription] =
    useState<TSubcription>(initialSubState);
  const api = useApi();
  const store = useStore();

  function openForm() {
    setIsOpen(true);
  }

  function closeForm() {
    setIsOpen(false);
  }
  function handleStoreItems() {
    setShowItems(true);
  }
  function handleEditItems() {
    setShowItems(false);
  }

  async function fetchAllSubcriptions() {
    api.startLoading();
    try {
      const allSubscriptions = await getAllSubscriptions();
      store.actions.setSubcriptions(allSubscriptions);
      api.setSuccess();
    } catch (error) {
      const { response } = error as any;
      console.log(error);
      api.setError();
      api.setResponseMessage(response?.data?.message);
      store.actions.resetSubcriptions();
    } finally {
      api.stopLoading();
    }
  }

  useEffect(() => {
    fetchAllSubcriptions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // columns
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "title",
        headerName: "Title",
        width: 150,
      },
      {
        field: "validity",
        headerName: "Validity",
        width: 110,
      },
      {
        field: "price",
        headerName: "Price",
        width: 120,
      },
      {
        field: "compare_price",
        headerName: "Compare Price",
        width: 120,
      },
      {
        field: "no_of_reminder",
        headerName: "No Of Reminder",
        width: 130,
      },
      {
        field: "status",
        headerName: "Status",
        type: "boolean",
        width: 110,
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
              <EditAction
                {...{
                  params,
                  rowId,
                  setRowId,
                  setSubcription,
                  handelShowForm: setShowForm,
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

  const rows = store.subscrptionManagement.subscriptions;
  return (
    <BasicLayout>
      <>
        <div className=" font-semibold text-4xl text-slate-800 mb-4">
          Manage orders
        </div>
        <div className="col-span-2 card h-fit">
          <div className="">
            <h3 className="font-medium text-slate-800 text-2xl"></h3>
            <div className="flex items-center justify-around"></div>
          </div>
        </div>
      </>
    </BasicLayout>
  );
};

export default Order;
