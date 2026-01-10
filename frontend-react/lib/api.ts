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
    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // Remove trailing slash from baseUrl if present
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;
    if (typeof window !== 'undefined') {
      console.log('🌐 API URL:', fullUrl, '(from NEXT_PUBLIC_API_URL)');
      console.log('🌐 Base URL:', cleanBaseUrl);
      console.log('🌐 Endpoint:', cleanEndpoint);
      console.log('⚠️ If you see this, NEXT_PUBLIC_API_URL is set correctly');
    }
    return fullUrl;
  }
  
  // If no baseUrl, use relative path (Next.js API routes)
  if (typeof window !== 'undefined') {
    console.warn('⚠️ NEXT_PUBLIC_API_URL is NOT set!');
    console.warn('⚠️ Frontend will call Next.js API route instead of Railway backend');
    console.warn('⚠️ This will fail because Next.js route needs env vars (GROQ_API_KEY, etc.)');
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
