export class AuthUser {
    request_token: string;
    refresh_token: string;
    user: User;
}

export class User {
    id: number;
    name: string;
    email: string;
    email_old?: string;
    own_password: string;
    password: string;
    roles: Role[];
    rolesString? : string;
    attributes : {
        profile_url?: string;
    }
}

export class Role {
    id: number;
    name: string;
    description: string;
}