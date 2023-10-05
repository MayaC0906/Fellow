export function QuickGroupEdit({onDuplicateGroup,group,onRemoveGroup,setToggleGroupMenu }){
    return (
        <section className="group-edit-modal">
                <header>
                    <h1>List action</h1>
                    <button onClick={() => setToggleGroupMenu(false)} className="close-btn">X</button>
                </header>
                <li onClick={() => onRemoveGroup(group._id)}>Delete</li>
                <li onClick={() => onDuplicateGroup(group)}>Copy list</li>
                <li>Add card...</li>
                {/* <span>Copy list...</span>
                <span>Move list...</span>
                <span>Watch</span> */}
            </section>
        )
}