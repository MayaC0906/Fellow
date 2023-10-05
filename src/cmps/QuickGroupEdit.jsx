export function QuickGroupEdit({groupId,onRemoveGroup,setToggleGroupMenu }){
    return (
        <section className="group-edit-modal">
                <header>
                    <h1>List action</h1>
                    <button onClick={() => setToggleGroupMenu(false)} className="close-btn">X</button>
                </header>
                <li onClick={() => onRemoveGroup(groupId)}>Delete</li>
                <li>Add card...</li>
                {/* <span>Copy list...</span>
                <span>Move list...</span>
                <span>Watch</span> */}
            </section>
        )
}