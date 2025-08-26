import React from "react";

interface TaskActionsProps {
    taskId: number,
    isEditing: boolean,
    isActive: boolean,
    handleAactionButtonState: (buttonParam: string) => void,
    handleTaskAction: (action: string, taskId: number, updatedTask: Partial<{ title: string; summary: string }>) => void;
}


export default function TaskActions(props: TaskActionsProps): React.JSX.Element {

    const editSaveBtnName = props.isEditing ? "Save" : "Edit"
    const isActive = props.isActive ? "Pause" : "Activate"

    return (
        <>
            <button id="edit" className="task-button" onClick={() => props.handleAactionButtonState("isEditing")}>{editSaveBtnName}</button>
            <button id="active" className="task-button" onClick={() => {
                props.handleAactionButtonState("isActive");
                props.handleTaskAction("activate", props.taskId, {})
            }}>{isActive}</button>
            <button id="complete" className="task-button" onClick={() => props.handleTaskAction("complete", props.taskId, {})}>Complete</button>
            <button id="delete" className="task-button" onClick={() => props.handleTaskAction("delete", props.taskId, {})}>X</button>
        </>
    )
}