import React from 'react'
import NotificationItemAtom from '../atomos/NotificationItemAtom';

function NotificationListMolecule({ data }) {
    return (
      <div className="my-2">
        {data.map((item) => (
          <NotificationItemAtom key={item.id} notificacion={item} />
        ))}
      </div>
    );
  };

export default NotificationListMolecule