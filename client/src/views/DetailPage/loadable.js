import Loadable from 'react-loadable'
import Loader from '../loader'
// loadable:
// https://github.com/jamiebuilds/react-loadable
const DetailPage = Loadable({
    loader: () => import('./DetailPage'),
    loading: Loader
})

export default DetailPage