import Loadable from 'react-loadable'
import Loader from '../loader'
// loadable:
// https://github.com/jamiebuilds/react-loadable
const SearchPage = Loadable({
    loader: () => import('./SearchPage'),
    loading: Loader
})

export default SearchPage