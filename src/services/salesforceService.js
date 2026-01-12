// Salesforce API Service for fetching Mejoravit users and their Calendly links
// Uses backend API to avoid CORS issues and keep credentials secure

// API URL - set via environment variable for production
const API_BASE_URL = import.meta.env.VITE_SALESFORCE_API_URL || 'http://localhost:3001';

/**
 * Get all users in the Mejoravit group with their Calendly links
 * @returns {Promise<Array<{id: string, name: string, calendlyLink: string}>>}
 */
export async function getMejoravitUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/mejoravit`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Unknown error from API');
    }
    
    return data.users || [];
  } catch (error) {
    console.error('Error fetching Mejoravit users:', error);
    throw error;
  }
}

/**
 * Build a mapping of Salesforce User ID to Calendly URL
 * @returns {Promise<Record<string, string>>}
 */
export async function getCalendlyLinksMap() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/mejoravit`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Unknown error from API');
    }
    
    return data.calendlyLinks || {};
  } catch (error) {
    console.error('Error fetching Calendly links map:', error);
    throw error;
  }
}

/**
 * Get Calendly link for a specific user ID
 * @param {string} userId - Salesforce User ID
 * @param {string} fallbackUrl - Fallback URL if user not found
 * @returns {Promise<string>}
 */
export async function getCalendlyLinkForUser(userId, fallbackUrl = 'https://calendly.com/guillermo-salazar-futurenergy') {
  try {
    const linksMap = await getCalendlyLinksMap();
    return linksMap[userId] || fallbackUrl;
  } catch (error) {
    console.error('Error getting Calendly link for user:', error);
    return fallbackUrl;
  }
}
