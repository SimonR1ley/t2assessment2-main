import axios from 'axios';
import { useState, useEffect } from 'react';
import PostItem from './PostItem';

function App() {

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

   axios.post('http://localhost:8888/api/addPost.php', postMessage)
    .then((res)=>{
      let data = res.data;
      console.log(data); 
      setRenderPost(true);
    });
 }

 const addUserName = (e) => {
  let userName = e.target.value;
  sessionStorage.setItem('activeUser', userName)
 }
 
  return (
    <div className="App">
      <div className="left">
        <h1>Your Post Timeline</h1>
        <p>Populate the area below with posts from the form to the right...</p>
       
        {posts}
           
      </div>
      <div className="right">
        <form>
          <h3>Add A New Post</h3>
          <input onChange={addUserName} placeholder="Add Username"></input>
          <textarea placeholder="your post here" onChange={postVal}/>
          <button type="submit" onClick={addNewPost}>Add Your New Post</button>
        </form>
      </div>
      
    </div>
  );
}

export default App;
