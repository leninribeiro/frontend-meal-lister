let mealData = [];

const clearTable = () => {
  document.querySelector("#mealTable").innerHTML = " ";
}

const createTableHeader = () => {
  const header = document.createElement("thead")
  header.innerHTML = `<th>Refeição</th>
  <th>Categoria</th>
  <th>Area</th>
  <th>Foto</th>
  <th>Instrução</th>`;
  document.querySelector("#mealTable").append(header);
}

const populateTable = (data) => {
  if(data === null) {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = "Não foi possível achar nenhum resultado com esta busca.";
    document.querySelector("body").append(paragraph);
    return;
  }
  
  createTableHeader();

  const mealTable = document.querySelector("#mealTable");
  data.forEach(meal => {
    const trow = document.createElement("tr");
    trow.innerHTML = `
      <td>${meal["strMeal"]}</td>
      <td>${meal["strCategory"]}</td>
      <td>${meal["strArea"]}</td>
      <td><img src="${meal["strMealThumb"]}" alt="pega no meu pau" style="width: 100px"></td>
      <td>${meal["strInstructions"]}</td>
      `;
    mealTable.append(trow);
  })
}

const searchMeal = (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#meal").value;
  fetch(`http://localhost:8080/meal/${searchInput}`)
    .then(response => {
      return response.json();
    }).then(data => {
      clearTable();

      meals = data.meals;
      console.log(meals);
      populateTable(meals);
    }).catch(err => {
      console.error(err);
    });
}

document.querySelector('#mealForm').addEventListener("submit", searchMeal)
