import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Search from './components/Search'
import RepositoryDetails from './components/RepositoryDetails'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes>
					{/* Search */}
					<Route path='/' element={Search} />

					{/* Detail */}
					<Route
						path='/repositories/:owner/:repo'
						element={RepositoryDetails}
					/>

					{/* Default Path */}
					<Route path='/' element={<Navigate to='/' />} />
				</Routes>
			</Router>
		</QueryClientProvider>
	)
}

export default App
