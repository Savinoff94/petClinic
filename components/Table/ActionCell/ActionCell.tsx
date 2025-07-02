import { Edit } from "@mui/icons-material"

interface IActionCell {
    onClickHandle: () => void
}



export function ActionCell({onClickHandle} : IActionCell) {
    return (
        <button
            onClick={() => onClickHandle()}
            className="hover:bg-slate-200 ease-in transition duration-300 p-1 rounded"
        >
            <Edit fontSize="small"/>
        </button>
    )
} 