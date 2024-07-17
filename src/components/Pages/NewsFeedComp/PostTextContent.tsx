import React from 'react';

function PostTextContent({ text }: { text: string }) {
    const renderTextWithHashtags = (text: string) => {
        const hashtagRegex = /#(\w+)/g;
        const parts = text.split(hashtagRegex);

        return parts.map((part, index) => {
            if (index % 2 === 1) {
                const hashtag = `#${part}`;
                return (
                    <a key={index} href={`https://example.com/hashtag/${part}`} className='font-light hover:underline text-blue-800 dark:text-blue-400'>
                        {hashtag}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <span>
            {renderTextWithHashtags(text)}
        </span>
    );
}

export default PostTextContent;
