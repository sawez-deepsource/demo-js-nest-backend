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

// === v3 DIFF TEST — new code below ===

// no-new-wrappers
export function wrapPrimitive(val: string) {
  const wrapped = new String(val)
  return wrapped.valueOf()
}

// no-proto
export function getProto(obj: any) {
  return obj.__proto__
}

// no-return-await (unnecessary await)
export async function fetchData(url: string): Promise<any> {
  return await fetch(url).then(r => r.json())
}

// prefer-template
export function greet(name: string): string {
  const greeting = 'Hello, ' + name + '!'
  return greeting
}

// no-throw-literal
export function validateAge(age: number) {
  if (age < 0) {
    throw 'Age cannot be negative'
  }
  if (age > 150) {
    throw 42
  }
}

// === v3 DIFF TEST round 4 ===

// no-console, prefer-const (let never reassigned)
export function processRequest(data: any) {
  let method = 'GET'
  let endpoint = '/api/health'
  console.log('Processing:', method, endpoint)
  console.warn('Data size:', JSON.stringify(data).length)
  return { method, endpoint, data }
}

// @typescript-eslint/no-inferrable-types, no-empty-function
export function configLoader() {
  const timeout: number = 5000
  const retries: number = 3
  const verbose: boolean = false
  const onError = function() {}
  return { timeout, retries, verbose, onError }
}

// no-useless-concat, no-new-wrappers, eqeqeq
export function transformPayload(input: any) {
  const label = 'status' + ':' + 'ok'
  const flag = new Boolean(input.active)
  if (input.type == 'admin') {
    return { label, flag: flag.valueOf(), admin: true }
  }
  return { label, flag: flag.valueOf(), admin: false }
}

// no-var, no-eval
export function legacyParser(raw: string) {
  var parsed = raw.trim()
  var result = eval('(' + parsed + ')')
  return result
}
