export function getInitials(fullName: string): string {
	if (!fullName) return 'AN'
	const parts = fullName.trim().split(/\s+/)
	const firstName = parts[0] || ''
	const lastName = parts[1] || ''
	if (firstName && lastName) {
		return `${firstName[0]}${lastName[0]}`.toUpperCase()
	}
	return firstName.slice(0, 2).toUpperCase()
}
