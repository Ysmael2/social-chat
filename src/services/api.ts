
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Datos simulados
let friendsData = {
  users: [
    { id: 'user1', email: 'usuario1@ejemplo.com', name: 'Usuario Uno' },
    { id: 'user2', email: 'usuario2@ejemplo.com', name: 'Usuario Dos' },
    { id: 'user3', email: 'usuario3@ejemplo.com', name: 'Usuario Tres' },
  ],
  friendRequests: [],
  friendships: []
}

export const friendsAPI = {
  // Buscar usuarios
  async searchUsers(query, currentUserId) {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const filteredUsers = friendsData.users.filter(user => 
      user.id !== currentUserId &&
      (user.email.toLowerCase().includes(query.toLowerCase()) ||
       user.name.toLowerCase().includes(query.toLowerCase()))
    )
    
    return { success: true, data: filteredUsers }
  },

  // Enviar solicitud de amistad
  async sendFriendRequest(fromUserId, toUserId) {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const existingRequest = friendsData.friendRequests.find(
      req => req.from === fromUserId && req.to === toUserId
    )
    
    if (existingRequest) {
      return { success: false, error: 'Request already sent' }
    }
    
    friendsData.friendRequests.push({
      id: `req_${Date.now()}`,
      from: fromUserId,
      to: toUserId,
      status: 'pending',
      timestamp: new Date().toISOString()
    })
    
    return { success: true, data: friendsData.friendRequests }
  },

  // Obtener solicitudes pendientes
  async getFriendRequests(userId) {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const requests = friendsData.friendRequests.filter(
      req => req.to === userId && req.status === 'pending'
    )
    
    return { success: true, data: requests }
  },

  // Aceptar/rechazar solicitud
  async respondToFriendRequest(requestId, action) {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const request = friendsData.friendRequests.find(req => req.id === requestId)
    
    if (!request) {
      return { success: false, error: 'Request not found' }
    }
    
    if (action === 'accept') {
      request.status = 'accepted'
      // Crear amistad en ambas direcciones
      friendsData.friendships.push({
        user1: request.from,
        user2: request.to,
        timestamp: new Date().toISOString()
      })
    } else {
      request.status = 'rejected'
    }
    
    return { success: true, data: request }
  },

  // Obtener lista de amigos
  async getFriends(userId) {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const friendships = friendsData.friendships.filter(
      f => f.user1 === userId || f.user2 === userId
    )
    
    const friendIds = friendships.map(f => 
      f.user1 === userId ? f.user2 : f.user1
    )
    
    const friends = friendsData.users.filter(user => 
      friendIds.includes(user.id)
    )
    
    return { success: true, data: friends }
  }
}