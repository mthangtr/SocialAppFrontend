import { useEffect, useState } from 'react';

function useScroll(selector: string) {
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(timer);
            timer = setTimeout(() => {
                setIsScrolling(false);
            }, 2000);
        };

        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
            clearTimeout(timer);
        };
    }, [selector]);

    return isScrolling;
}

export default useScroll;
