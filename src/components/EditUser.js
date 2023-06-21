import * as React from 'react';
import { useState } from 'react';

const EditUser = ({ user, isActive, saveUserCallback, isActiveCallback }) => {
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhoneNumber, setUserPhoneNumber] = useState();
  const [userCity, setUserCity] = useState();
  const [userState, setUserState] = useState();

  // Passing the newUserData back to the UserCard to populate
  // the edited user information
  const submitUserEdit = (e) => {
    e.preventDefault();
    console.log('Event', e);
    const newUserData = { ...user };

    if (userFirstName) {
      newUserData.name.first = userFirstName;
    }
    if (userLastName) {
      newUserData.name.last = userLastName;
    }
    if (userEmail) {
      newUserData.email = userEmail;
    }
    if (userPhoneNumber) {
      newUserData.phone = userPhoneNumber;
    }
    if (userCity) {
      newUserData.location.city = userCity;
    }
    if (userState) {
      newUserData.location.state = userState;
    }
    saveUserCallback(newUserData);
    isActiveCallback(false);
    clearFormValue();
  };

  // Resetting form field values to avoid conflicting
  // information from editing further users
  const clearFormValue = () => {
    setUserFirstName();
    setUserLastName();
    setUserEmail();
    setUserPhoneNumber();
    setUserCity();
    setUserState();
  };

  // Adding a closeModal function for alternative methods
  // of closing modal
  const closeModal = () => {
    isActiveCallback(false);
  };

  const changeEditField = (fieldName, fieldValue) => {
    if (fieldName === 'firstName') {
      setUserFirstName(fieldValue);
    }
    if (fieldName === 'lastName') {
      setUserLastName(fieldValue);
    }
    if (fieldName === 'email') {
      setUserEmail(fieldValue);
    }
    if (fieldName === 'phoneNumber') {
      setUserPhoneNumber(fieldValue);
    }
    if (fieldName === 'city') {
      setUserCity(fieldValue);
    }
    if (fieldName === 'state') {
      setUserState(fieldValue);
    }
  };

  return (
    <>
      {isActive && (
        <div className="modal" onClick={closeModal}>
          <form
            onSubmit={submitUserEdit}
            className="editModal"
            onClick={(e) => e.stopPropagation()}
          >
            <label className="editModal-input">
              <span>First Name:</span>
              <input
                className="inputStyle"
                type="text"
                name="firstName"
                defaultValue={user.name.first}
                value={userFirstName}
                onChange={(e) => changeEditField('firstName', e.target.value)}
              />
            </label>
            <label className="editModal-input">
              <span>Last Name:</span>
              <input
                className="inputStyle"
                type="text"
                name="lastName"
                defaultValue={user.name.last}
                value={userLastName}
                onChange={(e) => changeEditField('lastName', e.target.value)}
              />
            </label>
            <label className="editModal-input editModal-input_full">
              <span>Email:</span>
              <input
                className="inputStyle"
                type="email"
                name="email"
                defaultValue={user.email}
                value={userEmail}
                onChange={(e) => changeEditField('email', e.target.value)}
              />
            </label>
            <label className="editModal-input editModal-input_full">
              <span>Phone Number:</span>
              <input
                className="inputStyle"
                type="phone"
                name="phoneNumber"
                defaultValue={user.phone}
                value={userPhoneNumber}
                onChange={(e) => changeEditField('phoneNumber', e.target.value)}
              />
            </label>
            <label className="editModal-input">
              <span>City:</span>
              <input
                className="inputStyle"
                type="text"
                name="city"
                defaultValue={user.location.city}
                value={userCity}
                onChange={(e) => changeEditField('city', e.target.value)}
              />
            </label>
            <label className="editModal-input">
              <span>State:</span>
              <input
                className="inputStyle"
                type="text"
                name="state"
                defaultValue={user.location.state}
                value={userState}
                onChange={(e) => changeEditField('state', e.target.value)}
              />
            </label>
            <button className="editModal-button" type="submit">
              Submit
            </button>
            <button
              className="editModal-button editModal-button_cancel"
              onClick={closeModal}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUser;
