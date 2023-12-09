/* eslint-disable unused-imports/no-unused-vars */

export declare module 'next-auth' {
    interface User {
        username: string | null;
        role: string;
    }
    interface Session {
        user: User & {
            username: string;
            role: string;
        };
        token: {
            username: string;
            role: string;
        };
    }
}
