
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch users.");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError("Could not load users. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.address.city.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="app">
      <header className="topbar">
        <h1>PeopleHub</h1>
        <span>React User Dashboard</span>
      </header>

      <main className="container">
        <section className="welcome">
          <p className="eyebrow">DASHBOARD</p>
          <h2>Manage your users</h2>
          <p>
            User information fetched live from a public API.
          </p>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Total users</span>
            <strong>{users.length}</strong>
          </div>

          <div className="stat-card">
            <span>Matching users</span>
            <strong>{filteredUsers.length}</strong>
          </div>

          <div className="stat-card">
            <span>API status</span>
            <strong className={error ? "failed" : "success"}>
              {loading ? "Loading..." : error ? "Failed" : "Connected"}
            </strong>
          </div>
        </section>

        <section className="user-section">
          <div className="section-heading">
            <div>
              <h2>User Directory</h2>
              <p>Search by name, email, or city.</p>
            </div>

            <input
              type="search"
              placeholder="Search users..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search users by name, email, or city"
            />
          </div>

          {loading && (
            <p className="message">Loading users from the API...</p>
          )}

          {error && (
            <div className="message error">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>
                Try again
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Company</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-name">
                            <span className="avatar">
                              {user.name.charAt(0)}
                            </span>
                            {user.name}
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.address.city}</td>
                        <td>{user.company.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <p className="message">
                  No users found. Try another search.
                </p>
              )}
            </>
          )}
        </section>
      </main>

      <footer>
        Built with React, Vite, and a public REST API.
      </footer>
    </div>
  );
}

export default App;
