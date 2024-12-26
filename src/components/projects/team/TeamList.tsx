import React from 'react';
import { User } from '../../../types';
import { TeamMemberCard } from './TeamMemberCard';

interface TeamListProps {
  members: User[];
  onRemoveMember: (userId: string) => void;
}

export function TeamList({ members, onRemoveMember }: TeamListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <TeamMemberCard
          key={member.id}
          member={member}
          onRemove={() => onRemoveMember(member.id)}
        />
      ))}
    </div>
  );
}