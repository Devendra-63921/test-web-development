import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    age: ""
  });

  const API = "http://localhost:5000/api/users";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createUser = async () => {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        age: Number(form.age)
      })
    });

    const data = await response.json();

    alert(data.message);

    getUsers();
  };

  const getUsers = async () => {
    const response = await fetch(`${API}/search`);

    const data = await response.json();

    setUsers(data.data);
  };

  const deleteUser = async (id) => {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    const data = await response.json();

    alert(data.message);

    getUsers();
  };

  return (
    <div>
      <h1>User Management</h1>

      <input
        name="id"
        placeholder="ID"
        onChange={handleChange}
      />

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        type="number"
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={createUser}>
        Create User
      </button>

      <button onClick={getUsers}>
        Get Users
      </button>

      <hr />

      {users.map((user) => (
        <div key={user._id}>
          <p>
            {user.id} - {user.name} - {user.email} -{" "}
            {user.phone} - {user.age} - {user.address}
          </p>

          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;