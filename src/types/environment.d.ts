import { Secret } from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            TOKEN_SECRET: Secret;
            APPLICATIONID: string;
            SQUARE_ACCESS_TOKEN: string;
            LOCATIONID: string;
            NEXT_PUBLIC_NODE: string;
            NEXT_PUBLIC_MEDIA: string;
        }
    }
}
