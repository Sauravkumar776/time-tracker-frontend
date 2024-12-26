import React from 'react';
import { User } from '../../../types';
import { Mail, Phone, X } from 'lucide-react';

interface TeamMemberCardProps {
  member: User;
  onRemove: () => void;
}

export function TeamMemberCard({ member, onRemove }: TeamMemberCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 relative">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-xl font-semibold text-blue-600">
            {member.firstName.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{member.firstName}</h4>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{member.email}</span>
        </div>
        {member.email && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{member.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}