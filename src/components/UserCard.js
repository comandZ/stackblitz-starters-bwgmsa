import React, { useEffect, useState } from 'react';
import EditUser from './EditUser';
import SearchBar from './SearchBar';
import EditLogo from '../media/editLogo.svg';

let USERS = [];
// Setting USERS as an empty array to hold the original user list
// and mutate the list using the users state
const UserCard = () => {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [isActiveEdit, setIsActiveEdit] = useState(false);
  const [editUser, setEditUser] = useState();

  const fetchUserData = (apiData) => {
    fetch(apiData)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          USERS = result.results;
          setUsers(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetchUserData('https://randomuser.me/api/?results=12&seed=abc');
  }, []);

  // Updating the search keyword and filter to innitiate the filtered
  // function to display only users that match the search criteria
  const updateKeyword = (keywordValue) => {
    setIsSorted(false);
    setKeyword(keywordValue);
  };

  useEffect(() => {
    const filtered = USERS.filter((users) => {
      if (keyword.trim() === '') {
        return true;
      }
      return `${users.name.first.toLowerCase()} ${users.name.last.toLowerCase()}`.includes(
        keyword.toLowerCase()
      );
    });
    setUsers(filtered);
  }, [keyword]);

  // Checking to see if the sort feature is active allowing for
  // a toggle on sorting, then initiates the sorting by city
  // comparing city names alphabetically
  const sortByCity = () => {
    setIsSorted(!isSorted);
  };

  const sortingByCity = (userA, userB) => {
    if (!isSorted) {
      return 0;
    }
    const userInfoA = userA.location.city;
    const userInfoB = userB.location.city;

    if (userInfoA > userInfoB) {
      return 1;
    }
    if (userInfoA < userInfoB) {
      return -1;
    }
    return 0;
  };

  // Initializing edit modal active state to display the edit form
  const clickUserEdit = (editUserInfo) => {
    setIsActiveEdit(!isActiveEdit);
    setEditUser(editUserInfo);
  };

  // User edit callback function for saving the new user information
  const saveUserEdit = (newUserData) => {
    const newUsers = USERS.map((user) => {
      if (user.login.uuid === newUserData.login.uuid) {
        return newUserData;
      }
      return user;
    });
    setUsers(newUsers);
  };

  const isActiveCallback = (isActiveState) => {
    setIsActiveEdit(isActiveState);
  };

  // ======================================
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="topBar">
          <SearchBar keyword={keyword} onChange={updateKeyword} />
          <button className="button" onClick={sortByCity}>
            Sort By City
          </button>
        </div>
        <div className="block">
          {[...users].sort(sortingByCity).map((user, index) => (
            <div key={index} className="userCard">
              <div className="userCard-hd userCard-hd_iconLeft">
                <button
                  className="editButton"
                  onClick={() => clickUserEdit(user)}
                >
                  {/* Using temporary svg */}
                  <img src={EditLogo} alt="Profile Edit Icon" />
                </button>
                <span>
                  {user.name.first} {user.name.last}
                </span>
              </div>
              <div className="userCard-image">
                <img src={user.picture.large} alt="Profile Thumbnail" />
              </div>
              <div className="userCard-info">
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <div>
                  {user.location.city}, {user.location.state}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Using modal method for editing user cards */}
        <EditUser
          isActive={isActiveEdit}
          user={editUser}
          saveUserCallback={saveUserEdit}
          isActiveCallback={isActiveCallback}
        />
      </>
    );
  }
};

export default UserCard;
