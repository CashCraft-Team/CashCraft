/**
 * Unicode-safe base64 encoding utilities
 */

export function encodeUnicode(str: string): string {
  try {
    // Convert Unicode string to base64
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(Number.parseInt(p1, 16))
      }),
    )
  } catch (error) {
    // Fallback to URI encoding if btoa fails
    return encodeURIComponent(str)
  }
}

export function decodeUnicode(str: string): string {
  try {
    // Try base64 decoding first
    const decoded = atob(str)
    return decodeURIComponent(
      Array.prototype.map
        .call(decoded, (c: string) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(""),
    )
  } catch (error) {
    // Fallback to URI decoding
    return decodeURIComponent(str)
  }
}

export function safeJsonStringify(obj: any): string {
  try {
    return JSON.stringify(obj)
  } catch (error) {
    console.error("JSON stringify failed:", error)
    return "{}"
  }
}

export function safeJsonParse(str: string): any {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.error("JSON parse failed:", error)
    return null
  }
}
