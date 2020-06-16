import React from 'react';
import './App.css';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

let cursor,limit,reverse;
const FETCH_ALL_AUTHORS = gql`
{
  FetchAllAuthors{
    _id
    firstName
    lastName
    posts{
      _id
      title
    }
  }
}
`
function FetchAllAuthors() {
  const {loading, error, data} = useQuery(FETCH_ALL_AUTHORS,);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.FetchAllAuthors.map(({ posts, firstName,lastName} : {posts : [], firstName: string,lastName : string})=>(
    <div>
      <h3>{firstName + '' + lastName}</h3>
      <ul>
        {posts.map(({_id,title}:{_id : string,title : string})=>(
          <li key={_id}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  ));
}

export default FetchAllAuthors;
