import React from 'react';

// Importation du composant Account.
import Account from '../components/Account';
import EditUsername from '../components/EditUsername';

const User = () => {
  return (
    <main className="main bg-dark">
      <div className="header">
        <EditUsername />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
    </main>
  );
};

export default User;