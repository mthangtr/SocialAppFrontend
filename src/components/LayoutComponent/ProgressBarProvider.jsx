'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }) => {
    return (
        <>
            {children}
            <ProgressBar
                height="2px"
                color="#FF0000"
                options={{
                    showSpinner: false,
                    trickleSpeed: 200,
                    easing: 'ease',
                    speed: 500
                }}
                shallowRouting={false}
                startPosition={0.3}
                delay={100}
                stopDelay={200}
                memo={true}
                shouldCompareComplexProps={true}
                // targetPreprocessor={(url) => {
                //     // Example URL preprocessor logic
                //     const modifiedUrl = new URL(url);
                //     // Add your custom logic here
                //     return modifiedUrl;
                // }}
                disableAnchorClick={false}
            />
        </>
    );
};

export default Providers;