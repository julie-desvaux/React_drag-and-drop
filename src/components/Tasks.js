import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import initialData from "../config/data";
import Column from "./Column";

export default function Tasks() {
	const [data, setData] = useState(initialData);

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (!destination) return;

		// Si mon élément est bougé mais remis au même endroit, je quitte
		if (destination.droppableId === source.droppableId && destination.index === source.index) return;

		const start = data.columns[source.droppableId];
		const finish = data.columns[destination.droppableId];
		console.log(finish);

		// Si je reste dans la même colonne
		if (start === finish) {
			// Si on bouge nos éléments
			const column = data.columns[source.droppableId];
			console.log(column);
			// Je choppe les ids des taches actuelles
			const newTaskIds = Array.from(column.taskIds);
			console.log(newTaskIds);
			// Je remplace les places dans l'array
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);
			// Je crée une copie de la colonne de tâches modifiées
			const newColumn = {
				...column,
				taskIds: newTaskIds,
			};
			// Je mets à jour le state
			const newState = {
				...data,
				columns: {
					...data.columns,
					[newColumn.id]: newColumn,
				},
			};
			setData(newState);
			return;
		}

		// Mise à jour de la colonne de départ du drag
		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		// Mise à jour de la colonne de fin du drop
		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		// Mise à jour du state
		const newState = {
			...data,
			columns: {
				...data.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		setData(newState);
	};

	return (
		<div className="tasks">
			<DragDropContext onDragEnd={onDragEnd}>
				{data.columnOrder.map((columnId) => {
					const col = data.columns[columnId];
					const tasks = col.taskIds.map((taskId) => data.tasks[taskId]);
					return <Column key={col.id} column={col} tasks={tasks} />;
				})}
			</DragDropContext>
		</div>
	);
}
