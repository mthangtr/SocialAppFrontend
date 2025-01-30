import Providers from "@/components/LayoutComponent/ProgressBarProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function MessagePageLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <main className="">

            </main>
        </Providers>
    );
}

export default MessagePageLayout;
