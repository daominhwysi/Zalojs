export interface User {
    name: string;
    bio: string;
    birth: string;
    number: string;
}
export type UserCallBack = (user: User | null) => void;