import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'

import { getRepo } from '../api/searchAPI'

import { Icon, Loader, Popup } from 'semantic-ui-react'

import { Repository } from '../utils/Repository'

import './RepositoryDetails.scss'

const RepositoryDetail = () => {
	const { owner: ownerParam, repo } = useParams()
	const { data, isLoading, error } = useQuery<Repository, Error>(
		[ownerParam, repo],
		() => getRepo(ownerParam!, repo!)
	)

	if (isLoading) {
		return <Loader active={isLoading} />
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
		<main className='app'>
			{error && <p>{error.message}</p>}
			{data && (
				<article className='ui padded segment'>
					<header>
						<div className='repo__title-container'>
							<h1 className='repo__title'>{name}</h1>

							<div className='repo__links'>
								<Popup
									content='Back to search'
									trigger={
										<Link to='/' aria-label='Back to search'>
											<Icon name='arrow left' />
										</Link>
									}
								/>
								<Popup
									content='View on Github'
									trigger={
										<a
											href={html_url}
											target='_blank'
											rel='noreferrer'
											aria-label='View on Github'
										>
											<Icon name='github' />
										</a>
									}
								/>
							</div>
						</div>

						<div className='repo__owner'>
							<img
								className='ui avatar image'
								width='50'
								height='50'
								src={avatar_url}
								alt={login}
							/>
							<span>{login}</span>
						</div>
					</header>

					<p className='headings'>Description:</p>
					<p> {description}</p>
					<p className='headings'>Stars: </p>
					<p> {stargazers_count}</p>
					<p className='headings'>Subscribers: </p>
					<p>{subscribers_count}</p>
					<p className='headings'>Forks: </p>
					<p>{forks_count}</p>
					<p className='headings'>Open issues: </p>
					<p> {open_issues_count}</p>
				</article>
			)}
		</main>
	)
}

export default RepositoryDetail
