import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { boardService } from "../services/board.service.local";
import { TaskPreview } from "./TaskPreview";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export function TaskList({handleDrag, tasks, labels, members, isLabelsShown, setIsLabelsShown, groupId }) {
    const { boardId } = useParams();

    if (!tasks) return <div>Loading...</div>;

   

    return (
        // <DragDropContext handleDrag={handleDrag}>
        <>
     
            <Droppable droppableId={groupId}
                    key="tasks"
                    type="tasks"
                >
                {(provided) => (
                    <section className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => {
                            const taskLabels = boardService.getLabels(task.labelIds, labels) || null;
                            const taskMembers = boardService.getMembers(task.memberIds, members) || null;
                            const taskChecklist = task.checklists.length ? boardService.getCheckListStatus(task.checklists) : '';

                            return (
                                <Draggable 
                                    key={task.id}
                                    group={groupId}
                                    type={task}
                                    draggableId={task.id}
                                    index={index}
                                    >
                                    {(provided) => (
                                        <div 
                                            key={task.id}
                                            ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps}
                                        >
                                            <Link to={`${groupId}/${task.id}`}>
                                                <TaskPreview
                                                    setIsLabelsShown={setIsLabelsShown}
                                                    isLabelsShown={isLabelsShown}
                                                    task={task}
                                                    taskLabels={taskLabels}
                                                    taskMembers={taskMembers}
                                                    taskChecklist={taskChecklist}
                                                />
                                            </Link>
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </section>
                )}
            </Droppable>
        {/* </DragDropContext> */}
        </>
    );
}
