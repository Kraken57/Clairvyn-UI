/**
 * Legacy module name kept to avoid churn in imports.
 * Investor preview mode has been removed; production uses Firebase ID tokens only.
 */
export function skipOptionalBackendIntegrations(): boolean {
  return false
}
