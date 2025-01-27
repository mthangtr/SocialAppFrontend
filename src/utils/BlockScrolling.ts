export const BlockScolling = ({ isOpen }: { isOpen: boolean }) => {
    if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.overflow = 'hidden'; // block scrolling
    } else {
        document.body.style.paddingRight = '';
        document.body.style.overflow = ''; // restore scrolling
    }

    return () => {
        document.body.style.paddingRight = '';
        document.body.style.overflow = ''; // ensure cleaning up while unmounting
    };
};
