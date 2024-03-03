export interface MessageCallback {
    content: string;
    time: string;
    messageId: string;
    author: {
        name: string;
    };
}
