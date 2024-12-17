const isProd = process.env.NODE_ENV === "production";

export const BACKEND_URL = isProd 
    ? "http://thesius-ai.centralindia.cloudapp.azure.com:8000"
    : "http://localhost:8000";
