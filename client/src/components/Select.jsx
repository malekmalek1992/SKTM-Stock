import React  from 'react';

function Select(props) {
    return  <div className="input-group form-group">
    <select name={props.name} className="form-control" >
      <option value="Plant 1">Plant 1</option>
      <option value="Plant 2">Plant 2</option>
      <option value="Plant 3">Plant 3</option>
    </select>
  </div>

}
export default Select ;