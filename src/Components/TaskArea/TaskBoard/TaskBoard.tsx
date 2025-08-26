import React from "react";
import { useState } from "react";
import "./TaskBoard.css";
import TaskModel from '../../../models/TaskModel';
import exportTasksToCSV from "../../../Utils/ExportTasks";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";

import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableTaskCard from "../TaskCard/SortableTaskCard";

export default function TaskBoard(): React.JSX.Element {
    const [taskListState, setTaskListState] = useState<TaskModel[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    function handleAddNewTask() {
        setTaskListState(prevTaskListState => {
            const newTask: TaskModel = {
                id: Date.now(),
                title: "New Task",
                summary: "",
                isCompleted: false,
                isActive: false,
                lastActiveDate: new Date(),
                activeTimer: 0,
            };
            const updatedTaskList = prevTaskListState ? [...prevTaskListState, newTask] : [newTask];
            return updatedTaskList;
        });
    }

    function handleTaskAction(action: string, taskId: number, updatedTask: Partial<TaskModel> = {}) {
        if (action === "edit") {
            setTaskListState(prevTaskListState =>
                prevTaskListState.map(task =>
                    task.id === taskId
                        ? { ...task, ...updatedTask }
                        : task
                )
            );
        } else if (action === "activate") {
            setTaskListState(prevTaskListState =>
                prevTaskListState.map(task =>
                    task.id === taskId
                        ? { ...task, lastActiveDate: new Date(), activeTimer: task.isActive ? task.activeTimer + calculateActiveTimer(task.lastActiveDate) : task.activeTimer, isActive: !task.isActive }
                        : { ...task, activeTimer: task.isActive ? task.activeTimer + calculateActiveTimer(task.lastActiveDate) : task.activeTimer, isActive: false }
                )
            );
        }
        else if (action === "complete") {
            setTaskListState(prevTaskListState =>
                prevTaskListState.map(task =>
                    task.id === taskId
                        ? { ...task, isCompleted: !task.isCompleted, isActive: false }
                        : task
                )
            );
        } else if (action === "delete") {
            setTaskListState(prevTaskListState =>
                prevTaskListState.filter(task => task.id !== taskId)
            );
        }
    }

    function calculateActiveTimer(date: Date): number {
        const now = new Date();
        const diffInMs = now.getTime() - new Date(date).getTime();
        return diffInMs / 3600000; // Convert milliseconds to hours
    }

    function getTaskListToExport() {
        return taskListState.map(task => (
            task.isActive ? { ...task, activeTimer: task.activeTimer + calculateActiveTimer(task.lastActiveDate) } : task
        ));
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = taskListState.findIndex(task => task.id === active.id);
        const newIndex = taskListState.findIndex(task => task.id === over.id);
        setTaskListState(arrayMove(taskListState, oldIndex, newIndex));
    }

    return (
        <div className="main" >
            <section className="task-board-actions">
                <button className="task-btn" onClick={handleAddNewTask}>Add New Task</button>
                <button className="task-btn" onClick={() => exportTasksToCSV(getTaskListToExport())}>Export Tasks</button>
            </section>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={taskListState.map(task => task.id)} strategy={verticalListSortingStrategy}>
                    <div className="task-board">
                        {taskListState.map(item =>
                            !item.isCompleted && <SortableTaskCard key={item.id} task={item} handleTaskAction={handleTaskAction} />
                        )}
                    </div>
                </SortableContext>
            </DndContext>
        </div >
    )
}