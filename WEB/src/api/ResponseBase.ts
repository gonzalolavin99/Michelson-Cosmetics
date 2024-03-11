export interface ResponseBase<T>
{
    Message: string,
    Data: T | null,
    State: number
}