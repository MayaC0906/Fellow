import React, { useState, useRef, useEffect } from 'react';
import { taskService } from '../../services/task.service.local';
import Button from '@mui/joy/Button';
import { useSelector } from 'react-redux';
import { showSuccessMsg } from '../../services/event-bus.service';
import { updateBoard } from '../../store/actions/board.actions';
import { GroupMenu } from './GroupMenu';
import { TaskList } from '../Task/TaskList';
import { checkList, groupPreview } from '../Svgs';
import { taskSvg } from '../Svgs';
import { utilService } from '../../services/util.service';

export function GroupPreview({
	handleDrag,
	onEditGroup,
	isLabelsShown,
	setIsLabelsShown,
	group,
	members,
	labels,
	onRemoveGroup,
	onDuplicateGroup,
	openMenuGroupId,
	setOpenMenuGroupId,
	onUpdateGroup,
	onUpdateBoard,
	setContainerClass
}) {

	// console.log('roup:', group.tasks);

	const taskListContainerRef = useRef(null)
	const [isInputExpand, setInputExpand] = useState(false)
	const [newTask, setNewTask] = useState(taskService.getEmptyTask())
	const board = useSelector((storeState) => storeState.boardModule.board)
	const groupHeaderRef = useRef(null)
	const [groupMenuPosition, setGroupMenuPosition] = useState({ top: '', left: '' })
	const user = useSelector((storeState) => storeState.userModule.user)
	const [prevTaskCount, setPrevTaskCount] = useState(group.tasks.length)
	const inputRef = useRef(null);
	let { groups } = board

	// useEffect(() => {
	// 	if (taskListContainerRef.current && group.tasks.length > prevTaskCount) {
	// 		taskListContainerRef.current.scrollTop = taskListContainerRef.current.scrollHeight;
	// 	}
	// 	setPrevTaskCount(group.tasks.length)
	// }, [group.tasks.length])

	function toggleGroupMenu(groupId) {
		if (openMenuGroupId === groupId) {
			setOpenMenuGroupId(null)
		} else {
			setOpenMenuGroupId(groupId)
		}
	}

	function onScrollDown(event) {
		// const taskListContainer = taskListContainerRef.current;
		// const clickPosition = event.clientY;
		// const containerTop = taskListContainer.getBoundingClientRect().top;
		// const scrollToPosition = clickPosition  - containerTop - 50;

		// taskListContainer.scrollTo({
		//   top: scrollToPosition,
		//   behavior: 'smooth' 
		// });
		taskListContainerRef.current.scrollTop = taskListContainerRef.current.scrollHeight

	}


	useEffect(() => {
		if (openMenuGroupId !== null && groupHeaderRef.current) {
			getBounds();
		}
	}, [openMenuGroupId]);

	function getBounds() {
		if (groupHeaderRef.current) {
			const rect = groupHeaderRef.current.getBoundingClientRect()
			setGroupMenuPosition({
				top: rect.top + rect.height,
				left: rect.left
			})
		}
	}


	async function onSaveNewTask(ev) {
		ev.preventDefault()
		const currGroup = groups.findIndex(g => g.id === group.id)

		setInputExpand(false)
		if (!newTask.title) return
		const txt = `added ${newTask.title} to ${group.title}`
		newTask.id = utilService.makeId()
		groups[currGroup].tasks.push(newTask)
		const boardToSave = { ...board, groups: board.groups }
		console.log(boardToSave)
		try {
			await updateBoard(boardToSave, user, txt)
			setNewTask(taskService.getEmptyTask())
			setInputExpand(false)
		} catch (err) {
			console.log('failed to save new task', err)
			throw err;
		}
	}

	function handleChange(ev) {
		let { value, name: field } = ev.target
		setNewTask((prevGroup) => ({ ...prevGroup, [field]: value }))
	}

	useEffect(() => {
		if (isInputExpand && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isInputExpand]);
	return (
		<section className="group-preview">
			<section className="header-wrapper">
				<header className="group-preview-header">
					<input
						name="title"
						className="edit-group-title clean-btn"
						id={group.id}
						defaultValue={group.title}
						onBlur={(event) => onEditGroup(group.id, event)}
						// onKeyDown={(event) => onEditGroup(group.id, event)}
						style={!group.isWatch ? { width: '83%' } : {}}
					></input>
					{group.isWatch && taskSvg.watch}
					<section>

						<img
							onClick={() => toggleGroupMenu(group.id)}
							src="https://res.cloudinary.com/dpwmxprpp/image/upload/v1696437012/asset_14_gltqff.svg"
							alt=""
							ref={groupHeaderRef}
						/>
					</section>
				</header>
			</section>
			<section className="group-edit">
				{group.id === openMenuGroupId && (
					<div className="group-menu">
						<GroupMenu
							onUpdateGroup={onUpdateGroup}
							group={group}
							setToggleGroupMenu={toggleGroupMenu}
							groupMenuPosition={groupMenuPosition}
							setInputExpand={setInputExpand}
							onRemoveGroup={onRemoveGroup}
							onDuplicateGroup={onDuplicateGroup}
							openMenuGroupId={openMenuGroupId}
							setOpenMenuGroupId={setOpenMenuGroupId}
							onUpdateBoard={onUpdateBoard}
						/>
					</div>
				)}
			</section>
			<section className="task-list-container" ref={taskListContainerRef}>
				<TaskList
					setContainerClass={setContainerClass}
					onScrollDown={onScrollDown}
					isLabelsShown={isLabelsShown}
					setIsLabelsShown={setIsLabelsShown}
					members={members}
					labels={labels}
					tasks={group.tasks}
					groupId={group.id}
					handleDrag={handleDrag}
				/>
			</section>
			<section className="footer-wrapper">
				<footer>
					{!isInputExpand ? (
						<div className="add-group-task" onClick={() => setInputExpand(true)}>
							<section>
								{groupPreview.plus}
								<span>Add a card</span>
							</section>
							{groupPreview.copy}
						</div>
					) : (
						<div>
							<textarea
								ref={inputRef}
								name="title"
								placeholder="Enter a title for this card..."
								rows={4}
								onChange={handleChange}
								style={{ outline: 'none' }}
							/>
							<section className="add-controls">
								<Button type="submit" onClick={(event) => {
									onSaveNewTask(event)
									onScrollDown()
								}}>
									Add card
								</Button>
								<div className="cancel clean-btn" onClick={() => setInputExpand(false)}>
									{checkList.x}
								</div>
							</section>
						</div>
					)}
				</footer>
			</section>
		</section>
	)
}
