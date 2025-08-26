class TaskModel {
    public id: number;
    public title: string
    public summary: string;
    public isCompleted: boolean;
    public isActive: boolean;
    public lastActiveDate: Date;
    public activeTimer: number; // in hours

    constructor(task: TaskModel) {
        this.id = task.id;
        this.title = task.title;
        this.summary = task.summary;
        this.isCompleted = task.isCompleted;
        this.isActive = task.isActive;
        this.lastActiveDate = task.lastActiveDate || new Date();
        this.activeTimer = task.activeTimer || 0;
    }

}

export default TaskModel;