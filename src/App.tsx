import React, { useEffect, useState } from "react";
import "./App.css";
import { IMessage } from "./interface/IMessage";
import { MessageService } from "./MessageService";
import Message from "./Message";
import { IReplyMessage } from "./interface/IReplyMessage";

const messageService = new MessageService();

function App() {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [senderName, setSenderName] = useState<string>('');

    useEffect(() => {
        (async () => {
            const resp = await messageService.fetch();
            setMessages(resp);
        })();
    }, [setMessages]);

    const createNewMessageHandler = async () => {
        const messageList = await messageService.createNewMessage({
            post: newMessage,
            sender_name: senderName,
        });

        if (messageList?.length) {
            setMessages(messageList);
        }
    };

    const onReplyClick = async (message: IMessage, replyMessage: IReplyMessage) => {

        const messageList = await messageService.createNewMessage({
            post: replyMessage.operator + ' ' + replyMessage.number,
            sender_name: replyMessage.senderName,
            parent_message_id: message.id,
        });

        if (messageList?.length) {
            setMessages(messageList);
        }
    }

    return (
        <div className="container mx-auto">

            <h1 className="text-2xl font-bold underline">Messages:</h1>

            { messages.map((message) => (
                <Message message={ message } onReplyClick={ onReplyClick }/>
            )) }

            <div className="mt-5">
                <div>new number:</div>

                <span>name: </span>
                <input
                    value={ senderName }
                    onChange={ e => setSenderName(e.target.value) }
                    className="bg-gray-200 appearance-none px-1 mx-1 w-24 border-2 border-gray-200 focus:outline-none text-gray-700 leading-tight"
                    type="text"
                />

                <span>new message: </span>
                <input
                    value={ newMessage }
                    type="number"
                    onChange={ e => setNewMessage(e.target.value) }
                    className="bg-gray-200 appearance-none px-1 mx-1 w-24 border-2 border-gray-200 focus:outline-none text-gray-700 leading-tight"
                />

                <button className='border border-gray ml-2 px-2' onClick={ createNewMessageHandler }>send</button>
            </div>

        </div>
    );
}

export default App;
