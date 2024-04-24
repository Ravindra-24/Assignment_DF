import React from 'react'
import ReactLoading from 'react-loading'

function SpinningBubble({ size }) {
  return (
    <div style={{ height:"100vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ReactLoading width={size ?? 30} type="spinningBubbles" color="black" />
      <h4>Please Wait...</h4>
    </div>
  )
}

export default SpinningBubble