declare const TaskStatuses: {
    readonly PENDING: "pending";
    readonly IN_PROGRESS: "in-progress";
    readonly DONE: "done";
};
type TaskStatus = (typeof TaskStatuses)[keyof typeof TaskStatuses];
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}
export {};
