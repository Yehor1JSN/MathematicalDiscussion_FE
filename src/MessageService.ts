import { IMessage } from './interface/IMessage';

const MessageAPIAction = '/message';

export class MessageService {

    fetch(): Promise<IMessage[]> {

        return new Promise((resolve, reject) => {

            fetch(process.env.REACT_APP_SERVER_URL + MessageAPIAction)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resolve(data)
                })
        });
    }

    createNewMessage(message: IMessage): Promise<IMessage[]> {

        return new Promise((resolve, reject) => {

            fetch(process.env.REACT_APP_SERVER_URL + MessageAPIAction, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    resolve(data)
                })
        });
    }

}
