import { PostType } from "@/types/Global";
import PostReactionsDropdown from './PostReactionsDropdown';

function ReactionModal({ post }: { post: PostType }) {
    return (
        <>
            <PostReactionsDropdown post={post} />
        </>
    );
}

export default ReactionModal;
