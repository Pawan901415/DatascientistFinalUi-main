import React, { useState, useEffect } from 'react';
import "./EditEntity";
import { useNavigate } from 'react-router-dom';

const MyEntities = () => {
  const [entities, setEntities] = useState(new Set());
  const [cards, setCards] = useState([]);

  const storedUserObject = JSON.parse(sessionStorage.getItem('UserObj'));
  const username = storedUserObject.name;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch entities by user name
    fetch(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/GetEntitiesByUserName/${username}`)
      .then(response => response.json())
      .then(data => setEntities(new Set(data)))
      .catch(error => console.error('Error fetching entities:', error));
  }, [username]);


  useEffect(() => {
    // Fetch entity details for each entity
    const fetchEntityDetails = async () => {
      const entityCards = await Promise.all(
        [...entities].map(async (entityName) => {
          const response = await fetch(`https://featuremarketplacewebapi.azurewebsites.net/api/Entity/GetEntityByEntityName/${entityName}`);
          const data = await response.json();
          return data;
        })
      );
      setCards(entityCards);
    };

    if (entities.size > 0) {
      fetchEntityDetails();
    }
  }, [entities]);

  const handleExplore = (entityName) => {
    // window.location.href = `/featurehome/EditEntity/${entityName}`;
    navigate(`/featurehome/EditEntity/${encodeURIComponent(entityName)}`);
  };

  return (
    <div>
      <section>
        <div className="entity-container">
          <h1>My Entities</h1>
          <div className="entitycards">
            {cards.map((card, i) => (
              <div key={i} className="entitycard">
                <h3>{card.entityName}</h3>
                <p>{card.description}</p>
                <button className="exbtn" onClick={() => handleExplore(card.entityName)}>
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyEntities;
