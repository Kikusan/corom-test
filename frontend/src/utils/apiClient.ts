export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_BASE_URL
    const response = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    if (response.status === 204)
        return;

    return response.json();
};