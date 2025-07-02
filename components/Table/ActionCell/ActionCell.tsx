import { Edit } from "@mui/icons-material"

interface IActionCell {
    onClickHandle: () => void
}



export function ActionCell({onClickHandle} : IActionCell) {
    return (
        <button
            onClick={() => onClickHandle()}
        >
            <Edit fontSize="small"/>
        </button>
    )
} 