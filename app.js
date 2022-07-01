const UI_bookmarkBtn = document.getElementById("bookmark-btn");
const UI_encloser = document.querySelector(".encloser");
const UI_nameInput = document.getElementById("name");
const UI_urlInput = document.getElementById("url");
const UI_closeModelIcon = document.getElementById("closer-model");
const UI_modelForm = document.getElementById("form");
const UI_bookMarkContainer = document.getElementById("bookmark-container");
const UI_deleteBookmarkIcon = document.querySelectorAll("#bookmark-delete");

bookmarksArray = [];


function buildBookmarks(){
    UI_bookMarkContainer.textContent = "";
    bookmarksArray.forEach((bookmark) => {
        const bookmarkDiv  = document.createElement("div");
        bookmarkDiv.classList.add("bookmark");

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas");
        deleteIcon.classList.add("fa-trash");
        deleteIcon.classList.add("bookmark-delete");
        deleteIcon.setAttribute('onclick', `deleteBookmark('${bookmark.url}')`);

        const bookmarkChildDiv  = document.createElement("div");
        bookmarkChildDiv.classList.add("bookmark-child");

        const logoIcon = document.createElement("img");
        logoIcon.setAttribute("src",`https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}`);
        logoIcon.classList.add("bookmark-icon");

        const link = document.createElement("a");
        link.setAttribute("target","_blank");
        link.setAttribute("href",`${bookmark.url}`);
        link.classList.add("bookmark-link");

        const h4 = document.createElement("h4");
        h4.textContent = bookmark.name;

        link.appendChild(h4);
        bookmarkChildDiv.appendChild(logoIcon);
        bookmarkChildDiv.appendChild(link);
        bookmarkDiv.appendChild(deleteIcon);
        bookmarkDiv.appendChild(bookmarkChildDiv);
        UI_bookMarkContainer.appendChild(bookmarkDiv);


    });
}

function deleteBookmark(url){
    bookmarksArray.forEach((bookmark,index) => {
        if(bookmark.url === url){
            bookmarksArray.splice(index,1);

        }
    });
    localStorage.setItem("bookmarks",JSON.stringify(bookmarksArray));
    buildBookmarks();
}






function showModel(e){
    // console.log(e)
    UI_encloser.classList.add("show-encloser");
    UI_nameInput.focus();

}

function submitModelForm(e){
    let webName = UI_nameInput.value;
    let webUrl = UI_urlInput.value;

    if(!webName || !webUrl){
        alert("Enter both the fields");
    }else{
        let expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
        let regex = new RegExp(expression);
        if(!webUrl.includes("http","https")){
           
            webUrl = `https://${webUrl}`;

        }
        if(!webUrl.match(regex)){
            alert("Enter a valid Url");
        }else{
            bookmarksArray.push({name:webName,url:webUrl});
            UI_nameInput.value = "";
            UI_urlInput.value = "";
            UI_nameInput.focus();
            localStorage.setItem("bookmarks",JSON.stringify(bookmarksArray));

            buildBookmarks();

        }
    }
    console.log(bookmarksArray)

    
    e.preventDefault();
}

function closeModel(e){
    UI_encloser.classList.remove("show-encloser");
}

if(localStorage.getItem("bookmarks")){
    bookmarksArray = JSON.parse(localStorage.getItem("bookmarks"));
    buildBookmarks();
}



UI_bookmarkBtn.addEventListener("click",showModel);
UI_modelForm.addEventListener("submit",submitModelForm);
UI_closeModelIcon.addEventListener("click",closeModel);
