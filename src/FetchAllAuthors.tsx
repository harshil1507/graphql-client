import React from 'react';
// import './App.css';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {Link} from 'react-router-dom'; 

let cursor,limit,reverse;
const FETCH_ALL_AUTHORS = gql`
{
  FetchAllAuthors{
    _id
    firstName
    lastName
    posts{
      _id
    }
  }
}
`
const ADD_AUTHOR = gql`
mutation addAuthor($firstName:String!, $lastName: String){
  AddAuthor(firstName:$firstName, lastName:$lastName){
    _id
    firstName
    lastName
  }
}`

const DELETE_AUTHOR = gql`
mutation deleteAuthor($id:String!){
  DeleteAuthor(id:$id)
}`


function FetchAllAuthors() {
  let input1:any, input2: any;
  const {loading, error, data} = useQuery(FETCH_ALL_AUTHORS);
  const [addAuthor] = useMutation(ADD_AUTHOR,{refetchQueries : [{query: FETCH_ALL_AUTHORS}]});
  const [delAuthor] = useMutation(DELETE_AUTHOR, {refetchQueries : [{query : FETCH_ALL_AUTHORS}]});
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.FetchAllAuthors.map(({ _id, firstName,lastName,posts} : {_id : string, firstName: string,lastName : string, posts:[]})=>(
        <div key={_id}>
          <Link to={{
          pathname: '/author/'+_id,
          }}>    
              <h3>{firstName + ' ' + lastName}</h3>
          </Link>
          <span>{posts.length} posts</span>
          <br></br>
          <button className="btn" onClick={
                ()=>{delAuthor({variables: {id: _id}})}
                }>
                  Delete author
              </button>
        </div>
      ))}
      <br></br>
      <form
          onSubmit={e => {
            e.preventDefault();
            addAuthor({ variables: { firstName: input1.value,lastName: input2.value } });
            input1.value = '';
            input2.value = '';
          }}
        >
        <input
         placeholder="first name"
         ref={node => {
            input1 = node;
          }}
        />
        <br></br>
         <input
         placeholder="last name"
          ref={node => {
            input2 = node;
          }}
        />
        <button type="submit">Add Author</button>
      </form>
    </div>
  );
}

export default FetchAllAuthors;
