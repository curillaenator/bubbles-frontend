interface TgChatMeta {
  id?: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  msgId: number;
  date: number;
}

export type { TgChatMeta };
