export const TimeAgo = (time: Date | string): string => {
    const date = new Date(time);
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) {
        return 'Just now';
    }
    if (minutes < 60) {
        return `${minutes}m ago`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}h ago`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days}d ago`;
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months}mo ago`;
    }
    const years = Math.floor(months / 12);
    return `${years}y ago`;
};
