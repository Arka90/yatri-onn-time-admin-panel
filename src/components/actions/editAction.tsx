import { Dispatch, FC, SetStateAction, useState } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { green } from "@mui/material/colors";
import sleep from "@/lib/utils/sleep";
import useStore from "@/store";
import { TSubcription } from "@/types/subcriptions";

type EditActionProps = {
  params: GridRenderCellParams;
  rowId: string;
  setRowId: Dispatch<SetStateAction<string>>;
  handelShowForm: (state: boolean) => void;
  setSubcription: (subscription: TSubcription) => void;
};

const EditAction: FC<EditActionProps> = ({
  params,
  rowId,
  setRowId,
  setSubcription,
  handelShowForm,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const store = useStore();
  const rows = store.subscrptionManagement.subscriptions;
  const handleSubmit = async () => {
    try {
      //   setLoading(true);
      //   await action(params.row._id);
      //   setSuccess(true);
      //   storeAction(params.row._id);
      //   setRowId("");
      //   setLoading(false);
      //   await sleep(5);
      //   setSuccess(false);
      const subToEdit: TSubcription = rows.filter(
        (row) => row._id === params.row._id
      )[0];
      setSubcription(subToEdit);
      handelShowForm(true);
    } catch (error) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        m: 1,
        mt: 1.5,
        position: "relative",
      }}
    >
      {success ? (
        <button className="p-1 ">
          <CheckCircleIcon className="w-7 h-7 text-emerald-500 hover:text-emerald-600" />
        </button>
      ) : (
        <button onClick={handleSubmit}>
          <PencilIcon
            className={`w-7 h-7 ${`text-slate-500 hover:text-slate-600`}`}
          />
        </button>
      )}
      {loading && (
        <CircularProgress
          size={45}
          sx={{
            color: green[400],
            position: "absolute",
            top: -8,
            left: -8,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default EditAction;
