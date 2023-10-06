export function QuickGroupEdit({onDuplicateGroup,group,onRemoveGroup,setToggleGroupMenu }){
    return (
        <section className="group-edit-modal">
                <header>
                    <div>List action</div>
                    <button onClick={() => setToggleGroupMenu(false)} className="close-btn">X</button>
                </header>
                <ul className="clean-list">

                <li onClick={() => onRemoveGroup(group.id)}>Delete</li>
                <li onClick={() => onDuplicateGroup(group)}>Copy list</li>
                <li>Add card...</li>
                </ul>
                {/* <span>Copy list...</span>
                <span>Move list...</span>
                <span>Watch</span> */}
            </section>
        )
}