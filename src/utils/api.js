// ============================================================
// CENTRAL API UTILITY
// To switch to hosted backend, update VITE_API_BASE_URL in .env
// e.g. VITE_API_BASE_URL=https://your-backend.onrender.com/api
// ============================================================
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

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

/**
 * Get dashboard overview statistics
 */
export const getDashboardStats = async () => {
    try {
        const response = await fetch(`${BASE_URL}/dashboard/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return null;
    }
};

/**
 * Get detection/alert zones
 */
export const getDetectionZones = async () => {
    try {
        const response = await fetch(`${BASE_URL}/detection/analyze`);
        if (!response.ok) throw new Error('Failed to fetch detection zones');
        return await response.json();
    } catch (error) {
        console.error('Error fetching detection zones:', error);
        return [];
    }
};

/**
 * Mark a detection zone as reviewed
 */
export const markZoneReviewed = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/detection/zones/${id}/review`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Failed to mark zone as reviewed');
        return await response.json();
    } catch (error) {
        console.error('Error marking zone as reviewed:', error);
        return null;
    }
};

/**
 * Calculate impact growth for a reforestation project
 */
export const calculateImpactGrowth = async (params) => {
    try {
        const response = await fetch(`${BASE_URL}/impact/growth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });
        if (!response.ok) throw new Error('Failed to calculate impact');
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error calculating impact growth:', error);
        return null;
    }
};
