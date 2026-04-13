declare const TaskStatuses: {
    readonly PENDING: "pending";
    readonly IN_PROGRESS: "in-progress";
    readonly DONE: "done";
};
export type TaskStatus = (typeof TaskStatuses)[keyof typeof TaskStatuses];
export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
}
export {};
