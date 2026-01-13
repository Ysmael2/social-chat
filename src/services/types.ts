export interface UserData {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface AuthState {
  user: UserData | null
  loading: boolean
  error: string | null
}

export interface Friend {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface FriendRequest {
  id: string
  fromUser: Friend
  toUserId: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
}

export interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  timestamp: Date
  receiverId?: string
}