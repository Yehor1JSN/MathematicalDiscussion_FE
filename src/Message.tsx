import React, { useEffect, useState } from "react";
import { IMessage } from './interface/IMessage';
import { IReplyMessage, onReplyCallback } from "./interface/IReplyMessage";

function Message({ message, onReplyClick }: { message: IMessage, onReplyClick: onReplyCallback }) {

    const [replyMessage, setReplyMessage] = useState<IReplyMessage>({
        senderName: '',
        operator: '+',
    });

    return <div className="py-2 mt-1">
        <div>name: "{ message.sender_name }" message: { message.post }</div>
        <div>date: { message.created_at }</div>

        <div className="mt-1">

            <span>name: </span>
            <input
                value={ replyMessage.senderName }
                onChange={ e => setReplyMessage({ ...replyMessage, senderName: e.target.value }) }
                type="text"
                className="bg-gray-200 appearance-none px-1 mx-1 w-24 border-2 border-gray-200 focus:outline-none text-gray-700 leading-tight"
            />

            <span className="mr-2">operator:</span>

            <select
                className="focus:outline-none"
                value={ replyMessage.operator }
                onChange={ e => setReplyMessage({ ...replyMessage, operator: e.target.value }) }
            >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>

            <input
                value={ replyMessage.number }
                onChange={ e => setReplyMessage({ ...replyMessage, number: +e.target.value }) }
                type="number"
                className="bg-gray-200 appearance-none w-20 border-2 border-gray-200 focus:outline-none text-gray-700 leading-tight"
            />

            <button onClick={ e => onReplyClick(message, replyMessage) } className='border border-gray ml-2 px-2' type='button'>
                reply
            </button>
        </div>

        { !!message.children?.length && message.children.map((message) => (
            <div className="ml-5 pl-2 border-l border-gray-200">
                <Message message={ message } onReplyClick={ onReplyClick }/>
            </div>
        )) }
    </div>;
}

export default Message;
