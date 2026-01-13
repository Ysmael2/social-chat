import { defineStore } from 'pinia'
import { ref } from 'vue'
import ablyService from '@/services/ably'
import type { Message } from '@/services/types'

export const useChatStore = defineStore('chat', {
  state: () => ({
    globalMessages: [] as Message[],
    privateMessages: new Map<string, Message[]>(), // userId -> messages
    activePrivateChat: null as string | null,
    loading: false
  }),

  actions: {
    connectToChat(userId: string) {
      ablyService.connect(userId)
      
      // Suscribirse al chat global
      ablyService.subscribeToChannel('global-chat', (message) => {
        this.globalMessages.push(message.data)
      })
    },

    disconnectFromChat() {
      ablyService.disconnect()
      this.globalMessages = []
      this.privateMessages.clear()
    },

    sendGlobalMessage(content: string, user: any) {
      const message: Message = {
        id: Date.now().toString(),
        content,
        senderId: user.uid,
        senderName: user.displayName || user.email,
        timestamp: new Date()
      }
      
      ablyService.publishMessage('global-chat', message)
      this.globalMessages.push(message)
    },

    startPrivateChat(friendId: string) {
      this.activePrivateChat = friendId
      
      if (!this.privateMessages.has(friendId)) {
        this.privateMessages.set(friendId, [])
      }
      
      // Suscribirse al canal privado
      const channelName = `private-${this.getPrivateChannelName(friendId)}`
      ablyService.subscribeToChannel(channelName, (message) => {
        const messages = this.privateMessages.get(friendId) || []
        messages.push(message.data)
        this.privateMessages.set(friendId, messages)
      })
    },

    sendPrivateMessage(friendId: string, content: string, user: any) {
      const message: Message = {
        id: Date.now().toString(),
        content,
        senderId: user.uid,
        senderName: user.displayName || user.email,
        timestamp: new Date(),
        receiverId: friendId
      }
      
      const channelName = `private-${this.getPrivateChannelName(friendId)}`
      ablyService.publishMessage(channelName, message)
      
      const messages = this.privateMessages.get(friendId) || []
      messages.push(message)
      this.privateMessages.set(friendId, messages)
    },

    getPrivateChannelName(friendId: string): string {
      const currentUserId = useAuthStore().user?.uid
      const users = [currentUserId, friendId].sort()
      return `chat-${users[0]}-${users[1]}`
    },

    getPrivateMessages(friendId: string): Message[] {
      return this.privateMessages.get(friendId) || []
    }
  }
})