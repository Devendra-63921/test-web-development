import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
  });

  const API = "https://test-web-development.onrender.com/api/users";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async () => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create user");
        return;
      }

      alert(data.message);

      setForm({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        age: "",
      });

      getUsers();
    } catch (error) {
      console.error("Create user error:", error);
      alert("Unable to connect to the server");
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`${API}/search`);

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to get users");
        return;
      }

      setUsers(data.data);
    } catch (error) {
      console.error("Get users error:", error);
      alert("Unable to connect to the server");
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete user");
        return;
      }

      alert(data.message);

      getUsers();
    } catch (error) {
      console.error("Delete user error:", error);
      alert("Unable to connect to the server");
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      <input
        name="id"
        placeholder="ID"
        value={form.id}
        onChange={handleChange}
      />

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <input
        name="age"
        placeholder="Age"
        type="number"
        value={form.age}
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
