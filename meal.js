const searchArea = document.getElementById('search-area')
const searchMeal = document.getElementById('search-meal')
const submitMil = document.getElementById('submit-meal')

submitMil.addEventListener('click', mealList);

function mealList(){
  const searchMilValue = document.getElementById('search-meal').value.trim();
  const displayMeal = document.getElementById('display-meal')

  
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchMilValue}`)
  .then( res=>res.json())
  .then( data=>{
    let getHtml = "";

    if (data.meals){
      data.meals.forEach(element => {
        getHtml = `
            <div onclick="getGradients('${element.strMeal}')" class="meals">
              <h2>${element.strMeal}</h2>
              <img src = "${element.strMealThumb}">
              <p> Like what you see? Click the image to see the full recipe! </p> 
            </div>    
          `
      });
    } else{
      getHtml = `<h4 class="error"> No results were found 😢 </h4>`
    }
    displayMeal.innerHTML = getHtml;
  })
}

const getGradients= (mealName) =>{
  const gradientList = document.getElementById('gradient-List')
  const gradientLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  fetch(gradientLink)
  .then(res=>res.json())
  .then( data=>{
   
    const gradientHtml = `
    <div class="info">
        <p class="padded"> This is a dish of ${data.meals[0].strArea} cuisine. </p>
        <p> <b> <u> Ingredients: </u> </b> </p>

        <ol>
          <li>${data.meals[0].strIngredient1}</li>
          <li>${data.meals[0].strIngredient2}</li>
          <li>${data.meals[0].strIngredient3}</li>
          <li>${data.meals[0].strIngredient4}</li>
          <li>${data.meals[0].strIngredient5}</li>
          <li>${data.meals[0].strIngredient6}</li>
          <li>${data.meals[0].strIngredient7}</li>
          <li>${data.meals[0].strIngredient8}</li>
          <li>${data.meals[0].strIngredient9}</li>
        </ol>
        <p class="padded"> </p>
        <p> <b> <u> Step-by-step instructions: </u> </b> </p>
        <p class="padded"> ${data.meals[0].strInstructions} </p>
        <h2> Bon Appetit! 👩‍🍳 </h2>
    </div>
    `
    gradientList.innerHTML = gradientHtml;
  })
}

