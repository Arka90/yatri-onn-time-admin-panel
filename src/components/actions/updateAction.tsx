import { Dispatch, FC, SetStateAction, useState } from "react";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import {
    CheckCircleIcon,
    DocumentArrowUpIcon,
} from "@heroicons/react/24/solid";
import { green } from "@mui/material/colors";
import sleep from "@/lib/utils/sleep";

type UpdateActionProps = {
    params: GridRenderCellParams;
    rowId: string;
    setRowId: Dispatch<SetStateAction<string>>;
    action: (payload?: any) => unknown | Promise<unknown>;
};

const UpdateAction: FC<UpdateActionProps> = ({
    params,
    rowId,
    setRowId,
    action,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const result = await action(params.row);
            setSuccess(true);
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

    const isDisable = loading || (params.id as string) !== rowId;
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
                <button disabled={isDisable} onClick={handleSubmit}>
                    <DocumentArrowUpIcon
                        className={`w-7 h-7 ${
                            !isDisable
                                ? `text-slate-500 hover:text-slate-600`
                                : `text-slate-400`
                        }`}
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

export default UpdateAction;
