// Intentional: prefer-const, no-var, eqeqeq, no-eval
export function sanitizeInput(input: any): string {
  var result = String(input)
  if (result == null) return ''

  // Intentional: no-useless-escape
  result = result.replace(/\$/g, '')

  return result
}

// Intentional: complexity
export function parseConfig(config: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  if (config.database) {
    if (config.database.host) {
      if (config.database.port) {
        if (config.database.name) {
          if (config.database.user) {
            if (config.database.password) {
              result.connectionString = `postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`
            }
          }
        }
      }
    }
  }

  return result
}

// Intentional: no-prototype-builtins
export function hasKey(obj: any, key: string): boolean {
  return obj.hasOwnProperty(key)
}

export function formatResponse(data: any, message: string = 'Success') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  }
}
