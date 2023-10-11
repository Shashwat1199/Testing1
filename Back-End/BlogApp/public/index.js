const myForm = document.querySelector("#my-form");
const imageInput = document.querySelector("#image");
const descriptionInput = document.querySelector("#description");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");
//let li;
var toAppend;
let data;
let cform;

myForm.addEventListener("submit", onSubmit1);

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/post/get-posts")
    .then((response) => {
      for (var i = 0; i < response.data.allPosts.length; i++) {
        showSavedUserOnScreen(response.data.allPosts[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

function showSavedUserOnScreen(user) {
  if (user.imageURL == "" || user.description == "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    setTimeout(() => msg.remove(), 3000);
  } else {
    var li = document.createElement("li");

    userList.appendChild(li);

    var img = document.createElement("img");
    img.src = user.imageURL;

    li.appendChild(img);

    li.appendChild(document.createTextNode(`${user.description} `));

    userList.appendChild(li);

    var comentBtn = document.createElement("button");

    comentBtn.className = "btn btn-danger btn-sm float-right comment";
    comentBtn.id = "myLocation";
    comentBtn.appendChild(document.createTextNode("Comment"));

    li.appendChild(comentBtn);

    axios
      .get("http://localhost:3000/post/get-comments")
      .then((response1) => {
        for (var i = 0; i < response1.data.allComments.length; i++) {
          if (response1.data.allComments[i].postId == user.id) {
            const cvall = response1.data.allComments[i].content;
            li.appendChild(
              document.createTextNode(`Anonymous User : ${cvall} `)
            );
            li.appendChild(document.createElement("br"));
            userList.appendChild(li);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    var postId;

    comentBtn.addEventListener("click", async function (e) {
      const res = e.target.parentElement.innerText;
      console.log("Values coming " + res);
      var textval = "";
      for (var i = 0; i < res.length; i++) {
        if (res[i] == "\n") break;
        textval += res[i];
      }
      console.log(
        "Values coming After " + textval + " Its length " + textval.length
      );

      const response = await axios.get("http://localhost:3000/post/get-posts");

      for (var i = 0; i < response.data.allPosts.length; i++) {
        var str = response.data.allPosts[i].description;
        if (str == textval) {
          console.log("Inside that for loop");
          postId = response.data.allPosts[i].id;
        }
      }

      console.log(postId);
      removeItem(e, postId);
    });
  }
}

function onSubmit1(e) {
  e.preventDefault();
  var postId;
  if (imageInput.value == "" || descriptionInput.value == "") {
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    setTimeout(() => msg.remove(), 3000);
  } else {
    var li = document.createElement("li");

    var img = document.createElement("img");
    img.src = imageInput.value;

    li.appendChild(img);

    li.appendChild(document.createTextNode(`${descriptionInput.value} `));

    userList.appendChild(li);

    var myObj = {
      image: imageInput.value,
      description: descriptionInput.value,
    };

    axios
      .post("http://localhost:3000/post/add-post", myObj)
      .then((response) => {
        console.log("Gone inside ");
        postId = response.data.newPostDetail.id;
        console.log(postId);
      })
      .catch((err) => {
        console.log("Coming in error block " + err);
      });

    var comentBtn = document.createElement("button");

    comentBtn.className = "btn btn-danger btn-sm float-right comment";
    comentBtn.id = "myLocation";
    comentBtn.appendChild(document.createTextNode("Comment"));

    li.appendChild(comentBtn);

    comentBtn.addEventListener("click", function (e) {
      removeItem(e, postId);
    });
  }
}

function removeItem(e, postId) {
  e.preventDefault();
  if (e.target.classList.contains("comment")) {
    var li = e.target.parentElement;

    data =
      "<form id = 'c-form'><div> Comment:<input type = 'text' id = 'comment' name = 'comments'</div><br><br> <input type = 'submit' id = 'bitn' value = 'Post Comment' ></form>";
    var cresult = document.createElement("div");
    cresult.innerHTML = data;

    li.appendChild(cresult);
    cform = cresult.querySelector("#c-form");

    cform.addEventListener("submit", function (e) {
      console.log("Coming here");
      onSubmit2(e, postId);
    });
  }
}

function onSubmit2(e, postId) {
  e.preventDefault();
  var li = e.target.parentElement;

  var com = document.getElementById("c-form");
  var cval = com.querySelector("#comment");
  console.log(cval.value);

  console.log("Upto here " + cval.value);

  li.appendChild(document.createTextNode(`Anonymous User : ${cval.value} `));
  li.appendChild(document.createElement("br"));

  console.log("thats postId" + postId);

  var myObj = {
    comment: cval.value,
    id: postId,
  };

  axios
    .post("http://localhost:3000/post/add-comment", myObj)
    .then((response) => {
      console.log("Gone inside ");
      console.log("Reached at last line");
    })
    .catch((err) => {
      console.log("Coming in error block " + err);
    });
}
