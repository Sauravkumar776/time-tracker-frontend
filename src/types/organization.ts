export interface Organization {
    id: string;
    name: string;
    type: 'company' | 'personal';
    logo?: string;
    members: string[];
    createdAt: Date;
  }
  
  export interface UserOrganization {
    userId: string;
    organizationId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
  }