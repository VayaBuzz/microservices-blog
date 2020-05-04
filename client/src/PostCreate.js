import React, {useState} from 'react';
import axios from 'axios';

export default () => {
  // title is a property, setTitle is a setter
  // this is our new piece of state, using the useState hook
  const [title, setTitle] = useState('');  // initialize as an empty string.

  // this function executes any time user submits the form.
  // by default the browser wants to submit the form itself when user 
  // clicks submit. We will keep that from happening by using preventDefault().
  const onSubmit = async (event) => {
    event.preventDefault();
    // call your post microservice.
    // we'll want to use async/await rather than deal with promises/callbacks
    // so we added the async keyword above
    await axios.post('http://localhost:4000/posts',{
      title
    });
    // reset the input field after the submit button was pressed,
    // for a clean UX
    setTitle('');
  };
  // we'll do some classic 2-way property binding below with onChange and value
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label> 
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};