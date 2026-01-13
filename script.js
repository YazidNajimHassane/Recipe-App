let food=document.getElementById("food");
let search=document.getElementById("search");
let recipeList=document.getElementById("recipeList");
let countries=document.getElementById("country")
let countryList=document.getElementById("countryList")
function SeachFoods(){
    let meal=food.value.trim();
    if(!meal){
        console.log("You Didn't Enter Your Meal. Try Again");
        return;
    }
    const url="https://www.themealdb.com/api/json/v1/1/search.php?s="+meal;
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        recipeList.innerHTML='';
        if (data.meals){
        data.meals.forEach(res=>{
            let embedlink=res.strYoutube.replace("watch?v=","embed/");
            let div=document.createElement("div");
            div.classList.add('recipe');
            div.innerHTML=`
            <h2>${res.strMeal}</h2>
            <img src="${res.strMealThumb}" alt="${res.strMeal}"></img>
            <h3><strong>Categor :</strong> ${res.strCategory}</h3>
            <h3><strong>Area :</strong> ${res.strArea}</h3>
            <p class ="instruction"><strong>Instrucitons :</strong>${res.strInstructions}</p>
            <button class="LearnMorebtn">Learn More</button>
            <iframe width="400px" height="250px"
            src="${embedlink}"
            allowfullscreen>
            </iframe>
            `;
            recipeList.appendChild(div);
            let btn=div.querySelector(".LearnMorebtn");
            let Instrucitons=div.querySelector(".instruction");
            btn.addEventListener("click",()=>{
                Instrucitons.classList.toggle("expanded");
                btn.textContent=Instrucitons.classList.contains("expanded")?"Show Less":"Learn More";
            })
        })
        }else{
            recipeList.innerHTML="<p>No meals found . Try  another name .</p>"
        }
    })
    .catch(error=>{
        console.log("Erorr fetching data : ",error);
        recipeList.innerHTML = "<p>Error loading recipes. Please try again.</p>";
    });
}
search.addEventListener("click",SeachFoods);
document.addEventListener("keydown",function(event){
    if (event.key==="Enter") {
        SeachFoods();
    }
});
countries.addEventListener("click",()=>{

    countryList.style.display=countryList.style.display ==="block"?"none" : "block";

    countryList.innerHTML="";

    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2")
    .then(resultat=>resultat.json())
    .then(data=>{
        data.sort((a,b)=>a.name.common.localeCompare(b.name.common))
        data.forEach(country=>{
            let button = document.createElement("button")
            button.className="country-item";
            button.innerHTML=`<img src="${country.flags.png}" width="15"> `
            button.addEventListener("click",()=>{
                countryList.style.display="none"
                countries.innerHTML=`<img src="${country.flags.png}" height="20px" width="20px" class="img" >`;
            });
            countryList.appendChild(button);
        })
    })
    .catch(err=>console.log(err))
})


