import { useState, useCallback } from 'react';

// Default fallback URL - only used if backend doesn't return a calendly link
const DEFAULT_FALLBACK_URL = 'https://calendly.com/guillermo-salazar-futurenergy';

/**
 * Custom hook to manage Calendly links
 * No longer pre-fetches data - relies on backend response after form submission
 * @returns {{
 *   getCalendlyUrl: (userId: string) => string
 * }}
 */
export function useSalesforceCalendly() {
  const [calendlyLinks, setCalendlyLinks] = useState({});

  /**
   * Get Calendly URL for a specific user ID
   * @param {string} userId - Salesforce User ID
   * @returns {string} Calendly URL
   */
  const getCalendlyUrl = useCallback((userId) => {
    if (!userId) {
      return DEFAULT_FALLBACK_URL;
    }

    const url = calendlyLinks[userId];
    
    if (!url) {
      return DEFAULT_FALLBACK_URL;
    }

    return url;
  }, [calendlyLinks]);

  /**
   * Store a calendly link for a user (called after form submission)
   */
  const setCalendlyLink = useCallback((userId, url) => {
    if (userId && url) {
      setCalendlyLinks(prev => ({ ...prev, [userId]: url }));
    }
  }, []);

  return {
    calendlyLinks,
    getCalendlyUrl,
    setCalendlyLink,
  };
}

export { DEFAULT_FALLBACK_URL };
