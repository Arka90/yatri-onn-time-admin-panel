import useApi from "@/hooks/userApi";
import BasicLayout from "@/layout/basicLayout";
import getAllTransactions from "@/lib/transaction/getAllTransactions";
import useStore from "@/store";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";

type TransactionsProps = {};

const Transactions: FC<TransactionsProps> = () => {
  const [rowId, setRowId] = useState<string>("");
  const api = useApi();
  const store = useStore();

  async function fetchAllTransactions() {
    api.startLoading();
    try {
      const allTransactions = await getAllTransactions();

      store.actions.setTransactions(allTransactions);
      api.setSuccess();
    } catch (error) {
      const { response } = error as any;
      console.log(error);
      api.setError();
      api.setResponseMessage(response?.data?.message);
      store.actions.resetTransactions();
    } finally {
      api.stopLoading();
    }
  }

  useEffect(() => {
    fetchAllTransactions();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "payment_id",
        headerName: "Payment Id",
        width: 150,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 150,
        editable: true,
      },
      {
        field: "date",
        headerName: "Date",
        width: 250,
        renderCell: (params) =>
          moment(params.row.date).format("DD/MM/YYYY (hh:mm)"),
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        editable: true,
      },
      {
        field: "remarks",
        headerName: "Remarks",
        width: 300,
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowId]
  );

  const rows = store.transactionManagement.transactions;

  return (
    <div className="col-span-full">
      <h2 className=" font-semibold text-4xl text-slate-800 mb-4">
        Recent Transactions
      </h2>
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
    </div>
  );
};

export default Transactions;
