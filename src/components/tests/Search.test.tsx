import React from 'react'

import Search from '../Search'

import * as RepoAPI from '../../api/searchAPI'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'

import { MemoryRouter } from 'react-router-dom'

const setup = () =>
	render(
		<QueryClientProvider
			client={
				new QueryClient({ defaultOptions: { queries: { retry: false } } })
			}
		>
			<MemoryRouter initialEntries={['/']}>
				<Search />
			</MemoryRouter>
		</QueryClientProvider>
	)

describe('<Search />', () => {
	it('should call the API with the correct inputs', async () => {
		setup()

		const searchSpy = jest.spyOn(RepoAPI, 'searchRepos')

		userEvent.type(screen.getByPlaceholderText(/search/i), 'react')

		await waitFor(() => {
			expect(searchSpy).toHaveBeenCalledTimes(1)
			expect(searchSpy).toHaveBeenCalledWith('react', {
				language: 'default',
				page: 1,
				sort: 'default',
			})
		})
	})
})
