import { useState, useEffect, useCallback } from 'react';
import { getCalendlyLinksMap, getMejoravitUsers } from '../services/salesforceService';

// Default fallback links in case Salesforce API fails
const DEFAULT_CALENDLY_LINKS = {
  '005V500000CEMMjIAP': 'https://calendly.com/guillermo-salazar-futurenergy', // Willy
  '005V5000009xlSLIAY': 'https://calendly.com/eduardo-soto-futurenergy/revision-de-claridad-paneles-solares-futurenergy', // Lalo Soto
  '005V500000CzUqLIAV': 'https://calendly.com/victor-ferrigno-futurenergy/30min', // Victor 
  '005Hr00000H1N0OIAV': 'https://calendly.com/ventas-futurenergy/30min', // Caro
};

const DEFAULT_FALLBACK_URL = 'https://calendly.com/guillermo-salazar-futurenergy';

/**
 * Custom hook to fetch and manage Calendly links from Salesforce
 * @returns {{
 *   calendlyLinks: Record<string, string>,
 *   mejoravitUsers: Array<{id: string, name: string, calendlyLink: string}>,
 *   isLoading: boolean,
 *   error: Error | null,
 *   refetch: () => Promise<void>,
 *   getCalendlyUrl: (userId: string) => string
 * }}
 */
export function useSalesforceCalendly() {
  const [calendlyLinks, setCalendlyLinks] = useState(DEFAULT_CALENDLY_LINKS);
  const [mejoravitUsers, setMejoravitUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch both users list and links map
      const [users, linksMap] = await Promise.all([
        getMejoravitUsers(),
        getCalendlyLinksMap(),
      ]);

      setMejoravitUsers(users);
      
      // Merge with default links (Salesforce data takes priority)
      setCalendlyLinks(prevLinks => ({
        ...prevLinks,
        ...linksMap,
      }));

      console.log('✅ Salesforce Calendly links loaded:', linksMap);
      console.log('✅ Mejoravit users loaded:', users);
    } catch (err) {
      console.error('❌ Error fetching Salesforce data:', err);
      setError(err);
      // Keep using default/fallback links on error
      console.log('⚠️ Using fallback Calendly links');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Get Calendly URL for a specific user ID
   * @param {string} userId - Salesforce User ID
   * @returns {string} Calendly URL
   */
  const getCalendlyUrl = useCallback((userId) => {
    if (!userId) {
      console.warn('No userId provided, using fallback URL');
      return DEFAULT_FALLBACK_URL;
    }

    const url = calendlyLinks[userId];
    
    if (!url) {
      console.warn(`No Calendly link found for user ${userId}, using fallback URL`);
      return DEFAULT_FALLBACK_URL;
    }

    return url;
  }, [calendlyLinks]);

  return {
    calendlyLinks,
    mejoravitUsers,
    isLoading,
    error,
    refetch: fetchData,
    getCalendlyUrl,
  };
}

export { DEFAULT_CALENDLY_LINKS, DEFAULT_FALLBACK_URL };
