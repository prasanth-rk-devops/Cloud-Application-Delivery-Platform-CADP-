import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/items").then(res => res.json()).then(setItems).catch(()=>setItems([]));
    fetch("/api/users").then(res => res.json()).then(setUsers).catch(()=>setUsers([]));
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email })
    });
    if (res.status === 201) {
      setUsername(""); setEmail("");
      const newUsers = await fetch("/api/users").then(r => r.json());
      setUsers(newUsers);
    } else {
      alert("Failed to add user");
    }
  };

  return (
    <div className="app-container">
      <header style={{ textAlign: "center" }} className="header-hero">
        <img src="/assets/images/hero.jpg" alt="Hero" />
        <h1 style={{ marginTop: 10 }}>Three Tier Demo Application</h1>
      </header>

      <section>
        <h2>Items</h2>
        <div className="items-grid">
          {items.map(i => (
            <div key={i.id} className="card">
              <img
                src={`/assets/images/item${i.id}.jpg`}
                alt={i.title}
                onError={(e)=>{ e.target.onerror=null; e.target.src="/assets/images/item-fallback.jpg"; }}
                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4 }}
              />
              <h3 style={{ marginTop: 8 }}>{i.title}</h3>
              <p>{i.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>Users</h2>
        <ul>
          {users.map(u => <li key={u.id}>{u.username} ({u.email})</li>)}
        </ul>

        <form onSubmit={createUser} style={{ marginTop: "20px" }}>
          <input className="form-input" type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} required/>
          <input className="form-input" type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} required/>
          <button type="submit">Add User</button>
        </form>
      </section>
    </div>
  );
}

export default App;
