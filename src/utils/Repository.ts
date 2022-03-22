export interface Owner {
	avatar_url: string
	login: string
}

export interface Repository {
	id: number
	name: string
	full_name: string
	html_url: string
	description: string
	language: string
	// Counts
	stargazers_count: number
	subscribers_count: number
	forks_count: number
	open_issues_count: number
	// owner
	owner: Owner
}
