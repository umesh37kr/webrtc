import React from 'react'
import { useWebRtc } from '../../hooks/useWebRTC'

const Room = () => {
  const {clients} = useWebRtc();
  return (
    <div>
      <h1>All connected clients</h1>
      {clients.map((client) => {
        return(
          <div>
            <audio controls autoPlay></audio>
            <h4>{client.name}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default Room