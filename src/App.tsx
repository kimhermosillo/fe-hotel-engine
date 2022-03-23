import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
				<h1>Search Github</h1>
				<Routes>
					<Route path='/' element={<Search />} />
					<Route
						path='/repositories/:owner/:repo'
						element={<RepositoryDetails />}
					/>
				</Routes>
			</Router>
		</QueryClientProvider>
	)
}

export default App
