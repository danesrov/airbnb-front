export function getInitials(fullName: string): string {
  if (!fullName) return ""
  const clean = fullName.trim().replace(/\s+/g, " ")

  const parts = clean.split(" ")

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  const first = parts[0].charAt(0).toUpperCase()
  const last = parts[parts.length - 1].charAt(0).toUpperCase()

  return first + last
}