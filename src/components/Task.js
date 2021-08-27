import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Task({ task, index }) {
	return (
		<Draggable draggableId={task.id} index={index}>
			{(provider) => (
				<div className="task__item" {...provider.draggableProps} {...provider.dragHandleProps} ref={provider.innerRef}>
					{task.content}
				</div>
			)}
		</Draggable>
	);
}

export default Task;
