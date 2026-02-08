import type { AdminPermissions } from './firebase';

export function checkAdminPermission(permission: keyof AdminPermissions): boolean {
  const role = localStorage.getItem('ogn-admin-role');
  if (role === 'master') return true;

  try {
    const stored = localStorage.getItem('ogn-admin-permissions');
    if (stored) {
      const perms = JSON.parse(stored) as AdminPermissions;
      return perms[permission] === true;
    }
  } catch { /* fall through */ }

  return false;
}
