document.addEventListener("DOMContentLoaded", () => {
  const storedComments = JSON.parse(localStorage.getItem("comments"));
  const defaultComments = [
    {
      date: "2024-12-01",
      rating: "4",
      category: "Функциональность",
      comment: "Очень удобный сайт, все понравилось"
    },
    {
      date: "2024-12-02",
      rating: "3",
      category: "Баг",
      comment: "Никак не мог выбрать фильтр по категории, ужас"
    },
    {
      date: "2024-12-03",
      rating: "5",
      category: "Другое",
      comment: "Удобно использовать сайт, хотел выразить благодарность разрабам!"
    }
  ];

  const commentsList = document.getElementById("comments-list");

  if (!storedComments || storedComments.length === 0) {
    localStorage.setItem("comments", JSON.stringify(defaultComments));
  }

  const commentsToLoad = storedComments || defaultComments;

  commentsList.innerHTML = "";

  commentsToLoad.forEach(commentData => {
    const newComment = document.createElement("li");
    newComment.dataset.date = commentData.date;
    newComment.dataset.rating = commentData.rating;
    newComment.dataset.category = commentData.category;

    newComment.innerHTML = `
      <h2>Категория: ${commentData.category.charAt(0).toUpperCase() + commentData.category.slice(1)}</h2>
      <h3>Комментарий: ${commentData.comment}</h3>
      <h4>Оценка: ${commentData.rating}/5</h4>
      <h4>Дата: ${commentData.date}</h4>
    `;

    commentsList.appendChild(newComment);
  });

  sortComments();
});

function saveToLocalStorage() {
  const commentsList = document.getElementById("comments-list") 
  const comments = Array.from(commentsList.querySelectorAll("li")) 

  const commentsData = comments.map(comment => ({
    date: comment.dataset.date,
    rating: comment.dataset.rating,
    category: comment.dataset.category,
    comment: comment.querySelector("h3").innerText.replace("Комментарий: ", "")
  })) 

  localStorage.setItem("comments", JSON.stringify(commentsData)) 
}

function addFeedback(event) {
  event.preventDefault() 

  const rating = document.getElementById("rating").value 
  const category = document.getElementById("category").value 
  const comment = document.getElementById("comment").value 
  const date = new Date().toISOString().split("T")[0] 

  const commentsList = document.getElementById("comments-list") 
  const newComment = document.createElement("li") 
  newComment.dataset.date = date 
  newComment.dataset.rating = rating 
  newComment.dataset.category = category 

  newComment.innerHTML = `
    <h2>Категория: ${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
    <h3>Комментарий: ${comment}</h3>
    <h4>Оценка: ${rating}/5</h4>
    <h4>Дата: ${date}</h4>
  ` 

  commentsList.prepend(newComment) 

  saveToLocalStorage() 

  document.getElementById("feedback-form").reset() 

  sortComments() 
}

function sortComments() {
  const sortOption = document.getElementById("sort-options").value 
  const commentsList = document.getElementById("comments-list") 
  const comments = Array.from(commentsList.querySelectorAll("li")) 

  comments.sort((a, b) => {
    if (sortOption === "downRating") {
      return b.dataset.rating - a.dataset.rating 
    } else if (sortOption === "upRating") {
      return a.dataset.rating - b.dataset.rating 
    }
  }) 
  comments.forEach(comment => commentsList.appendChild(comment)) 

  saveToLocalStorage() 
}

function sortByCategory() {
  const sortOption = document.getElementById("sort-options-category").value 
  const commentsList = document.getElementById("comments-list") 
  const comments = Array.from(commentsList.querySelectorAll("li")) 

  comments.forEach(comment => {
    if (sortOption === "Все" || comment.dataset.category === sortOption) {
      comment.style.display = "block" 
    } else {
      comment.style.display = "none" 
    }
  }) 

}

function filterComments() {
  const searchInput = document.getElementById("search-input").value.toLowerCase() 
  const comments = document.querySelectorAll("#comments-list li") 

  comments.forEach(comment => {
    const text = comment.innerText.toLowerCase() 
    comment.style.display = text.includes(searchInput) ? "block" : "none" 
  }) 

}
