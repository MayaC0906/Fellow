import { useState } from 'react'
import {TaskList} from './TaskList'

export function GroupPreview({group}){
    
    return (
        <div className="group-preview">
			<header className='group-preview-header'>			
				<form>
					<textarea
						name="title"
						className="edit-group-title"
						id={group.id}
						defaultValue={group.title}
						// onChange={} TODO
					></textarea>
				</form>
				<img src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696437012/asset_14_gltqff.svg" alt="" />
			</header>
			<section className='task-list-container'>
				<TaskList labels={group.labels} memebers={group.memebers} tasks={group.tasks}/>
			</section>
			<input type="text" defaultValue='+ Add a card'/>
        </div>
    )
}


