import {TaskList} from './TaskList'

export function GroupPreview({group}){
    
    return (
        <div className="group-container">
            <form>
			<textarea
			    name="title"
			    className="edit-group-title"
				id={group.id}
				defaultValue={group.title}
			></textarea>
		    </form>
			<section >
				<TaskList  tasks={group.tasks}/>
			</section>
        </div>

    )
}