import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Ahmad",
      age: 20,
    },
    {
      id: 2,
      name: "Ali",
      age: 25,
    },
  ]);

  const [idx, setId] = useState(null);
  const [search, setSearch] = useState("");

  const handleEdit = (user) => {
    setId(user.id);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newUser = {
      id: idx,
      name: e.target.name.value,
      age: e.target.age.value,
    };

    setData(data.map((el) => (el.id === idx ? newUser : el)));
    setId(null);
  };

  const handleDelete = (id) => {
    setData(data.filter((e) => e.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name: e.target.name.value,
      age: e.target.age.value,
    };

    setData([...data, newUser]);
    e.target.reset();
  };

  const filteredData = data.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase().trim()),
  );

  return (
    <div>
      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
           <TextField id="outlined-basic" label="Name " variant="outlined" type="text" name="name" placeholder="Name"  required />
           <TextField id="outlined-basic" label="Age " variant="outlined"type="number" name="age" placeholder="Age" required />
  
      <Button variant="contained" type="submit">Add</Button>
      </form>


      <h2>Search User</h2>

    <TextField id="outlined-basic" label="Search User" variant="outlined"  
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
  


      {filteredData.map((e) => (
        <div key={e.id}>
          <h3>Name: {e.name}</h3>
          <p>Age: {e.age}</p>

          {idx === e.id && (
            <form onSubmit={handleSave}>
              
      <TextField id="outlined-basic" label="Name" variant="outlined" type="text" name="name" defaultValue={e.name} required />
   <TextField id="outlined-basic" label="Age" variant="outlined" type="number" name="age" defaultValue={e.age} required />
             


      <Button variant="contained" type="submit">Save</Button>
      
      <Button sx={{backgroundColor:"red"}} variant="contained" type="button" onClick={() => setId(null)}>Cancel</Button>
            
            </form>
          )}

          
      <Button sx={{backgroundColor:"red"}} variant="contained" onClick={() => handleDelete(e.id)}>Delete</Button>
<Button variant="contained" color="success" onClick={() => handleEdit(e)}>
  Edit
</Button>
        </div>
      ))}
    </div>
  );
};

export default App;
