// import { defineStore } from 'pinia'
// import axios from 'axios'
// import type { Friend, FriendRequest } from '@/services/types'

// // API REST externa para gestión de amigos
// const API_BASE_URL = 'https://api-ejemplo.com/friends'

// export const useFriendsStore = defineStore('friends', {
//   state: () => ({
//     friends: [] as Friend[],
//     pendingRequests: [] as FriendRequest[],
//     searchResults: [] as Friend[],
//     loading: false
//   }),

//   actions: {
//     async searchUsers(query: string) {
//       this.loading = true
//       try {
//         const response = await axios.get(`${API_BASE_URL}/search`, {
//           params: { query }
//         })
//         this.searchResults = response.data
//       } catch (error) {
//         console.error('Error searching users:', error)
//       } finally {
//         this.loading = false
//       }
//     },

//     async sendFriendRequest(userId: string) {
//       try {
//         await axios.post(`${API_BASE_URL}/requests`, { toUserId: userId })
//       } catch (error) {
//         console.error('Error sending friend request:', error)
//       }
//     },

//     async acceptFriendRequest(requestId: string) {
//       try {
//         await axios.put(`${API_BASE_URL}/requests/${requestId}/accept`)
//         this.loadFriends()
//         this.loadPendingRequests()
//       } catch (error) {
//         console.error('Error accepting friend request:', error)
//       }
//     },

//     async rejectFriendRequest(requestId: string) {
//       try {
//         await axios.put(`${API_BASE_URL}/requests/${requestId}/reject`)
//         this.loadPendingRequests()
//       } catch (error) {
//         console.error('Error rejecting friend request:', error)
//       }
//     },

//     async loadFriends() {
//       try {
//         const response = await axios.get(`${API_BASE_URL}`)
//         this.friends = response.data
//       } catch (error) {
//         console.error('Error loading friends:', error)
//       }
//     },

//     async loadPendingRequests() {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/requests/pending`)
//         this.pendingRequests = response.data
//       } catch (error) {
//         console.error('Error loading pending requests:', error)
//       }
//     }
//   }
// })