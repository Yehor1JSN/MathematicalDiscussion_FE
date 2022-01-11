export interface IMessage {
    id?: number
    children?: Array<IMessage>
    parent_message_id?: number | null
    post: string
    sender_name: string
    created_at?: string
}
