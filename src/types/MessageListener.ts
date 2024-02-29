export default interface MessageCallback {
    (data: {
        content: string,
        time: string,
        messageId: string,
        author: {
            name: string,
            reply: (message: string) => Promise<void>
        }
    }): void;
}
