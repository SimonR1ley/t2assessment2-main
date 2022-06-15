import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import PostItem from './components/PostItem'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate();

    const [userId, setUserId] = useState({
        activeUser: sessionStorage.getItem('activeUser'),
    });

    const [posts, setPosts] = useState();
    const [postMessage, setPostMessage] = useState({
      message: '', 
      user: sessionStorage.getItem('activeUser'),
    });

    const [renderPost, setRenderPost] = useState();

    useEffect(()=>{
      const userSession = sessionStorage.getItem('activeUser');
      console.log(userSession);
    if(userSession === '' || userSession === undefined){
    navigate('/');
    }
    }, []);

  
    useEffect(()=>{

      axios.post('http://localhost:8888/api/readUserPosts.php', userId)
      .then((res)=>{
        let data = res.data;
        let renderPost = data.map((item) =>  <PostItem key={item.id} rerender={setRenderPost} uniqueId={item.id} userpost={item.userpost} date={item.timestamp} message={item.message}  />);
        console.log(data);
        setPosts(renderPost);
        setRenderPost(false);
        
      })
      .catch(err=>{
        console.log(err);
      });

   },[renderPost]);

   const postVal = (e) => {
    let messageVal = e.target.value;
    setPostMessage({...postMessage, message: messageVal});
   }

   const addNewPost = (e) => {
     e.preventDefault();
     document.getElementById('textMes').value = "";
     axios.post('http://localhost:8888/api/addPost.php', postMessage)
      .then((res)=>{
        let data = res.data;
        console.log(data); 
        setRenderPost(true);
      });
   }

   const setLogout = () => {
      sessionStorage.setItem('activeUser','');
      navigate('/');
   }


  return (
    <div className='dash'>
      <h1>Your Timeline</h1>
      <p onClick={setLogout}>Logout</p>
      <p>Lets create a library of cringe</p>
      <div className='posts'>
        {posts}
      </div>
      <div className='form'>
        <form>
          <p>Add New Post</p>
            <textarea id='textMes' placeholder='New Post Message' onChange={postVal} />
            <button type='submit' onClick={addNewPost}>Add Post To Timeline</button>
        </form>
      </div>
   
    </div>
  )
}

export default Dashboard
