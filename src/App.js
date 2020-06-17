import React from "react";

import "./styles.css";
import api from "./services/api";
import { useState, useEffect } from "react";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => setRepos(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Desafio GoStack ${Date.now()}`,
      url: "https://github.com/Renanh3l/",
      techs: "NodeJS, ReactJS, React Native",
    });

    const repo = response.data;
    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const deletedIndex = repos.findIndex(repo => repo.id === id);
      const newRepos = repos;
      newRepos.splice(deletedIndex, 1);
      setRepos([...newRepos]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
