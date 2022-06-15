import React, {useState} from 'react'
import axios from 'axios';
import EditPost from './EditPost';


const PostItem = (props) => {

  const [modal, setModal] = useState();
  let UserName = sessionStorage.getItem('activeUser');

  const editPost = () => {
    setModal(<EditPost upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId}/>);
  }

  const deletePost = () => {
    if(window.confirm("Are you sure you want to delete this post?") === true){
      
      let postId = {id: props.uniqueId}

      axios.post('http://localhost:8888/api/deletePost.php', postId)
      .then((res)=>{
        let data = res.data;
        console.log(data); 
        props.rerender(true);
      });



    } else{
      console.log("The user did not delete the post");
    }
  }

  return (
    <div>
       {modal}
    <div className="post_item">
          <h3>{UserName}</h3>
          <h5>{props.date}</h5>
          <p>{props.message}</p>
          <div className="postUi">
            <div className="edit" onClick={editPost}>Edit Post</div>
            <div className="delete" onClick={deletePost}>Delete Post</div>
          </div>
        </div>
    </div>
  )
}

export default PostItem
