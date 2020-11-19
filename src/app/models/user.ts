export class User {
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