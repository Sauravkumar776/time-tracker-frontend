import { useAuthStore } from '../store/authStore';

type Permission = 'view_reports' | 'manage_users' | 'manage_projects' | 'view_invoices' | 'manage_team';

const rolePermissions: Record<string, Permission[]> = {
  admin: ['view_reports', 'manage_users', 'manage_projects', 'view_invoices', 'manage_team'],
  manager: ['view_reports', 'manage_projects', 'view_invoices', 'manage_team'],
  employee: ['view_reports'],
};

export function useRoleAccess() {
  const user = useAuthStore(state => state.user);

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return rolePermissions[user.role]?.includes(permission) ?? false;
  };

  return { hasPermission };
}