export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:4000${endpoint}`, {
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