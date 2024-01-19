import React, { useState } from 'react';
import './styles/WaterRequest.css';

const WaterRequest = (props) => {

  const rowClassName = props.campaign === 'held' ? 'table-row-green' : 'table-row-yellow';



  return (
    <tr className={rowClassName}>
      <td className='table-cell'>{props.location}</td>
      <td className='table-cell'>{props.userCount}</td>
      <td className='table-cell'>{props.userName}</td>
      <td className='table-cell'>{props.status}</td>
      <td className='table-cell'>{props.campaign}</td>
      <td className='table-cell'><button onClick={props.onclick}>Campaigning done</button></td>
      <td className='table-cell'><button onClick={props.onverify}>Start Progress</button></td>
    </tr>
  );
}

export default WaterRequest;