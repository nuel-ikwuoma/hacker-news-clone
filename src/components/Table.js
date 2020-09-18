import React from 'react'
import Button from './Button'


// =========================================== //
//                COMPONENT STYLE             //
const largeColumn = {
    width: '40%',
  }
  const mediumColumn = {
    width: '30%'
  }
  const smallColumn = {
    width: '10%'
  }
  // =========================================== //

// TABLE COMPONENT
const Table = ({ list, onDismiss }) =>
  <div className="table">
    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span style={ largeColumn }>
          <a href={item.url} target={"_blank"}>{item.title}</a>
        </span>
        <span style={ mediumColumn }>
          {item.author}
        </span>
        {/* <span style={ smallColumn }>
          {item.num_comments}
        </span> */}
        <span style={{ width: '10%' }}>
          {`${item.points} pts`}
        </span>
        <span style={{ width: '10%'}}>
          <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>

export default Table;