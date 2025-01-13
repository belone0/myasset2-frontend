// models/User.ts or types/User.ts
export interface User {
    id: number;
    email_address: string;
    password_digest?: string;
    created_at: string;
    updated_at: string;
}
