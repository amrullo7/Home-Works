
import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Ahmad",
      age: 20
    },
    {
      id: 2,
      name: "Ali",
      age: 25
    }
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

    setData(data.map((el) => el.id === idx ? newUser : el));
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
    e.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div>
      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="number" name="age" placeholder="Age" required />
        <button type="submit">Add</button>
      </form>

      <hr />

      <h2>Search User</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr />

      {filteredData.map((e) => (
        <div key={e.id}>
          <h3>Name: {e.name}</h3>
          <p>Age: {e.age}</p>

          {idx === e.id && (
            <form onSubmit={handleSave}>
              <input
                type="text"
                name="name"
                defaultValue={e.name}
                required
              />

              <input
                type="number"
                name="age"
                defaultValue={e.age}
                required
              />

              <button type="submit">Save</button>

              <button type="button" onClick={() => setId(null)}>
                Cancel
              </button>
            </form>
          )}

          <button onClick={() => handleDelete(e.id)}>
            Delete
          </button>

          <button onClick={() => handleEdit(e)}>
            Edit
          </button>
        </div>
      ))}

    </div>
  );
};

export default App;