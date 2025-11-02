import * as Yup from 'yup';

const articleCommentSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    name: Yup.string().required('Name is required'),
    opinion: Yup.string().required('Message is required'),
});

export default articleCommentSchema;
