import * as yup from 'yup';

const articleSchema = yup.object().shape({
    title: yup.string().required('Article title is required.'),
    tagline: yup.string().required('Article tagline is required.'),
    excerpt: yup.string().required('Article sub content is required.'),
    image: yup.string().required('Article image is required.'),
});

export default articleSchema;
