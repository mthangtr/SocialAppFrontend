import { UserType } from "@/types/Global";
import { Avatar } from "@nextui-org/avatar";

interface ProfilePageClientProps {
    user?: UserType;
}
function ProfilePageClient({ user }: ProfilePageClientProps) {
    console.log(user);
    return (
        <>
            <div className="profile-page">
                <div className="profile-page__header">
                    <div className="profile-page__header__avatar">
                        <Avatar size="lg" src={user?.pfp || "/assets/images/default.png"} className="mb-2" />
                    </div>
                    <div className="profile-page__header__info">
                        <h2>{user?.username}</h2>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className="profile-page__body">
                    <div className="profile-page__body__info">
                        <h3>Info</h3>
                        <p>abc</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePageClient;