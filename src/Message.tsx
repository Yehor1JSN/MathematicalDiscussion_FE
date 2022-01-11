import React, { useEffect, useState } from "react";
import { IMessage } from './Message.interface';

function Message({ message, onReplyClick }: { message: IMessage, onReplyClick: CallableFunction }) {

    return <div className="py-2 mt-1">
        <div>name: {message.sender_name} | message: {message.post}</div>
        <div>date: {message.created_at}</div>

        <button onClick={e => onReplyClick(message)} className='border border-gray p-1' type='button'>
            reply
        </button>

        { !!message.children?.length && message.children.map((message) => (
            <div className="ml-5 pl-2 border-l border-gray-200">
                <Message message={message} onReplyClick={onReplyClick}/>
            </div>
        )) }
    </div>;
}

export default Message;
