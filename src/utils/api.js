const BASE_URL = 'http://localhost:3001/api';

/**
 * Fetch all regions with enriched data for the map
 */
export const getMapData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/regions/map/full`);
        if (!response.ok) throw new Error('Failed to fetch map data');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching map data:', error);
        return [];
    }
};

/**
 * Fetch detailed info for a single region
 */
export const getRegionDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/regions/${id}`);
        if (!response.ok) throw new Error('Failed to fetch region details');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching region details:', error);
        return null;
    }
};

/**
 * Analyze any location by latitude and longitude
 */
export const analyzeLocation = async (lat, lng, name) => {
    try {
        const response = await fetch(`${BASE_URL}/regions/analyze?lat=${lat}&lng=${lng}&name=${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error('Failed to analyze location');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error analyzing location:', error);
        return null;
    }
};

/**
 * Get reforestation suggestions
 */
export const getReforestationSuggestions = async (params) => {
    try {
        const response = await fetch(`${BASE_URL}/reforestation/suggest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error('Failed to fetch suggestions');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching reforestation suggestions:', error);
        return null;
    }
};

/**
 * Chat with the EcoAgent AI
 */
export const chatWithAgent = async (message, context = {}) => {
    try {
        const response = await fetch(`${BASE_URL}/ai/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context })
        });
        if (!response.ok) throw new Error('Failed to chat with agent');
        const data = await response.json();
        return data.data.reply;
    } catch (error) {
        console.error('Error in agent chat:', error);
        return "I'm having trouble connecting to the neural core. Please check my synchronization status.";
    }
};
