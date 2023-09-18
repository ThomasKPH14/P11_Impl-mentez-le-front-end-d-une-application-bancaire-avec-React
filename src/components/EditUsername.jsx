import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserUsername } from '../slices/authSlice';

function EditUsername() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [userName, setUsername] = useState(user?.userName || '');
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');

    if (storedFirstName && storedLastName) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, []);

  useEffect(() => {
    if (user?.userName != null) {
      setUsername(user.userName);
    }

    if (user?.firstName && user?.lastName) {                // Ajout de cette partie pour conserver firstname et lastname malgrès l'actualisation
      setFirstName(user.firstName);
      setLastName(user.lastName);
      
      localStorage.setItem('firstName', user.firstName);
      localStorage.setItem('lastName', user.lastName);
    }
  }, [user]);

  const handleSave = async () => {
    await dispatch(updateUserUsername({ username: userName, token }));
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing && (
        <>
          <h1>Welcome back<br />{firstName} {lastName} !</h1>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
        </>
      )}
      
      {isEditing && (
        <>
          <h2>Edit user info</h2>
          <div className='input-edit'>
            <div className="input-edit-input">
              <label htmlFor="username">User name:</label>
              <input type="text" id='username' value={userName} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-edit-input">
              <label htmlFor="firstname">First name:</label>
              <input className="read-only-input" type="text" id='firstname' value={user ? user.firstName : ''} readOnly />
            </div>
            <div className="input-edit-input">
              <label htmlFor="lastname">Last name:</label>
              <input className="read-only-input" type="text" id='lastname' value={user ? user.lastName : ''} readOnly />
            </div>
            <div className='edit-button-confirm'>
              <button className="edit-button" onClick={handleSave}>Save</button>
              <button className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditUsername;
