import React, { FC } from 'react';
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
interface BackgroundImageContainerProps {
    imageUrl?: string;
}
const BackgroundImageContainer: FC<BackgroundImageContainerProps> = ({ imageUrl }) => {
    return (
        <div className='h-96 relative'>
            <PhotoProvider>
                <PhotoView src={imageUrl}>
                    <Image
                        src={imageUrl}
                        alt='background'
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                </PhotoView>
            </PhotoProvider>
        </div>
    );
}

export default BackgroundImageContainer;