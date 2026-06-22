let maintenanceMode = false;

export function isMaintenance() {
  return maintenanceMode;
}

export function setMaintenance(value: boolean) {
  maintenanceMode = value;
  return maintenanceMode;
}
