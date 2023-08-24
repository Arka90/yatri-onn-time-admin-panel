import { Dispatch, FC, SetStateAction, useState } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { green } from "@mui/material/colors";
import sleep from "@/lib/utils/sleep";
import useStore from "@/store";

type DeleteActionProps = {
    params: GridRenderCellParams;
    rowId: string;
    setRowId: Dispatch<SetStateAction<string>>;
    action: (payload?: any) => unknown | Promise<unknown>;
    storeAction: (id: string) => void;
};

const DeleteAction: FC<DeleteActionProps> = ({
    params,
    rowId,
    setRowId,
    action,
    storeAction,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const store = useStore();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await action(params.row._id);
            setSuccess(true);
            storeAction(params.row._id);
            setRowId("");
            setLoading(false);
            await sleep(5);
            setSuccess(false);
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
                    <TrashIcon
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

export default DeleteAction;
