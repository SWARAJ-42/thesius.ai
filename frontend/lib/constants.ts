const isProd = process.env.NODE_ENV === "production";

export const BACKEND_URL = isProd 
    ? "http://backend:8000"  // Internal Docker URL for production
    : "http://localhost:8000";  // Localhost for development
