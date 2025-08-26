import './TaskCard.css'
import React, { useState } from "react";
import TaskActions from './TaskActions/TaskActions';

interface TaskCardProps {
    id: number,
    title: string,
    summary: string,
    isCompleted: boolean,
    isActive: boolean,
    handleTaskAction: (
        action: string,
        taskId: number,
        updatedTask: Partial<{ title: string; summary: string }>
    ) => void;
}

export default function TaskCard(props: TaskCardProps): React.JSX.Element {
    const [actionButtonsState, setActionButtonsState] = useState({
        isEditing: true,
        isActive: false,
    }
    );

    function handleActionButtonState(buttonParam: string) {
        let objectKey = buttonParam as keyof typeof actionButtonsState;
        setActionButtonsState(prevActionButtonState => {
            return {
                ...prevActionButtonState,
                [objectKey]: !prevActionButtonState[objectKey]
            }
        }
        );
    }

    const taskTitle = actionButtonsState.isEditing ? (
        <input
            className="task-input"
            type="text"
            defaultValue={props.title}
            onChange={(event) =>
                props.handleTaskAction("edit", props.id, {
                    title: event.target.value,
                    summary: props.summary,
                })
            }
        />
    ) : (
        <h2 className="task-title">{props.title}</h2>
    );

    const taskSummary = actionButtonsState.isEditing ? (
        <textarea
            className="task-input"
            defaultValue={props.summary}
            onChange={(event) =>
                props.handleTaskAction("edit", props.id, {
                    title: props.title,
                    summary: event.target.value,
                })
            }
        />
    ) : (
        <p className="task-summary">{props.summary}</p>
    );

    return (
        <div className={`task-card  ${props.isActive ? 'active-task' : ''} ${props.isCompleted ? 'completed-task' : ''}`}>
            <div className="task-content">
                {taskTitle}
                {taskSummary}
            </div>
            <div className="task-actions">
                <TaskActions
                    isEditing={actionButtonsState.isEditing}
                    isActive={props.isActive}
                    handleAactionButtonState={handleActionButtonState}
                    handleTaskAction={props.handleTaskAction}
                    taskId={props.id}
                />
            </div>
        </div>
    );
}
