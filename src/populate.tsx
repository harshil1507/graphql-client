import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'


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
    const {error, loading, data} = useQuery(POPULATE)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {error}</p>;
    console.log(data.populate)
    return (
        <div>
           {/* {data.populate._id} */}
           {
               data.populate.author.map(({name,age}:{name: string, age :number})=>(
                <div>
                    <div>Name :- {name}</div>
                    <div>Age :- {age}</div>

                </div>
               
               ))
           }
        </div>
    )
}

export default Aggregate;