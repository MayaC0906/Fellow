import { useState,useRef } from 'react'
import { TaskList } from './TaskList'
// import { TextInputs } from './TextInputs'
import { QuickGroupEdit } from './QuickGroupEdit'
import { taskService } from '../services/task.service.local';
import Button from '@mui/joy/Button';
import { useSelector, useDispatch } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service';
import { groupPreview } from './Svgs';
import { saveNewTask } from '../store/actions/board.actions';

export function GroupPreview({ handleDrag,onEditGroup, isLabelsShown, setIsLabelsShown, group, members, labels, onRemoveGroup, onDuplicateGroup }) {
	// console.log('members from groupPreview', members);
	const [toggleGroupMenu, setToggleGroupMenu] = useState(false)
	const [isInputExpand, setInputExpand] = useState(false)
	const [newTask, setNewTask] = useState(taskService.getEmptyTask())
	const board = useSelector((storeState) => storeState.boardModule.board)
	const groupHeaderRef = useRef(null); //SPECIFIC GROUP HEADER

	function getGroupHeaderPosition() {
		if (groupHeaderRef.current) {
		  const rect = groupHeaderRef.current.getBoundingClientRect()
		  return {
			top: rect.top + window.scrollY,
			left: rect.left + window.scrollX,
		  }
		}
		return { top: 0, left: 0 }
	  }

	function handleChange(ev) {
		let { value, name: field } = ev.target
		setNewTask((prevGroup) => ({ ...prevGroup, [field]: value }))
	}


	async function onSaveNewTask(ev) {
		ev.preventDefault();
		if (!newTask.title) return;
		try {
			await saveNewTask(board._id , group.id, newTask)
			setNewTask(taskService.getEmptyTask())
			setInputExpand(!isInputExpand)
			showSuccessMsg('New task added')
		} catch (err) {
			console.log('Failed to save new group', err)
			throw err
		}
	}

	return (

		<section className="group-preview">
			<section className='header-wrapper'>
				<header className='group-preview-header'>
					<input
						name="title"
						className="edit-group-title clean-btn"
						id={group.id}
						defaultValue={group.title}
						onBlur={(event) => onEditGroup(group.id, event)}
						onKeyDown={(event) => onEditGroup(group.id, event)}
						// onChange={(event) => onEditGroup(group.id,event)}
						// onChange={} TODO
						// maxRows={1}
						// sx={{ border: 'none' }}
					></input>
					<section>
						<img onClick={() => setToggleGroupMenu(!toggleGroupMenu)} src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696437012/asset_14_gltqff.svg" alt="" />
					</section>
				</header>
			</section>
			<section className='group-edit'>
				{toggleGroupMenu &&
					<QuickGroupEdit
						group={group}
						setToggleGroupMenu={setToggleGroupMenu}
						// groupId={group.id}
						groupHeaderPosition={() => getGroupHeaderPosition()}
						setInputExpand={setInputExpand}
						onRemoveGroup={onRemoveGroup}
						onDuplicateGroup={onDuplicateGroup}
					/>}
			</section>
			<section className='task-list-container'>
				<TaskList
					isLabelsShown={isLabelsShown}
					setIsLabelsShown={setIsLabelsShown}
					members={members} labels={labels}
					tasks={group.tasks}
					groupId={group.id}
					handleDrag={handleDrag}
				/>
			</section>
			<section className='footer-wrapper'>
				<footer>
					{!isInputExpand ?
						<div className='add-group-task' onClick={() => setInputExpand(!isInputExpand)}>
							<section>
								{groupPreview.plus}
								<span>Add new card</span>
							</section>
							{groupPreview.copy}
							</div> :
						<div>
							<textarea  name="title"
								placeholder="Enter card title..."
								// autoFocus
								rows={4}
								// value={newGroup.title}
								onChange={handleChange}
							/>
							<section className='add-controls'>
								<Button type="submit" onClick={onSaveNewTask} >Add Card</Button>
								<button className='cancel clean-btn' onClick={() => setInputExpand(!isInputExpand)}>X</button>
							</section>
						</div>}
				</footer>
			</section>
		</section>
	)
}


