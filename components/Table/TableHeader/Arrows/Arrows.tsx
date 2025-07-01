import { ArrowUpward, ArrowDownward, ArrowBack } from "@mui/icons-material";
import { TableHeaderProps } from "../TableHeader";
interface IArrowsProp<TData extends object, TValue> extends TableHeaderProps<TData, TValue> {
    direction: 'asc' | 'desc' | false;
}

function Arrows<TData extends object, TValue>({
    header,
    direction
}: IArrowsProp<TData, TValue>) {
    return (
        <button
            className="flex flex-col"
            onClick={header.column.getToggleSortingHandler()}
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
        </button>
    )
}

export default Arrows