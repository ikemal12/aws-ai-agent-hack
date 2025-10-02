import axios from 'axios'

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const api = {
  // Content generation
  generateContent: (request: any) => 
    apiClient.post('/content/generate', request),
  
  getTopics: () =>
    apiClient.get('/content/topics'),
  
  // Assessment
  evaluateResponses: (request: any) =>
    apiClient.post('/assessment/evaluate', request),
  
  getUserProgress: (userId: string) =>
    apiClient.get(`/assessment/progress/${userId}`),
  
  // User management
  createUser: (userData: any) =>
    apiClient.post('/users/', userData),
  
  getUser: (userId: string) =>
    apiClient.get(`/users/${userId}`),
  
  // System
  getHealth: () =>
    apiClient.get('/health'),
  
  getCapabilities: () =>
    apiClient.get('/agents/capabilities'),
}

export default apiClient