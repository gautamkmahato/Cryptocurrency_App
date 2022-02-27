import React from 'react'

function Search(props) {
  return (
    <div>
        <input type="text"
          value={props.inputText}
          onChange={props.inputHandler}
        />
    </div>
  )
}

export default Search