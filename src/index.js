let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => addToyCard(toys))
//console.log(toys)

  function addToyCard(toy){
    const collection = document.querySelector("#toy-collection");
    console.log(collection)
      
    toy.forEach(thing => {
      const div = document.createElement('div')
      div.className = "card"
      collection.append(div)

      const h2 = document.createElement("h2")
      h2.innerHTML = thing.name

      const img = document.createElement("img")
      img.src = thing.image
      img.className = "toy-avatar"
      //console.log(img.src)

      const p = document.createElement('p')
      p.innerHTML = `${thing.likes} likes`

      const button = document.createElement('button')
      button.innerHTML = "Like"
      button.className = "like-btn"
      button.id = thing.id

      button.addEventListener('click', (e) => {       
        //handleClick()       
        const likeCountString = e.target.previousSibling.innerText
        const likeCount = parseInt(likeCountString.split(" ")[0])
        
        e.target.previousSibling.innerText = `${likeCount + 1} Likes`
        console.log(likeCount)
      
      })
     
      div.appendChild(h2)
      div.appendChild(img)
      div.appendChild(p)
      div.appendChild(button)
    })
  }


function form(){
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const toyForm = document.querySelector(".add-toy-form")
    const newName = e.target.name.value 
    const newImage = e.target.image.value 
    const toyObj = { 
      name: newName,
      image: newImage,
      likes: 0
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       Accept: "application/json"
      },  
      body: JSON.stringify(toyObj)
   })  
    addToyCard(toyObj)
    ///////// 
  })
} 

function handleClick(e){
  //increases "likes", when button is clicked
  const likeCountString = e.target.previousSibling.innerText
  const likeCount = parseInt(likeCountString.split(" ")[0])
  fetch("http://localhost:3000/toys", {
    method: "PATCH",  
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(likeCount)
  })
  e.target.previousSibling.innerText = `${likeCount + 1} Likes`
  console.log(likeCount)
}