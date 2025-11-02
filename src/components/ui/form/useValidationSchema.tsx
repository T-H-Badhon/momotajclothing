import articleCommentSchema from 'src/validations/articleCommentSchema';
import articleSchema from 'src/validations/articleSchema';
import loginSchema from 'src/validations/loginSchema';
import signupSchema from 'src/validations/signupSchema';

export type SchemaName = 'login' | 'signup' | 'article' | 'articlecomment';

export default function useValidationSchema(schema?: SchemaName) {
    switch (schema) {
        case 'login':
            return loginSchema;
        case 'signup':
            return signupSchema;
        case 'article':
            return articleSchema;
        case 'articlecomment':
            return articleCommentSchema;
        default:
            return undefined;
    }
}
