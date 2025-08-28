export type User = {
id: string;
name: string;
phone: string;
};


export type AuthResponse = {
token: string;
user: User;
};