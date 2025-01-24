import React from 'react';
import { Building2, User } from 'lucide-react';
import { useOrganizations } from '../../hooks/useOrganizations';
import { Organization } from '../../types/organization';

export function OrganizationSwitcher() {
  const { organizations, currentOrganization, switchOrganization } = useOrganizations();

  return (
    <div className="relative">
      <select
        value={currentOrganization?.id}
        onChange={(e) => switchOrganization(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white"
      >
        <option value="">Select Organization</option>
        <optgroup label="Personal">
          {organizations
            .filter(org => org.type === 'personal')
            .map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))
          }
        </optgroup>
        <optgroup label="Companies">
          {organizations
            .filter(org => org.type === 'company')
            .map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))
          }
        </optgroup>
      </select>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        {currentOrganization?.type === 'personal' ? (
          <User className="w-5 h-5 text-gray-500" />
        ) : (
          <Building2 className="w-5 h-5 text-gray-500" />
        )}
      </div>
    </div>
  );
}