interface IArrowsProp {
    direction: 'asc' | 'desc' | false
}
function Arrows({direction} : IArrowsProp) {
    return (
        <div>
            {
                !direction && <><div>{'🔼'}</div><div>{'🔽'}</div></>
            }
            {
                direction === 'asc' && <><div>{'🔼'}</div></>
            }
            {
                direction === 'desc' && <><div>{'🔽'}</div></>
            }
        </div>
    )
}

export default Arrows