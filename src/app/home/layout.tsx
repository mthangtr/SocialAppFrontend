import Header from "@/components/LayoutComponent/Header";
import RightSidebar from "@/components/LayoutComponent/SidebarRight";
import LeftSidebar from "@/components/LayoutComponent/SidebarLeft";
import ScrollableComponent from "@/components/LayoutComponent/ScrollableComponent";
import Providers from "@/components/LayoutComponent/ProgressBarProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <main className="">
                <Header />
                <div className="flex">
                    <ToastContainer
                        autoClose={3000}
                        hideProgressBar={true}
                        closeOnClick
                        pauseOnHover
                    />
                    <div className="fixed top-0 left-0 h-full w-1/5 min-w-[200px] pt-14">
                        <LeftSidebar />
                    </div>
                    <div className="flex-1 ml-[20%] mr-[20%] min-w-[400px] min-h-screen pt-14 scrollable-body">
                        {children}
                    </div>
                    <div className="fixed top-0 right-0 h-full w-1/5 min-w-[200px] overflow-y-auto pt-14 scrollable-sidebar">
                        <ScrollableComponent selector=".scrollable-sidebar">
                            <RightSidebar />
                        </ScrollableComponent>
                    </div>
                </div>
            </main>
        </Providers>
    );
}

export default HomeLayout;
