export interface TaskForSearch {
    search?: string,
    status?: TaskStatus,
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

export interface TaskForCreate {
    title: string;
    description: string;
}

export interface TaskForUpdate {
    title: string;
    description: string;
    status: TaskStatus;
}

export interface TaskResponse {
    description: string;
    id: string;
    status: TaskStatus;
    title: string;
}
