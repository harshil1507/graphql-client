import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const AGGREGATE_QUERY = gql`
query{
    aggregate{
          _id
          title
      author{
        name
        age
        
      }
    }
  }`

const POPULATE = gql`
query{
    populate{
      _id
      author{
        name
        age
        stories{
          title
        }
      }
    }
  }`
  
function Aggregate() : JSX.Element {
    const {error, loading, data} = useQuery(AGGREGATE_QUERY)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error}</p>;
    console.log(data)
    return (
        <div>
            {data.aggregate.map(({_id, title, author}:{_id:string,title:string,author:[]})=>{
                return(
                    <div>
                        <span>{title}</span>
                        <span>Authors : </span>
                        <ul>
                        {
                            author.map(({name, age}: {name:string,age: number})=>(
                            <li>
                                <div>Name : {name}</div>
                                <div>Age : {age}</div>
                            </li>  
                            ))
                        }
                        </ul>
                    </div>
                )
            })}         
        </div>
    )
}

export default Aggregate;