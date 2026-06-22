import { verifyAdminToken } from '@/lib/auth';

let maintenanceMode = false;

export function isMaintenance() {
  return maintenanceMode;
}

export function setMaintenance(value: boolean) {
  maintenanceMode = value;
  return maintenanceMode;
}

export function verifyAdminRequest(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|;)\s*admin_session=([^;]+)/);
  if (!match) {
    return false;
  }
  const token = decodeURIComponent(match[1]);
  return verifyAdminToken(token);
}
