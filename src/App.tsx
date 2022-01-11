import React, { useEffect, useState } from "react";
import "./App.css";
import { IMessage } from "./Message.interface";
import { MessageService } from "./MessageService";
import Message from "./Message";

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

    const onReplyClick = async (message: IMessage) => {

        const messageList = await messageService.createNewMessage({
            post: newMessage,
            sender_name: senderName,
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

            <div className="flex flex-row"></div>

            <div className="md:w-2/3 mt-5">
                <span>name: </span>
                <input
                    value={ senderName }
                    onChange={ e => setSenderName(e.target.value) }
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                />
            </div>

            <div className="md:w-2/3">
                <span>new message: </span>
                <input
                    value={ newMessage }
                    onChange={ e => setNewMessage(e.target.value) }
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                />
            </div>

            <div className="md:w-2/3">
                <button className='p-1 mt-2 border' onClick={ createNewMessageHandler }>ADD</button>
            </div>

        </div>
    );
}

export default App;
