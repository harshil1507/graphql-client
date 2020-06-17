import React from 'react';
import { useQuery , useMutation} from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import './FetchAllPosts.css'
let cursor,limit,reverse;
const FETCH_ALL_POSTS = gql`
query FetchAllPosts($authorId : String!){
  FetchAllPosts(authorId : $authorId){
    firstName
    lastName
    posts{
      _id
      title
      date
      votes
    }
  }
}
`
const UPVOTE_POST = gql`
mutation UpVotePost($id: String!, $authorId: String!){
  UpVote(id: $id, authorId: $authorId){
    _id
    title
    votes
  }
}
`
const DELETE_POST = gql`
mutation DeletePost($authorId : String!, $id : String!){
  DeletePost(authorId : $authorId, id:$id){
    _id
    title
    date
    votes   
  }
}`

const NEW_POST = gql`
mutation AddPost($authorId: String!, $title : String!){
  AddPost(authorId:$authorId, title:$title ){
    _id
    title
    votes
  }
}`

const EDIT_AUTHOR = gql`
mutation updateAuthor($id : String!, $firstName: String!, $lastName: String){
  UpdateAuthor(id : $id, firstName: $firstName,lastName: $lastName){
    _id
    firstName
    lastName
  }
}`

const EDIT_POST= gql`
mutation updatePost($authorId : String!, $id : String!, $title: String!){
  UpdatePost(authorId: $authorId, id: $id, title:$title){
    _id
    title
    date
  }
}`

function FetchPosts() : any {
  let postTitle:any,firstName:any,lastName:any,changeTitle: any, dropdown: any;
  let id:string;
  let authorId = window.location.pathname.replace("/author/", "")
  const {loading, error, data} = useQuery(FETCH_ALL_POSTS, {variables: {authorId}});
  const [upvote] = useMutation(UPVOTE_POST);
  const [deletePost] = useMutation(DELETE_POST,{refetchQueries: [{query: FETCH_ALL_POSTS,variables:{authorId}}]});
  const [addPost] = useMutation(NEW_POST, {refetchQueries: [{query: FETCH_ALL_POSTS,variables:{authorId}}]});
  const [editAuthor] = useMutation(EDIT_AUTHOR,{refetchQueries: [{query: FETCH_ALL_POSTS,variables:{authorId}}]});
  const [editPost] = useMutation(EDIT_POST,{refetchQueries: [{query: FETCH_ALL_POSTS,variables:{authorId}}]});
  // const [deletePost] = useMutation(DELETE_POST,{
  //   update(cache,{data }){
  //     console.log(data);
      
  //     const postData:Object = cache.readQuery({query: FETCH_ALL_POSTS,variables:{authorId}}) || {}
  //     console.log(postData, typeof postData, Object.keys(postData));
      
  //     cache.writeQuery({
  //       query : DELETE_POST,
  //       variables: {id,authorId},
  //       data: {postData : postData.FetchAllPosts.filter()}
  //     })
  //   }
  // });

  if (loading) return <p>Loading...</p>;
  if (error) return `Error :( ${error}`;

    return (
      <div>
        <div className='author'>
          <span>{data.FetchAllPosts.firstName + ' '}</span>
          <span>{data.FetchAllPosts.lastName}</span>
        </div>
        {data.FetchAllPosts.posts.map(({ _id,title, date,votes}: {_id : string,title : string, date: Date,votes : number})=>{
          let dateConverted = new Date(date).toDateString() + " "+new Date(date).toLocaleTimeString()
        return(
          <div key={_id}>
            <h3>{title}</h3>
            <span>updated on : {dateConverted}</span>
            <div>
              <button onClick={
                ()=>{deletePost({variables: {id: _id,authorId}})}
                }>
                  Delete Post
              </button>

              <button onClick={
                ()=>{upvote({variables :{id: _id,authorId}})}
                }>
                  <span>&#9195;</span>
              </button>
              <span>Votes : {votes}</span>
            </div>
            {/* <hr/> */}
          </div>
        )
        })}
        <br></br>

        <form
        onSubmit={e => {
          e.preventDefault();
          console.log(postTitle)
          addPost({ variables: { title: postTitle.value, authorId } });
          postTitle.value = '';
        }}
        >
        <input
          ref={node => {
            postTitle = node;
          }}
        />
        <button type="submit">Add Post</button>
      </form>
      <br></br>

      <form onSubmit={e => {
          e.preventDefault();
          console.log(postTitle)
          editPost({ variables: { title: changeTitle.value, authorId:authorId, id : dropdown.value } });
          changeTitle.value = '';
        }}>
        <select name="post" id="post" ref={node => {
            dropdown = node;
          }} >
          {
            data.FetchAllPosts.posts.map(({ _id,title, date,votes}: {_id : string,title : string, date: Date,votes : number})=>(
              <option value={_id}>{title}</option>
            ))
          }
        </select>
        <input  placeholder="Edit title" 
          ref={node => {
          changeTitle = node;
          }}/>
        <input type="submit" value="Edit Post"
          
        />
      </form>

      <hr/>
      <br></br>
      <form
        onSubmit={e => {
          e.preventDefault();
          editAuthor({ variables: { id:authorId, firstName:firstName.value, lastName:lastName.value } });
          firstName.value = '';
          lastName.value = '';
        }}
        >
        <input  placeholder="first name"
          ref={node => {
            firstName = node;
          }}
        />
        <input  placeholder="last name"
          ref={node => {
            lastName = node;
          }}
        />
        <button type="submit">Edit Author</button>
      </form>
      
      
      </div>
    )
}

export default FetchPosts;