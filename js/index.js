document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container');
    const createMonster = document.getElementById('create-monster');
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
  
    let currentPage = 1;
  
    function fetchMonsters(page) {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsterContainer.innerHTML = '';
          monsters.forEach(monster => {
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
              <h2>${monster.name}</h2>
              <h4>Age: ${monster.age}</h4>
              <p>Bio: ${monster.description}</p>
            `;
            monsterContainer.appendChild(monsterDiv);
          });
        })
        .catch(error => console.error(error));
    }
  
    fetchMonsters(currentPage);
  
    backButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMonsters(currentPage);
      }
    });
  
    forwardButton.addEventListener('click', () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  
    createMonster.innerHTML = `
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br>
  
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" required><br>
  
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" required><br>
  
        <input type="submit" value="Create Monster">
      </form>
    `;
  
    const form = createMonster.querySelector('form');
  
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = event.target.name.value;
      const age = event.target.age.value;
      const description = event.target.description.value;
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, description })
      })
        .then(response => response.json())
        .then(monster => {
          const monsterDiv = document.createElement('div');
          monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
          `;
          monsterContainer.appendChild(monsterDiv);
          form.reset();
        })
        .catch(error => console.error(error));
    });
  });
  