let API_URL = "https://jsonplaceholder.typicode.com/comments";

function CommentHTML(rating, name, email, body)
{
    return `
    <div class="comment-container">
    <p><span class="username">${name}</span>, <span class="email"> (${email})</span></p>
    ${StarsHTML(rating)}
    <p>${body}</p>
    </div>
    `
}

document.addEventListener("DOMContentLoaded", async ev=>{
    let commentsContainer = document.getElementById("comments-container");
    let response = await fetch(API_URL);
    let comments = await response.json();
    
    for(let i=0; i<10; i++)
    {
        commentsContainer.innerHTML += CommentHTML(getRandomInt(5), comments[i].name, comments[i].email, comments[i].body)
    }
    
    let commentArea = document.getElementById("comment");
    let form = document.getElementById("comment-form");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let rating = -1;
    form.addEventListener("submit", ev=>{
        ev.preventDefault();
        commentsContainer.innerHTML += CommentHTML(rating, username.value!=""?username.value:"unnamed", email.value!=""?email.value:"no email", commentArea.value);
    })
    
    let stars = document.getElementsByClassName("rating-radio-label");
    let starContainer = document.getElementById("star-container");

    for(let i=0; i<stars.length; i++)
    {
        stars[i].addEventListener("mouseenter", ev=>{
            FillStars(stars, i+1);
        });

        stars[i].addEventListener("change", ev=>{
            rating = GetRating();
            FillStars(stars, i+1);
        });
    }

    starContainer.addEventListener("mouseleave", ev=>{
        FillStars(stars, rating);
    });
    
})

function FillStars(starsArray, rating)
{
    for(let i=0; i<starsArray.length; i++)
    {
            if(i<rating)
            {
                if(!starsArray[i].classList.contains("rating-radio-label-filled"))
                {
                    starsArray[i].classList.add("rating-radio-label-filled");
                }
            }else{
                if(starsArray[i].classList.contains("rating-radio-label-filled"))
                {
                    starsArray[i].classList.remove("rating-radio-label-filled");
                }
            }
    }
}
function StarsHTML(rating)
{
    let result=``;
    const emptyStar = `<i class="fa-regular fa-star"></i>`;
    const filledStar = `<i class="fa-solid fa-star"></i>`;
    
    for(let i=0; i<5; i++)
    {
        if(i<rating)
        {
            result += filledStar;
        }else{
            result += emptyStar;
        }
    }
    
    return result;
}

function GetRating()
{
    let rating = 1;
    let stars = document.querySelectorAll(`input[type="radio"][name="rating"]`);
    stars.forEach(star => {
        if(star.checked){rating = star.value}
    });
    return rating;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}