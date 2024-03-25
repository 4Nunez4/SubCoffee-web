import React from 'react'
import InfoChat from './plantillas/InfoChat';
import SubastaInfoUser from './plantillas/SubastaInfoUser';
import NotificationBar from './organismos/NotificationBar';

function ChatInfo() {
  return (
    <div className='p-4'>
      <div className="grid grid-cols-2">
        <InfoChat />
        <SubastaInfoUser />
      </div>
      <NotificationBar />
    </div>
  )
}

export default ChatInfo
