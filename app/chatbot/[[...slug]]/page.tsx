import ChatbotClient from "../chatbot-client"

/**
 * Optional catch-all: `/chatbot` and `/chatbot/:numericChatId` share one client.
 * Canonical URLs use path segments (not ?chat=) for server-backed conversations.
 */
export default function ChatbotRoutePage() {
  return <ChatbotClient />
}
