import refs from "./refs.js";
import { createClient } from "pexels";
import template from "../tempalates/mainItem.hbs";

const { form, queryResult } = refs;

const key = "563492ad6f91700001000001913260f4965a41eab971bbe48a256e0d";
const client = createClient(key);
console.log(client);
const per_page = 1;

form.addEventListener("submit", (event) => {
  // отменяем дефолтное событие браузера по отправке формы
  event.preventDefault();
  // получаем значение из инпута для запроса
  const query = event.target.elements.query.value;
  console.dir(query);
  // делаем запрос через библиотеку pexcel,
  // передаем в запрос значение из инпута через переменную query
  client.videos.search({ query, per_page }).then((result) => {
    // console.log(result);
    const videos = result.videos;
    console.log(videos);

    // ================================================
    // делаем разметку через video.js
    const resultItems = videos.map((el) => {
      //   console.log(el);
      const url = el.video_files[0].link;
      const posterImg = el.image;
      const author = el.user.name;
      const pictures = el.video_pictures;
      const items = createItem(url, posterImg, author, pictures);
      return items;
    });

    queryResult.append(...resultItems);
    // ================================================
  });
});

function createItem(urlVideo, posterSrc, authorName, pictureArr) {
  const li = document.createElement("li");
  li.classList.add("videoWrapper");
  console.log(li);

  const video = document.createElement("video");
  video.setAttribute("src", urlVideo);
  video.setAttribute("poster", posterSrc);
  video.setAttribute("controls", null);
  video.classList.add("video");

  const author = document.createElement("h3");
  author.classList.add("author");
  author.textContent = authorName;

  const pictureList = document.createElement("ul");
  pictureList.classList.add("pictureList");

  const pictures = pictureArr.map((elem) => {
    // console.log(elem);
    const wrap = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("src", elem.picture);
    img.setAttribute("alt", "image");
    wrap.appendChild(img);
    return wrap;
  });
  //   console.log(pictures);
  pictureList.append(...pictures);
  li.append(video, author, pictureList);
  return li;
}
