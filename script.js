let API_URL = "https://jsonplaceholder.typicode.com/comments";

function CommentHTML(rating, name, email, body)
{
    return `
    <h><b>${name}, ${email}</b></h3>
    ${StarsHTML(rating)}
    <p>${body}</p>
    <br>
    `
}

document.addEventListener("DOMContentLoaded", async ev=>{
    let commentsContainer = document.getElementById("comments-container");
    let response = await fetch(API_URL);
    let comments = await response.json();
    
    for(let i=0; i<10; i++)
    {
        commentsContainer.innerHTML += CommentHTML(getRandomInt(4) + 1, comments[i].name, comments[i].email, comments[i].body)
    }
    
    let commentArea = document.getElementById("comment");
    let form = document.getElementById("comment-form");
    let rating = document.getElementById("rating");

    form.addEventListener("submit", ev=>{
        ev.preventDefault();
        commentsContainer.innerHTML += CommentHTML(rating.value, "EjemploUsuario", "ej@gmail.com", commentArea.value);
    })

})

function StarsHTML(stars)
{
    let result=``;
    const emptyStar = `<i class="fa-regular fa-star"></i>`;
    const filledStar = `<i class="fa-solid fa-star"></i>`;

    for(let i=0; i<4; i++)
    {
        if(i<stars)
        {
            result += filledStar;
        }else{
            result += emptyStar;
        }
    }

    return result;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }