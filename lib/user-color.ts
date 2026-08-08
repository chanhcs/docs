const USER_COLORS = [
    "#DC2626",
    "#EA580C",
    "#B45309",
    "#16A34A",
    "#059669",
    "#0891B2",
    "#2563EB",
    "#4F46E5",
    "#9333EA",
    "#DB2777",
];

export function getUserColor(userId: string): string {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
        hash = (hash * 31 + userId.charCodeAt(i)) | 0;
    }
    return USER_COLORS[Math.abs(hash) % USER_COLORS.length];
}
