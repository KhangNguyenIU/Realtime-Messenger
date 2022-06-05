import React from 'react'
import { useSelector } from 'react-redux'

/**
* @author
* @function User
**/

export const User = (props) => {
    const user = useSelector(state => state.auth)
    console.log()
  return(
    <div>User</div>
   )
  }
