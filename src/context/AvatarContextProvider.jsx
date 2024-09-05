import React, { createContext, useState } from 'react';

export const AvatarContext = createContext();

const AvatarContextProvider = (props) => {

    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('key', `${import.meta.env.VITE_IMGBB_KEY}`);
        formData.append('image', file);

        const apiUrl = 'https://api.imgbb.com/1/upload';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const imageUrl = data.data.url;
            setImageUrl(imageUrl);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };    

    return(
        <AvatarContext.Provider value={{ 
            imageUrl, setImageUrl, handleFileChange
        }}>
            {props.children}
        </AvatarContext.Provider>
    )
}
export default AvatarContextProvider;