import { v4 as uuidv4 } from 'uuid';
import { apiPath } from "./apiRoutes";
import { apiFetch, isBackendNumericChatId } from "./backendApi";

export interface Message {
  id?: string | number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string | Date;
  feedback_submitted?: boolean;
  /** Backend: image_url on message or inside extra_data */
  image_url?: string | null;
  /** Backend: document_id, png_url, dxf_url, spec, layout, etc. */
  extra_data?: {
    document_id?: string;
    png_url?: string | null;
    dxf_url?: string | null;
    spec?: unknown;
    layout?: unknown;
    validation_report?: unknown;
  } | null;
}

export interface ChatSession {
  id: string;
  userId: string;
  title?: string | null;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = 'clairvyn_chat_sessions';

/** Get storage key namespaced by user */
function getStorageKey(userId: string): string {
  return `${STORAGE_KEY}_${userId}`
}

/** Per-user last opened chat id (survives full page refresh). */
const LAST_ACTIVE_CHAT_BY_USER_KEY = 'clairvyn_last_active_chat_by_user';

function readLastActiveChatMap(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LAST_ACTIVE_CHAT_BY_USER_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, string>)
      : {};
  } catch {
    return {};
  }
}

export function getLastActiveChatId(userId: string): string | null {
  const id = readLastActiveChatMap()[userId];
  return typeof id === 'string' && id.length > 0 ? id : null;
}

export function setLastActiveChatId(userId: string, chatId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const map = readLastActiveChatMap();
    map[userId] = chatId;
    localStorage.setItem(LAST_ACTIVE_CHAT_BY_USER_KEY, JSON.stringify(map));
  } catch (error) {
    console.error('[Clairvyn:chat] setLastActiveChatId error', error);
  }
}

// Helper to get sessions from local storage
const getSessionsFromStorage = (userId: string): ChatSession[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(getStorageKey(userId));
    if (!stored) return [];
    const sessions = JSON.parse(stored);
    // Restore Date objects
    const restored = sessions.map((session: any) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      messages: session.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }));
    console.debug('Loaded sessions from localStorage', restored);
    return restored;
  } catch (error) {
    console.error('Error parsing chat sessions:', error);
    return [];
  }
};

// Helper to save sessions to local storage
const saveSessionsToStorage = (userId: string, sessions: ChatSession[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(sessions));
  } catch (error) {
    console.error('Error saving chat sessions:', error);
  }
};

// Create a new chat session, optionally specifying the ID (useful when syncing with backend)
export const createChatSession = async (
  userId: string,
  forcedId?: string
): Promise<string> => {
  try {
    const sessions = getSessionsFromStorage(userId);
    const newSession: ChatSession = {
      id: forcedId || uuidv4(),
      userId,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    sessions.push(newSession);
    saveSessionsToStorage(userId, sessions);
    console.log("[Clairvyn:chat] createChatSession", { id: newSession.id, forcedId: !!forcedId });
    return newSession.id;
  } catch (error) {
    console.error("[Clairvyn:chat] createChatSession error", error);
    throw error;
  }
};

// Rename an existing local session (used when a backend chat ID is assigned)
export const renameChatSession = async (
  userId: string,
  oldId: string,
  newId: string
): Promise<void> => {
  try {
    const sessions = getSessionsFromStorage(userId);
    const idx = sessions.findIndex((s) => s.id === oldId);
    if (idx === -1) return;
    // avoid collision if newId already exists
    const exists = sessions.find((s) => s.id === newId);
    if (exists) {
      // merge messages if necessary
      sessions[idx].messages.forEach((m) => exists.messages.push(m));
      // remove old entry
      sessions.splice(idx, 1);
    } else {
      sessions[idx].id = newId;
    }
    saveSessionsToStorage(userId, sessions);
  } catch (error) {
    console.error('Error renaming chat session:', error);
  }
};

// Add a message to a chat session
export const addMessageToChat = async (
  userId: string,
  chatId: string,
  message: Omit<Message, 'timestamp'>
): Promise<void> => {
  try {
    const sessions = getSessionsFromStorage(userId);
    const sessionIndex = sessions.findIndex(s => s.id === chatId);

    if (sessionIndex === -1) {
      throw new Error(`Chat session ${chatId} not found`);
    }

    const messageWithTimestamp: Message = {
      ...message,
      timestamp: new Date(),
    };

    sessions[sessionIndex].messages.push(messageWithTimestamp);
    sessions[sessionIndex].updatedAt = new Date();

    saveSessionsToStorage(userId, sessions);
  } catch (error) {
    console.error('Error adding message to chat:', error);
    throw error;
  }
};

function getLocalChatMessages(userId: string, chatId: string): Message[] {
  try {
    const sessions = getSessionsFromStorage(userId);
    const session = sessions.find((s) => s.id === chatId);
    const messages = session ? session.messages : [];
    console.log("[Clairvyn:chat] getChatMessages → local", { chatId, count: messages.length });
    return messages;
  } catch (error) {
    console.error("[Clairvyn:chat] getChatMessages error", { chatId, error });
    return [];
  }
}

function mapApiMessagesPayload(data: unknown): Message[] {
  const array: any[] = Array.isArray(data) ? data : [];
  return array.map((m) => ({
    id: m.id,
    role: m.sender_type === "user" ? "user" : "assistant",
    content: m.content ?? "",
    timestamp:
      typeof m.created_at === "string"
        ? m.created_at
        : (m.created_at as Date)?.toISOString?.() ?? new Date().toISOString(),
    image_url: m.image_url ?? undefined,
    extra_data: m.extra_data ?? undefined,
    feedback_submitted: Boolean(m.feedback_submitted),
  }));
}

// Get messages for a chat session
export const getChatMessages = async (userId: string, chatId: string, token?: string): Promise<Message[]> => {
  console.log("[Clairvyn:chat] getChatMessages", { chatId, hasToken: !!token });
  if (token) {
    if (isBackendNumericChatId(chatId)) {
      try {
        const data = await apiFetch<any>(apiPath.chatMessages(chatId), {
          method: "GET",
          token: token ?? null,
        });
        const hist = mapApiMessagesPayload(data);
        console.log("[Clairvyn:chat] getChatMessages → backend", { chatId, count: hist.length });
        return hist;
      } catch (err) {
        console.warn("[Clairvyn:chat] getChatMessages backend failed, using local", { chatId, err });
      }
    }
  }

  return getLocalChatMessages(userId, chatId);
};

/** Load messages for a chat (backend when token works, else local). */
export async function loadMessagesForChat(
  userId: string,
  chatId: string,
  token: string | null | undefined
): Promise<{ messages: Message[]; fromBackend: boolean }> {
  if (token && isBackendNumericChatId(chatId)) {
    try {
      const data = await apiFetch<any>(apiPath.chatMessages(chatId), {
        method: "GET",
        token: token ?? null,
      });
      return { messages: mapApiMessagesPayload(data), fromBackend: true };
    } catch (err) {
      console.warn("[Clairvyn:chat] loadMessagesForChat backend failed, using local", { chatId, err });
    }
  }
  return { messages: getLocalChatMessages(userId, chatId), fromBackend: false };
}

// Get all chat sessions for a user
export const getUserChatSessions = async (
  userId: string,
  token?: string
): Promise<ChatSession[]> => {
  console.log("[Clairvyn:chat] getUserChatSessions", { userId, hasToken: !!token });
  if (token) {
    try {
      const raw = await apiFetch<unknown>(apiPath.chats(), {
        method: "GET",
        token: token ?? null,
      });

      // Guard: backend must return a JSON array - anything else falls through to local cache
      if (!Array.isArray(raw)) {
        console.warn("[Clairvyn:chat] getUserChatSessions: backend returned non-array", typeof raw);
        throw new Error("Unexpected sessions response format");
      }

      const backendSessions = raw as any[];
      const existingById = new Map(
        getSessionsFromStorage(userId).map((s) => [s.id, s])
      );
      const converted: ChatSession[] = backendSessions.map((s) => {
        const id = String(s.id);
        const prev = existingById.get(id);
        return {
          id,
          userId,
          title: s.title ?? null,
          // Never wipe message history here — sidebar refresh runs after each turn and
          // would erase assistant rows / extra_data in localStorage. Reload then showed
          // only the user bubble if GET /messages failed or raced.
          messages: prev?.messages ?? [],
          createdAt: new Date(s.created_at || s.createdAt || prev?.createdAt || Date.now()),
          updatedAt: new Date(s.updated_at || s.updatedAt || Date.now()),
        };
      });

      try {
        // Session list + titles from backend; messages preserved from cache until setChatMessages / loadMessagesForChat updates them.
        saveSessionsToStorage(userId, converted);
      } catch {
        /* ignore cache failure */
      }

      const sorted = converted.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
      console.log("[Clairvyn:chat] getUserChatSessions → backend", { count: sorted.length, titles: sorted.map((s) => s.title) });
      return sorted;
    } catch (err) {
      console.warn("[Clairvyn:chat] getUserChatSessions backend failed, using local", { userId, err });
    }
  }

  try {
    const sessions = getSessionsFromStorage(userId);
    const filtered = sessions.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    console.log("[Clairvyn:chat] getUserChatSessions → local", { count: filtered.length });
    return filtered;
  } catch (error) {
    console.error("[Clairvyn:chat] getUserChatSessions error", { userId, error });
    return [];
  }
};


// Simulate AI response
export const simulateAIResponse = async (userMessage: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simple response logic based on user input
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('new design') || lowerMessage.includes('start')) {
    return "Okay! Starting your new design... I'm here to help you create amazing floor plans and CAD projects. What type of space are you thinking about?";
  } else if (lowerMessage.includes('floor plan') || lowerMessage.includes('layout')) {
    return "Great! Let's work on your floor plan. What's the square footage and how many rooms do you need? I can help you optimize the layout for functionality and flow.";
  } else if (lowerMessage.includes('cad') || lowerMessage.includes('drawing')) {
    return "Perfect! CAD drawings are essential for precise architectural work. Are you working on residential, commercial, or industrial design? I can guide you through the technical specifications.";
  } else if (lowerMessage.includes('room') || lowerMessage.includes('bedroom') || lowerMessage.includes('kitchen')) {
    return "Excellent choice! Let's focus on that room. What are your priorities - functionality, aesthetics, or both? I can suggest optimal dimensions and layouts.";
  } else {
    return "I'm here to help you design residential floor plans! This version supports designs up to 4 BHK with a limited collection of CAD assets including furniture and room types. Please describe your floor plan needs, and I'll assist you with the design.";
  }
};

export const deleteChatSession = async (
  userId: string,
  chatId: string,
  token: string | null
): Promise<boolean> => {
  try {
    if (token) {
      if (isBackendNumericChatId(chatId)) {
        try {
          await apiFetch(apiPath.chatDelete(chatId), {
            method: "DELETE",
            token: token ?? null,
          });
        } catch (err) {
          console.warn("[Clairvyn:chat] deleteChatSession backend failed", { chatId, err });
        }
      }
    }
    const sessions = getSessionsFromStorage(userId).filter((s) => s.id !== chatId);
    saveSessionsToStorage(userId, sessions);
    console.log("[Clairvyn:chat] deleteChatSession", { userId, chatId });
    return true;
  } catch (error) {
    console.error("[Clairvyn:chat] deleteChatSession error", { chatId, error });
    return false;
  }
};

/** Wipe all locally-cached sessions and last-active pointer for a user (call on logout). */
export function clearUserSessions(userId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(getStorageKey(userId));
  } catch {
    // ignore storage errors
  }
  // Also clear the last-active chatId pointer so a stale/recycled id
  // can't be picked up by a subsequent login or different user.
  try {
    const map = readLastActiveChatMap();
    delete map[userId];
    localStorage.setItem(LAST_ACTIVE_CHAT_BY_USER_KEY, JSON.stringify(map));
  } catch {
    // ignore storage errors
  }
}

// Replace messages for a chat session (used after syncing with backend)
export const setChatMessages = async (
  userId: string,
  chatId: string,
  messages: Message[]
): Promise<void> => {
  try {
    const sessions = getSessionsFromStorage(userId);
    const sessionIndex = sessions.findIndex((s) => s.id === chatId);
    if (sessionIndex === -1) {
      sessions.push({
        id: chatId,
        userId: userId,
        messages,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log("[Clairvyn:chat] setChatMessages (new session)", { userId, chatId, count: messages.length });
    } else {
      sessions[sessionIndex].messages = messages;
      sessions[sessionIndex].updatedAt = new Date();
      console.log("[Clairvyn:chat] setChatMessages", { userId, chatId, count: messages.length });
    }
    saveSessionsToStorage(userId, sessions);
  } catch (error) {
    console.error("[Clairvyn:chat] setChatMessages error", { userId, chatId, error });
  }
};

// Guest mode localStorage functions 
// (These can now wrap the main functions or be aliases since everything is local)
export const getGuestChats = (): Message[] => {
  // Maintaining backward compatibility if used directly, 
  // but logically "guestChats" might ideally be just one of the sessions or a separate key.
  // The original implementation had a separate "guestChats" key.
  try {
    const chats = localStorage.getItem("guestChats");
    return chats ? JSON.parse(chats) : [];
  } catch (error) {
    console.error("Error getting guest chats:", error);
    return [];
  }
};

export const saveGuestChats = (messages: Message[]): void => {
  try {
    localStorage.setItem("guestChats", JSON.stringify(messages));
  } catch (error) {
    console.error("Error saving guest chats:", error);
  }
};

export const clearGuestChats = (): void => {
  localStorage.removeItem("guestChats");
};

