export interface INote{
    title: string,
    text: string,
    tags?: string[],
    dateCreated: string,
}

export interface INoteInput{
    title: string,
    text: string,
    tags?: string,
}
