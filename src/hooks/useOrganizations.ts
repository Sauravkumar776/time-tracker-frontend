import { useState, useEffect } from 'react';
import { Organization } from '../types/organization';
import { supabase } from '../lib/supabase';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const { data: userOrgs } = await supabase
        .from('user_organizations')
        .select(`
          organization:organizations (*)
        `)
        .eq('user_id', supabase.auth.user()?.id);

      if (userOrgs) {
        const orgs = userOrgs.map(uo => uo.organization);
        setOrganizations(orgs);
        
        // Set first org as current if none selected
        if (!currentOrganization && orgs.length > 0) {
          setCurrentOrganization(orgs[0]);
        }
      }
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchOrganization = async (organizationId: string) => {
    const org = organizations.find(o => o.id === organizationId);
    if (org) {
      setCurrentOrganization(org);
      // Store preference
      localStorage.setItem('currentOrganizationId', organizationId);
    }
  };

  return {
    organizations,
    currentOrganization,
    isLoading,
    switchOrganization,
  };
}