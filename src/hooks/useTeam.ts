import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';
import { useOrganizations } from './useOrganizations';

export function useTeam() {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentOrganization } = useOrganizations();

  useEffect(() => {
    if (currentOrganization) {
      loadTeamMembers();
    }
  }, [currentOrganization]);

  const loadTeamMembers = async () => {
    if (!currentOrganization) return;

    try {
      const { data, error } = await supabase
        .from('user_organizations')
        .select(`
          user:user_id (
            id,
            email,
            raw_user_meta_data->>name as name,
            raw_user_meta_data->>avatar_url as avatar_url
          ),
          role
        `)
        .eq('organization_id', currentOrganization.id);

      if (error) throw error;

      setTeamMembers(data?.map(item => ({
        ...item.user,
        role: item.role
      })) || []);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teamMembers,
    isLoading,
    refresh: loadTeamMembers
  };
}