/* eslint-disable react-hooks/exhaustive-deps */
import './items.css';
import { useEffect, useState } from 'react';
import Loading from '../../images/loading.svg';
import ItemCard from './itemCard';
import { useGlobalContext } from '../../authContext';

const Items = () => {
  const [itemData, setItemData] = useState(null);
  const [user, setUser] = useState(null);
  const { logIn, setLogIn } = useGlobalContext();

  const url = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_LOCALHOST}:${process.env.REACT_APP_PORT}/${process.env.REACT_APP_ADDRESS}/items`;

  const checkLogin = () => {
    setUser(JSON.parse(sessionStorage.getItem('userDetails')));
  };

  useEffect(() => {
    const fetchData = async () => {
      checkLogin();
      try {
        const response = await fetch(url);
        const data = await response.json();
        setItemData(data.data.items);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // setLogIn(true);
    console.log(logIn);
  }, [logIn]);
  if (!itemData)
    return (
      <>
        <div id='loader'>
          <img className='loader' src={Loading} alt='loaing...' />
        </div>
      </>
    );
  return (
    <>
      <div className='allItems'>
        {itemData &&
          itemData.map((data, index) => {
            return <ItemCard key={index} data={data} user={user} />;
          })}
      </div>
    </>
  );
};
export default Items;
