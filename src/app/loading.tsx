import cx from 'classnames'

import Spinner from '@/components/spinner'

const Loading = () => {
  return (
    <div className={cx('min-h-screen flex items-center justify-center')}>
      <Spinner />
    </div>
  )
}

export default Loading
