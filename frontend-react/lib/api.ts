// API utility - handles backend URL configuration
const getApiUrl = () => {
  // In production, use environment variable
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable or default
    return process.env.NEXT_PUBLIC_API_URL || '';
  }
  // Server-side: use environment variable
  return process.env.NEXT_PUBLIC_API_URL || '';
};

// Helper to build full API URL
export const apiUrl = (endpoint: string) => {
  const baseUrl = getApiUrl();
  
  // If baseUrl is set, use it (separate backend)
  if (baseUrl) {
    // Remove leading slash from endpoint if baseUrl already has trailing slash
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${baseUrl}${cleanEndpoint}`;
    if (typeof window !== 'undefined') {
      console.log('🌐 API URL:', fullUrl, '(from NEXT_PUBLIC_API_URL)');
    }
    return fullUrl;
  }
  
  // If no baseUrl, use relative path (Next.js API routes)
  if (typeof window !== 'undefined') {
    console.log('🌐 API URL:', endpoint, '(Next.js API route - NEXT_PUBLIC_API_URL not set)');
  }
  return endpoint;
};

// API endpoints
export const API_ENDPOINTS = {
  chat: () => apiUrl('/api/chat'),
  login: () => apiUrl('/api/auth/login'),
  signup: () => apiUrl('/api/auth/signup'),
  health: () => apiUrl('/api/health'),
};
