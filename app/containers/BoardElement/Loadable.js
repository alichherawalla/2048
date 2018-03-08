/**
 *
 * Asynchronously loads the component for Box
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
})
