// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: Record<string, never>; // Ví dụ: { cursor: { x: number; y: number } }

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: Record<string, never>; // Ví dụ: { animals: LiveList<string> }

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id: string;
      // Ví dụ: { name: string; avatar: string } — dùng cho useSelf, useUser, useOthers
      info: Record<string, never>;
    };

    // Custom events, for useBroadcastEvent, useEventListener
    // Ví dụ: { type: "PLAY" } | { type: "REACTION"; emoji: "🔥" }
    RoomEvent: Record<string, never>;

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: Record<string, never>; // Ví dụ: { x: number; y: number }

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: Record<string, never>; // Ví dụ: { title: string; url: string }
  }
}

export {};
