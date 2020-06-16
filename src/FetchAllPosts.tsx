import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

let cursor,limit,reverse;
const FETCH_ALL_POSTS = gql`
query FetchAllPosts($authorId : String!){
  FetchAllPosts(authorId : $authorId){
    _id
    title
    date
  }
}
`
function FetchAllPosts({authorId} : {authorId : string}) : any {
  
  // authorId = "5ee7484e1d8e766f6353c41b";
  const {loading, error, data} = useQuery(FETCH_ALL_POSTS, {variables: authorId});
  if (loading) return <p>Loading...</p>;
  if (error) return `Error :( ${error}`;

    return (
      <div>
        {data.FetchAllPosts.map(({ _id,title, date}: {_id : string,title : string, date: Date})=>{
          let dateConverted = new Date(date).toDateString()
        return(
          <div key={_id}>
            <h3>{title}</h3>
            <span>created on : {dateConverted}</span>
          </div>
        )
        })}
      </div>
    )
}

export default FetchAllPosts;