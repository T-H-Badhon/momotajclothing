'use server';

import axios from 'axios';

export const uploadImage = async (data: any) => {
    // console.log(data);

    const form = new FormData();
    const blob = dataURItoBlob(data);
    form.append('file', blob, 'image.png');
    // console.log(data);

    try {
        const response = await axios.post(
            'https://www.prettysportswear.com/files/upload',
            form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

function dataURItoBlob(dataURI: any) {
    // console.log(dataURI);

    // Convert base64 to raw binary data held in a string.
    const byteString = atob(dataURI.split(',')[1]);

    // Separate out the mime component.
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // Write the bytes of the string to an ArrayBuffer.
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // Create a Blob from the ArrayBuffer.
    return new Blob([ab], { type: mimeString });
}
