/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';

const AppContext = React.createContext();

//Defining provider function to provide data to any components wrapped inside it
const AppProvider = ({ children }) => {
  const [logIn, setLogIn] = useState(false);
  const [loginObj, setLoginObj] = useState(null);
  const [savesCount, setSavesCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [searching, setSearching] = useState(false);

  const url = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_ADDRESS}/items`;
  const urlSaveUSer = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_ADDRESS}/user`;

  useEffect(() => {
    const saveUser = async () => {
      try {
        const response = await fetch(urlSaveUSer, {
          method: 'POST',
          body: JSON.stringify(loginObj),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: 'Bearer ' + loginObj.access_token,
          },
        });
        const data = await response.json();
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        userDetails._id = data.data._id;
        userDetails.access_token = loginObj.access_token;
        sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
      } catch (err) {
        console.log(err, 'Fail');
      }
    };
    if (loginObj) saveUser();
  }, [loginObj]);

  useEffect(() => {
    const search = async () => {
      setSearching(true);
      const response = await fetch(`${url}/search/${searchTerm}`);
      const data = await response.json();
      setSearchData(data.data.items);
      setSearching(false);
    };

    if (searchTerm) search();
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        logIn,
        setLogIn,
        loginObj,
        setLoginObj,
        savesCount,
        setSavesCount,
        postsCount,
        setPostsCount,
        searchTerm,
        setSearchTerm,
        searchData,
        setSearchData,
        searching,
        setSearching,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };