import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

import loading from 'images/loading/loading.json'

const Loading = () => {
  return <Player autoplay loop src={loading} style={{ height: '300px', width: '300px' }} />
}

export default Loading
