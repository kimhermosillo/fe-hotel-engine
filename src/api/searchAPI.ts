import axios from 'axios'

import { Repository } from '../utils/Repository'

export interface RepoSearchOptions {
	page: number
	sort: string
	language?: string
}

export interface RepoSearchResponse {
	items: Repository[]
	total_count: number
}

export const searchRepos = async (
	query: string,
	options: RepoSearchOptions
): Promise<RepoSearchResponse> => {
	const { page, sort = '', language = '' } = options
	const queryString = `q=${query}+language:${language}&page=${page}&sort=${sort}&per_page=20`
	const error = `We're having trouble fetching your search, please try again.`

	try {
		const { status, data } = await axios.get(
			`https://api.github.com/search/repositories?${queryString}`
		)

		if (status === 403) throw new Error(error)

		return data
	} catch (err) {
		throw new Error(error)
	}
}

export const getRepo = (owner: string, repo: string) => {
	return axios
		.get(`https://api.github.com/repos/${owner}/${repo}`)
		.then((res) => res.data)
		.catch((error) => {
			throw new Error(error.message)
		})
}
