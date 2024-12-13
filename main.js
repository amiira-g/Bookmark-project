document.addEventListener("DOMContentLoaded", function () {
  var bookmarkName = document.getElementById("bookmarkName");
  var bookmarkURL = document.getElementById("bookmarkUrl");
  var tableContent = document.getElementById("tableContent");
  var submitButton = document.getElementById("submitBtn");

  var bookmarksList = JSON.parse(localStorage.getItem("bookmarksList")) || [];

  function isValidURL(url) {
    var pattern =
      /^(https?:\/\/)?([a-z0-9]+([-\w]*[a-z0-9])*\.)+[a-z0-9]{2,7}(\/[\w-]*)*(\?[;&a-z\=\d%_]*)?(#[\w-]*)?$/i;
    return pattern.test(url);
  }

  function addBookmark() {
    var name = bookmarkName.value.trim();
    var url = bookmarkURL.value.trim();

    console.log("Adding bookmark:", name, url);
    if (!name || name.length < 3) {
      alert("Name should be more than three words");
      return;
    }

    if (!isValidURL(url)) {
      alert("URL is not valid");
      return;
    }

    for (let i = 0; i < bookmarksList.length; i++) {
      if (bookmarksList[i].url === url) {
        alert("This URL has already been added before.");
        return;
      }
    }

    var bookmark = { name: name, url: url };
    bookmarksList.push(bookmark);

    localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));

    bookmarkName.value = "";
    bookmarkURL.value = "";

    displayBookmarks();
  }

  function displayBookmarks() {
    console.log("hiiii");
    tableContent.innerHTML = "";

    bookmarksList.forEach((bookmark, index) => {
      var row = `
        <tr>
          <td>${index + 1}</td>
          <td>${bookmark.name}</td>
          <td><a href="${
            bookmark.url
          }" target="_blank" class="btn btn-info">Visit</a></td>
          <td><button class="btn btn-danger" data-index="${index}">Delete</button></td>
        </tr>
      `;
      tableContent.innerHTML += row;
    });

    var deleteButtons = document.querySelectorAll(".btn-danger");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var index = button.getAttribute("data-index");
        console.log("Deleting bookmark at index:", index);
        deleteBookmark(index);
      });
    });
  }

  
  function deleteBookmark(index) {
    bookmarksList.splice(index, 1);

    localStorage.setItem("bookmarksList", JSON.stringify(bookmarksList));

    displayBookmarks();
  }

  submitButton.addEventListener("click", addBookmark);

  displayBookmarks();
});
