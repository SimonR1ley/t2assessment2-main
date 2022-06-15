import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const EditPost = (props) => {

  const [updatedPost, setUpdatedPost] = useState({
    newMessage: 'props.original',
    id: props.id
  });

  const closeModal = () => {
    props.rerender();
  }

  useEffect(() => {
    document.getElementById('updateText').innerHTML = props.original;
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    setUpdatedPost({ ...updatedPost, newMessage: value });
  }


  const updatePost = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8888/api/updatePost.php', updatedPost)
    .then((res)=>{
      let data = res.data;
      console.log(data); 
      props.uprender(true);
      props.rerender();
    });
  }


  return (
    <div className='modal'>

      <form>
        <h1>Made a Mistake? Edit that shit!</h1>
        <p onClick={closeModal}>Close Modal</p>
        <textarea id='updateText' placeholder='Edit Post Message' onChange={handleChange} />
        <button type='submit'onClick={updatePost}>Edit this post</button>
      </form>
       
    </div>
  )
}

export default EditPost
