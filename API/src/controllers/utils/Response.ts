export interface ResponseBase<T>
{
    Message: string,
    Data: T | null,
    DataList: T[] | null,
    Success: boolean
}