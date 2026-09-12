export interface IPaginatedResponse<T> {
    totalItems: number;
    totalPages: number;
    prevPage: number;
    nextPage: number;
    data: T[];
}