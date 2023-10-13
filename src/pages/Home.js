import React, { useEffect, useState } from 'react';
import Posts from '../components/Posts';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Home() {

  const dataApi = "https://jsonplaceholder.typicode.com/posts";

  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() =>{

    // //fetch the data from API by using fetch 
    // //---------------------------------------
    // const fetchDataByFetch = async () =>{
    //   setAppState({loading: true});
    //   //set timeout for 1.5 seconds
    //   const timeoutId = setTimeout( async () => {
    //     try{
    //       const data = await fetch(dataApi);
    //       const items = await data.json();
    //       setAppState({loading: false, posts: items.slice(0,5)})    
    //     }
    //     catch (error){
    //       //log the error in console
    //       console.log("Error: " + error);
    //     }
    //   }, "1500"); //1.5 seconds

    //   //clear the timeout in case the component exit accidentally.
    //   return () => {
    //     clearTimeout(timeoutId);
    //   };
    // };

    //fetch the data from API by using axios
    //---------------------------------------
    const fetchDataByAxios = async () =>{
      setAppState({loading: true});
      //set timeout for 1.5 seconds
      const timeoutId = setTimeout(async () => {
        try{
          const data = await axios.get(dataApi);
          setAppState({loading: false, posts: data.data.slice(0,5)});
        }
        catch (error){
          //log the error to console
          console.log("Error: " + error);
        }
      }, "1500"); //1.5 seconds

      //clear the timeout in case the component exit accidentally.
      return () => {
        clearTimeout(timeoutId);
      };    
    }

    //fetchDataByFetch();
    fetchDataByAxios();
  },[]);

  return (
    <div>
      {appState.loading ? (<Spinner />) : (<Posts isLoading={appState.loading} posts={appState.posts}/>)}
    </div>
  );

}
export default Home;
