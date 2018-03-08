/**
 *
 * Asynchronously loads the component for BoardContainer
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
})
