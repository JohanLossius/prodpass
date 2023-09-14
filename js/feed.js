const usernameConst = localStorage.getItem("username");
const token = localStorage.getItem("accessToken");

const baseUrl = "https://api.noroff.dev/api/v1";
const allPostsUrlEndPoint = "/social/posts?_author=true&_comments=true&_reactions=true";
const allPostsUrl = baseUrl + allPostsUrlEndPoint;
const createPostEndpoint = "/social/posts";

const createPostUrl = baseUrl + createPostEndpoint;
const followingPostsUrlEnd = "/social/posts/following";
const followingPostsUrl = baseUrl + followingPostsUrlEnd;

const inputTitle = document.querySelector("#post-title");
const inputMessage = document.querySelector("#post-message");
const submitButton = document.querySelector("#post-button");
const form = document.querySelector(".publish-message-form");
const feedbackCont = document.querySelector(".feedback-cont");
const tagInput = document.querySelector("#tags");

const feedContNew = document.querySelector(".feed-cont-new");
const feedCont = document.querySelector(".feed-cont");

form.addEventListener("submit", async (data) => {
    data.preventDefault();

    if (!inputTitle.value || !inputMessage.value) {
        feedbackCont.innerHTML = `<span class="error-message">Please fill out your title and post message.</span>`;
    }    

    if (inputTitle.value || inputMessage.value) {
        const titleConst = inputTitle.value;
        const messageConst = inputMessage.value;
        const tagConst = tagInput.value;
        console.log("taginput: ", tagConst);

        const createPostConst = {
            method: 'POST',
            body: JSON.stringify({
              title: `${titleConst}`,
              body: `${messageConst}`, 
              tags: [`${tagConst}`]
            }),
            headers: {
                "Content-type": 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${token}`
            },
        };

        console.log("createPostConst: ", createPostConst);

        try {
            const resp = await fetch(createPostUrl, createPostConst);

            console.log("resp const: ", resp);

            const json = await resp.json();
            console.log("json const: ", json);

            if(resp.ok) {
                feedbackCont.innerHTML = `<span class="success-message">Your post was successfully published.</span>`;
            }

            let postBody = json.body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postTime = json.created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = json.title;
            console.log("title: ", postTitle);

            let postId = json.id;
            console.log("postID: ", postId);

            let postTag = json.tags[0];
            console.log("postTag: ", postTag);

            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div">${usernameConst}</div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag">${postTag}</div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedContNew.appendChild(postCard);

        }

        catch (error) {
            console.log("Error from catch error: ", error);
        }
    }  
});

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

async function displayAllPosts() {
    try {
        const resp = await fetch(allPostsUrl, options);
        console.log("Response for API call: ", resp);
        const json = await resp.json();
        console.log("JSON const: ", json);

        console.log("JSON.length: ", json.length);

        for(let i = 0; i < 20; i++) {

            let postBody = json[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postAuthor = json[i].author.name;
            console.log("postAuthor: ", postAuthor);

            let postTime = json[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = json[i].title;
            console.log("title: ", postTitle);

            let postId = json[i].id;
            console.log("postID: ", postId);

            let postTag = json[i].tags[0];
            console.log("postTag: ", postTag);
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag"></div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};

displayAllPosts();


// Find post by ID code

const findButton = document.querySelector("#find-button");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector(".search-container");


findButton.addEventListener("click", findPostById);

async function findPostById() {
    event.preventDefault();
    const idContainer = searchInput.value;

    const apiSinglePostEndpoint = `/social/posts/${idContainer}posts?_author=true&_comments=true&_reactions=true`;
    const apiUrlSinglePost = baseUrl + apiSinglePostEndpoint;

    try {
        const resp = await fetch(apiUrlSinglePost, options);
        const json = await resp.json();
        console.log("json from find by id: ", json);

        if (resp.ok) {
                window.location.href = `post.html?postId=${idContainer}`
        } 
        if (!resp.ok) {
            findButton.style.borderColor = "red";
            findButton.style.color = "red";
            findButton.style.fontWeight = "bold";
            searchInput.style.borderColor = "red";
            searchInput.style.color = "red";
            searchInput.style.fontWeight = "bold";
        }

    } catch(error) {
        console.log("error from find by id: ", error);
    }
};

// Filter posts by tags

const yourPostsTagCont = document.querySelector("#tag-div-your-posts");
const productTagCont = document.querySelector("#tag-div-product");
const discoveryTagCont = document.querySelector("#tag-div-discovery");
const deliveryTagCont = document.querySelector("#tag-div-delivery");
const technologyTagCont = document.querySelector("#tag-div-technology");
const innovationTagCont = document.querySelector("#tag-div-innovation");
const fundingTagCont = document.querySelector("#tag-div-funding");

yourPostsTagCont.addEventListener("click", displayFilteredPostsYour);
productTagCont.addEventListener("click", displayFilteredPostsProduct);
discoveryTagCont.addEventListener("click", displayFilteredPostsDiscovery);
deliveryTagCont.addEventListener("click", displayFilteredPostsDelivery);
technologyTagCont.addEventListener("click", displayFilteredPostsTechnology);
innovationTagCont.addEventListener("click", displayFilteredPostsInnovation);
fundingTagCont.addEventListener("click", displayFilteredPostsFunding);

async function displayFilteredPostsYour() {
    try {
        const resp = await fetch(allPostsUrl, options);
        const posts = await resp.json();

        console.log("posts: ", posts);

        const filteredPosts = posts.filter((post) => {
            if(post.author.name === usernameConst) {
                return true;
            }
        });

        console.log("filteredPosts: ", filteredPosts);

        if (resp.ok) {
            feedCont.innerHTML = "";
            yourPostsTagCont.classList.add("marked-tag");

            productTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < 20; i++) {

            let postBody = filteredPosts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postAuthor = filteredPosts[i].author.name;
            console.log("postAuthor: ", postAuthor);

            let postTime = filteredPosts[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = filteredPosts[i].title;
            console.log("title: ", postTitle);

            let postId = filteredPosts[i].id;
            console.log("postID: ", postId);

            let postTag = filteredPosts[i].tags[0];
            console.log("postTag: ", postTag);
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag"></div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};

async function displayFilteredPostsProduct() {
    try {
        const resp = await fetch(allPostsUrl, options);
        const posts = await resp.json();

        console.log("posts: ", posts);

        const filteredPosts = posts.filter((post) => {
            if(post.tags[0] === "Product") {
                return true;
            }
        });

        console.log("filteredPosts: ", filteredPosts);

        if (resp.ok) {
            feedCont.innerHTML = "";
            productTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < 20; i++) {

            let postBody = filteredPosts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postAuthor = filteredPosts[i].author.name;
            console.log("postAuthor: ", postAuthor);

            let postTime = filteredPosts[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = filteredPosts[i].title;
            console.log("title: ", postTitle);

            let postId = filteredPosts[i].id;
            console.log("postID: ", postId);

            let postTag = filteredPosts[i].tags[0];
            console.log("postTag: ", postTag);
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag"></div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};



async function displayFilteredPostsDiscovery() {
    try {
        const resp = await fetch(allPostsUrl, options);
        const posts = await resp.json();

        console.log("posts: ", posts);

        const filteredPosts = posts.filter((post) => {
            if(post.tags[0] === "Product discovery") {
                return true;
            }
        });

        console.log("filteredPosts: ", filteredPosts);

        if (resp.ok) {
            feedCont.innerHTML = "";
            discoveryTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < 20; i++) {

            let postBody = filteredPosts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postAuthor = filteredPosts[i].author.name;
            console.log("postAuthor: ", postAuthor);

            let postTime = filteredPosts[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = filteredPosts[i].title;
            console.log("title: ", postTitle);

            let postId = filteredPosts[i].id;
            console.log("postID: ", postId);

            let postTag = filteredPosts[i].tags[0];
            console.log("postTag: ", postTag);
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag"></div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};


async function displayFilteredPostsDelivery() {
    try {
        const resp = await fetch(allPostsUrl, options);
        const posts = await resp.json();

        console.log("posts: ", posts);

        const filteredPosts = posts.filter((post) => {
            if(post.tags[0] === "Product delivery") {
                return true;
            }
        });

        console.log("filteredPosts: ", filteredPosts);

        if (resp.ok) {
            feedCont.innerHTML = "";
            deliveryTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < 20; i++) {

            let postBody = filteredPosts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postAuthor = filteredPosts[i].author.name;
            console.log("postAuthor: ", postAuthor);

            let postTime = filteredPosts[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = filteredPosts[i].title;
            console.log("title: ", postTitle);

            let postId = filteredPosts[i].id;
            console.log("postID: ", postId);

            let postTag = filteredPosts[i].tags[0];
            console.log("postTag: ", postTag);
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag"></div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};


async function displayFilteredPostsTechnology() {
    try {
        const resp = await fetch(allPostsUrl, options);
        const posts = await resp.json();

        console.log("posts: ", posts);

        const filteredPosts = posts.filter((post) => {
            if(post.tags[0] === "Technology") {
                return true;
            }
        });

        console.log("filteredPosts: ", filteredPosts);

        if (resp.ok) {
            feedCont.innerHTML = "";
            technologyTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < 20; i++) {

            let postBody = filteredPosts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postAuthor = filteredPosts[i].author.name;
            console.log("postAuthor: ", postAuthor);

            let postTime = filteredPosts[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = filteredPosts[i].title;
            console.log("title: ", postTitle);

            let postId = filteredPosts[i].id;
            console.log("postID: ", postId);

            let postTag = filteredPosts[i].tags[0];
            console.log("postTag: ", postTag);
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag"></div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};


async function displayFilteredPostsInnovation() {
    try {
        const resp = await fetch(allPostsUrl, options);
        const posts = await resp.json();

        console.log("posts: ", posts);

        const filteredPosts = posts.filter((post) => {
            if(post.tags[0] === "Innovation") {
                return true;
            }
        });

        console.log("filteredPosts: ", filteredPosts);

        if (resp.ok) {
            feedCont.innerHTML = "";
            innovationTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < 20; i++) {

            let postBody = filteredPosts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postAuthor = filteredPosts[i].author.name;
            console.log("postAuthor: ", postAuthor);

            let postTime = filteredPosts[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = filteredPosts[i].title;
            console.log("title: ", postTitle);

            let postId = filteredPosts[i].id;
            console.log("postID: ", postId);

            let postTag = filteredPosts[i].tags[0];
            console.log("postTag: ", postTag);
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag"></div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};


async function displayFilteredPostsFunding() {
    try {
        const resp = await fetch(allPostsUrl, options);
        const posts = await resp.json();

        console.log("posts: ", posts);

        const filteredPosts = posts.filter((post) => {
            if(post.tags[0] === "Funding") {
                return true;
            }
        });

        console.log("filteredPosts: ", filteredPosts);

        if (resp.ok) {
            feedCont.innerHTML = "";
            fundingTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < 20; i++) {

            let postBody = filteredPosts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postAuthor = filteredPosts[i].author.name;
            console.log("postAuthor: ", postAuthor);

            let postTime = filteredPosts[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = filteredPosts[i].title;
            console.log("title: ", postTitle);

            let postId = filteredPosts[i].id;
            console.log("postID: ", postId);

            let postTag = filteredPosts[i].tags[0];
            console.log("postTag: ", postTag);
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile pic">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
                        </div>
                    </div>
                    <div class="post-card-header-div">
                        <div class="topic-tag-cont">
                            <div class="topic-tag"></div>
                        </div>
                    </div>
                </div>
                <div class="post-card-main">
                    <h4 class="post-card-title"></h4>
                    <div class="post-main-message"></div>
                    <a href="post.html?postId=${postId}" class="see-full-button">
                        <div class="see-full-div">See Full</div>
                    </a>
                </div>
                <div class="post-card-footer-individual">
                    <div class="post-footer-icon-cont">
                        <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
                        <div>0 likes</div>
                    </div>
                    <div class="post-footer-icon-cont">
                        <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
                        <div>0 comments</div>
                    </div>
                </div>

            `
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};