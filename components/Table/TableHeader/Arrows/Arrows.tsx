import { ArrowUpward, ArrowDownward, ArrowBack } from "@mui/icons-material";
import { TableHeaderProps } from "../TableHeader";
interface IArrowsProp {
    direction: 'asc' | 'desc' | false;
}

function Arrows({
    direction
}: IArrowsProp) {
    return (
        <div
            className="flex p-1 hover:bg-slate-200 ease-in transition duration-300 rounded"
        >
            {
                !direction && <><ArrowBack fontSize="small" /></>
            }
            {
                direction === 'asc' && <><ArrowUpward fontSize="small" /></>
            }
            {
                direction === 'desc' && <><ArrowDownward fontSize="small" /></>
            }
        </div>
    )
}

export default Arrows