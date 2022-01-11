import { IMessage } from "./IMessage";

export interface IReplyMessage {
    senderName: string
    operator: '+' | '-' | '*' | '/' | string
    number?: number
}

export type onReplyCallback = (message: IMessage, replyMessage: IReplyMessage) => Promise<void>;
