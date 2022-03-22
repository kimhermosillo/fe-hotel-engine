import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { getRepo } from '../api/searchAPI'

import { Repository } from '../utils/Repository'

const RepositoryDetail = () => {
	const { owner: ownerParam, repo } = useParams()
	const { data, isLoading, error } = useQuery<Repository, Error>(
		[ownerParam, repo],
		() => getRepo(ownerParam!, repo!)
	)

	if (isLoading) {
		return <div>I'M LOADINNNNNG</div>
	}

	const {
		name,
		description,
		owner,
		html_url,
		stargazers_count = 0,
		subscribers_count = 0,
		forks_count = 0,
		open_issues_count = 0,
	} = data || {}

	const { avatar_url, login } = owner || {}

	return (
		<main>
			{error && <p>{error.message}</p>}
			{data && (
				<article>
					<header>
						<div>
							<h1>{name}</h1>
						</div>

						<div>
							<img width='50' height='50' src={avatar_url} alt={login} />
							<span>{login}</span>
						</div>
					</header>

					<p>{description}</p>
				</article>
			)}
		</main>
	)
}

export default RepositoryDetail
