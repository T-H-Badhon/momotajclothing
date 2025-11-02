'use client';

import dynamic from 'next/dynamic';
import Script from 'next/script';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video'],
    ],
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'direction',
    'align',
    'strike',
    'blockquote',
    'code-block',
    'color',
    'background',
    'font',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'sub',
    'super',
    'script',
];

export default function QuillEditor({
    content,
    setContent,
}: {
    content: string;
    setContent: any;
}) {
    return (
        <div>
            <Script src="https://cdn.quilljs.com/1.3.6/quill.js" />
            <Script src="https://cdn.quilljs.com/1.3.6/quill.snow.css" />
            <QuillNoSSRWrapper
                modules={modules}
                formats={formats}
                theme="snow"
                placeholder={'Compose Here...'}
                value={content}
                onChange={(v) => setContent(v)}
            />
        </div>
    );
}
