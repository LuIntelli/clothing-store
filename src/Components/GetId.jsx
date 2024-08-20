import React, { useState } from 'react'

const GetId = (Id) => {
  const [id, setId] = useState("");
  if(Id) setId(Id);
  console.log("...", id)
  return {
    id
  }
}

export default GetId