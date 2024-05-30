import Header from "@/components/LayoutComponent/Header";
import LeftSidebar from "@/components/LayoutComponent/SidebarLeft";
import RightSidebar from "@/components/LayoutComponent/SidebarRight";

function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className=" bg-background">
            <Header />
            <div className="flex">
                <div className="fixed top-0 left-0 h-full w-1/5 min-w-[200px] overflow-y-auto pt-14">
                    <LeftSidebar />
                </div>
                <div className="flex-1 ml-[20%] mr-[20%] min-w-[400px] overflow-y-auto min-h-screen pt-14">
                    {children}
                </div>
                <div className="fixed top-0 right-0 h-full w-1/5 min-w-[200px] overflow-y-auto pt-14">
                    <RightSidebar />
                </div>
            </div>
        </main>
    );
}

export default HomeLayout;
