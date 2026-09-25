import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
  });

  const API = import.meta.env.VITE_API_URL || "https://test-web-development.onrender.com/api/users";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getUsers = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(`${API}/search`);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error("Get users error:", error);
      setErrorMsg(`Unable to connect to the server (${error.message}). Please make sure your backend is running.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const createUser = async () => {
    if (!form.id || !form.name || !form.email || !form.phone || !form.address || !form.age) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setErrorMsg("");
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

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        alert(data.message || "Failed to create user");
        return;
      }

      alert(data.message || "User created successfully");

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
      alert("Unable to connect to the server. Check internet or backend connection.");
    }
  };

  const deleteUser = async (userObj) => {
    const targetId = userObj.id || userObj._id;
    if (!targetId) {
      alert("Invalid user ID");
      return;
    }

    setErrorMsg("");
    try {
      const response = await fetch(`${API}/${targetId}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        alert(data.message || "Failed to delete user");
        return;
      }

      alert(data.message || "User deleted successfully");
      getUsers();
    } catch (error) {
      console.error("Delete user error:", error);
      alert("Unable to connect to the server");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>User Management</h1>

      {errorMsg && (
        <div style={{ padding: "10px", marginBottom: "15px", backgroundColor: "#ffdddd", color: "#900", borderRadius: "5px" }}>
          {errorMsg}
        </div>
      )}

      <div style={{ display: "grid", gap: "10px", maxWidth: "300px" }}>
        <input
          name="id"
          placeholder="ID (e.g. U001)"
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
      </div>

      <br />

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={createUser}>
          Create User
        </button>

        <button onClick={getUsers} disabled={loading}>
          {loading ? "Refreshing..." : "Get Users"}
        </button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {loading && <p>Loading users...</p>}

      {!loading && users.length === 0 && <p>No users found.</p>}

      {users.map((user) => (
        <div key={user._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <p style={{ margin: "0 0 10px 0" }}>
            <strong>ID:</strong> {user.id || user._id} | <strong>Name:</strong> {user.name || user.username || "N/A"} | <strong>Email:</strong> {user.email} | <strong>Phone:</strong> {user.phone || "N/A"} | <strong>Age:</strong> {user.age || "N/A"} | <strong>Address:</strong> {user.address || "N/A"}
          </p>

          <button onClick={() => deleteUser(user)} style={{ backgroundColor: "#ff4d4d", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "3px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
