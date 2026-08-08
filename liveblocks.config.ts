// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
declare global {
  interface Liveblocks {
    Presence: Record<string, never>;
    Storage: {
      leftMargin: number;
      rightMargin: number;
    };

    UserMeta: {
      id: string;
      info: {
        name: string;
        avatar: string;
        color: string;
      };
    };

    RoomEvent: Record<string, never>;

    ThreadMetadata: Record<string, never>;

    RoomInfo: {
      name: string;
    };
  }
}

export { };
