export class AuthUser {
    request_token: string;
    refresh_token: string;
    user: {
        id: number;
        name: string;
        email: string;
        attributes : {
            profile_url: string;
        }
    }
    
}

export class User {
    id: number;
    name: string;
    email: string;
    attributes : {
        profile_url: string;
    }
}