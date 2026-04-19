/**
 * API paths served by Flask (`backend/src/app/api/routes.py`).
 * Combine with `getBackendUrl()` / `apiFetch`: in the browser these resolve to same-origin `/api/...`
 * and are proxied to Flask by `app/api/[...path]/route.ts`.
 */
export const apiPath = {
  chats: () => "/api/chats",
  chatMessages: (chatId: string) => `/api/chats/${encodeURIComponent(chatId)}/messages`,
  chatTurn: (chatId: string) => `/api/chats/${encodeURIComponent(chatId)}/turn`,
  chatTask: (chatId: string, taskId: string) =>
    `/api/chats/${encodeURIComponent(chatId)}/tasks/${encodeURIComponent(taskId)}`,
  chatDelete: (chatId: string) => `/api/chats/${encodeURIComponent(chatId)}`,
  chatFeedback: (chatId: string) => `/api/chats/${encodeURIComponent(chatId)}/feedback`,
  chatFile: (chatId: string, filename: string) =>
    `/api/chats/${encodeURIComponent(chatId)}/files/${filename}`,
  me: () => "/api/me",
  logout: () => "/api/logout",
  bridgeLog: () => "/api/debug/bridge-log",
  bridgeRoutes: () => "/api/debug/routes",
} as const
