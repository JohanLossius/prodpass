// Filter posts by tags

import { allPostsUrl, baseUrl,myPostsUrl } from "../constants/api.mjs";
import { usernameConst, token, profilePictureUrl } from "../constants/localStorage.mjs";

export { displayYourPosts, displayFilteredPostsProduct, displayFilteredPostsDiscovery, displayFilteredPostsDelivery, displayFilteredPostsTechnology, displayFilteredPostsInnovation, displayFilteredPostsFunding };

const yourPostsTagCont = document.querySelector("#tag-div-your-posts");
const productTagCont = document.querySelector("#tag-div-product");
const discoveryTagCont = document.querySelector("#tag-div-discovery");
const deliveryTagCont = document.querySelector("#tag-div-delivery");
const technologyTagCont = document.querySelector("#tag-div-technology");
const innovationTagCont = document.querySelector("#tag-div-innovation");
const fundingTagCont = document.querySelector("#tag-div-funding");
const feedCont = document.querySelector(".feed-cont");

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

// Handle "Your posts" tag filter
// I didn't have time to rewrite these handleTags functions into one function to process the various filterings before the deadline.

/**
 * // JS Documentation for the handleTags() function
 * @property {undefined} displayYourPosts Contains the entire function, including the click addeventlistener to trigger the function. Gives undefined when console logged, but works for the desired purpose, so assmunig it's correct.
 * @function handleTags() Calls the API for the user's own posts, and displays these as dynamics HTML in the feed container on the feed.html page. As well as styling the current tag to mark that it is the user's own posts that is currently being displayed.
 * @returns Returns the dynamic HTML from having called the API for the user's own posts, and appends it in the feed container of the feed.html page.
 * 
 */
const displayYourPosts = yourPostsTagCont.addEventListener("click", async function handleTags() {
    try {
        const resp = await fetch(myPostsUrl, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${token}`,
		    },
        });

        const posts = await resp.json();

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

        for(let i = 0; i < posts.length; i++) {
            let postBody = posts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);

            let postAuthor = posts[i].author.name;

            let postTime = posts[i].created;
            let postDate = postTime.substring(0, 10);

            let postTitle = posts[i].title;

            let postId = posts[i].id;

            let postTag = posts[i].tags[0];

            let postAuthorImage = posts[i].author.avatar;
            if(postAuthorImage) {
                postAuthorImage = posts[i].author.avatar;
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon-post" alt="Profile pic">
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
                </div>`

            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedCont.appendChild(postCard);
        }
    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
});

// Handle Product tag filter

/**
 * @property {undefined} displayFilteredPostsProduct Logs as undefined when logged, but contains all the functionality to filter by the product tag, and it works.
 * @param {object} data Passes in the click event for the element that is clicked, in this case the Product tag div, that contains the data-set of "Product", that allows us to fetch the tag as a string, for further use.
 * @property {string} myTag Contains the tag clicked as a string.
 * @property {string} tagsUrl Contains the URL to be called for the specific tag that is targeted, in this case the "Product" tag.
 * @returns Returns the dynamic HTML of the posts / post cards, that have the specific tag clicked by the user, in this case "Product", and build out and appends these posts in the feed cont of the feed.html page. It also styles the "Product" tag as marked, so the user understands that these are the posts being displayed, that is, the ones with the tag of "Product".
 */
const displayFilteredPostsProduct = productTagCont.addEventListener("click", async function handleTags(data) {
    console.log("data: ", data);
    const myTag = data.target.dataset.tag;
    console.log("mytag ", myTag);
    const tagsUrl = `${baseUrl}/social/posts?_tag=${myTag}&_author=true&_comments=true&_reactions=true`;

    try {
        const resp = await fetch(tagsUrl, options);
        const posts = await resp.json();

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

        for(let i = 0; i < posts.length; i++) {
            let postBody = posts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);

            let postAuthor = posts[i].author.name;

            let postTime = posts[i].created;
            let postDate = postTime.substring(0, 10);

            let postTitle = posts[i].title;

            let postId = posts[i].id;

            let postTag = posts[i].tags[0];

            let postAuthorImage = posts[i].author.avatar;
            if(postAuthorImage) {
                postAuthorImage = posts[i].author.avatar;
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon-post" alt="Profile pic">
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
                </div>`

            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedCont.appendChild(postCard);
        }
    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
});


// Handle "Product discovery" tag filter

/**
 * See above for "Handle "Product tag filter" documentation
 */
const displayFilteredPostsDiscovery = discoveryTagCont.addEventListener("click", async function handleTags(data) {
    const myTag = data.target.dataset.tag;
    const tagsUrl = `${baseUrl}/social/posts?_tag=${myTag}&_author=true&_comments=true&_reactions=true`;

    try {
        const resp = await fetch(tagsUrl, options);
        const posts = await resp.json();

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

        for(let i = 0; i < posts.length; i++) {

            let postBody = posts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);

            let postAuthor = posts[i].author.name;

            let postTime = posts[i].created;
            let postDate = postTime.substring(0, 10);

            let postTitle = posts[i].title;

            let postId = posts[i].id;

            let postTag = posts[i].tags[0];

            let postAuthorImage = posts[i].author.avatar;
            if(postAuthorImage) {
                postAuthorImage = posts[i].author.avatar;
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `
                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon-post" alt="Profile pic">
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
                </div>`

            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedCont.appendChild(postCard);
        }
    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
});


// Handle "Product delivery" tag filter
/**
 * See above for "Handle "Product tag filter" documentation
 */

const displayFilteredPostsDelivery = deliveryTagCont.addEventListener("click", async function handleTags(data) {
    const myTag = data.target.dataset.tag;
    const tagsUrl = `${baseUrl}/social/posts?_tag=${myTag}&_author=true&_comments=true&_reactions=true`;

    try {
        const resp = await fetch(tagsUrl, options);
        const posts = await resp.json();

        if (resp.ok) {
            feedCont.innerHTML = "";
            deliveryTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < posts.length; i++) {

            let postBody = posts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);

            let postAuthor = posts[i].author.name;

            let postTime = posts[i].created;
            let postDate = postTime.substring(0, 10);

            let postTitle = posts[i].title;

            let postId = posts[i].id;

            let postTag = posts[i].tags[0];

            let postAuthorImage = posts[i].author.avatar;
            if(postAuthorImage) {
                postAuthorImage = posts[i].author.avatar;
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `
                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon-post" alt="Profile pic">
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
                </div>`

            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedCont.appendChild(postCard);
        }
    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
});

// Handle "Technology" tag filter
/**
 * See above for "Handle "Product tag filter" documentation
 */

const displayFilteredPostsTechnology = technologyTagCont.addEventListener("click", async function handleTags(data) {
    const myTag = data.target.dataset.tag;
    const tagsUrl = `${baseUrl}/social/posts?_tag=${myTag}&_author=true&_comments=true&_reactions=true`;

    try {
        const resp = await fetch(tagsUrl, options);
        const posts = await resp.json();

        console.log("posts: ", posts)

        if (resp.ok) {
            feedCont.innerHTML = "";
            technologyTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < posts.length; i++) {

            let postBody = posts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);

            let postAuthor = posts[i].author.name;

            let postTime = posts[i].created;
            let postDate = postTime.substring(0, 10);

            let postTitle = posts[i].title;

            let postId = posts[i].id;

            let postTag = posts[i].tags[0];

            let postAuthorImage = posts[i].author.avatar;
            if(postAuthorImage) {
                postAuthorImage = posts[i].author.avatar;
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `
                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon-post" alt="Profile pic">
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
                </div>`

            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedCont.appendChild(postCard);
        }
    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
});

// Handle "Innovation" tag filter
/**
 * See above for "Handle "Product tag filter" documentation
 */

const displayFilteredPostsInnovation = innovationTagCont.addEventListener("click", async function handleTags(data) {
    const myTag = data.target.dataset.tag;
    const tagsUrl = `${baseUrl}/social/posts?_tag=${myTag}&_author=true&_comments=true&_reactions=true`;

    try {
        const resp = await fetch(tagsUrl, options);
        const posts = await resp.json();

        if (resp.ok) {
            feedCont.innerHTML = "";
            innovationTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            fundingTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < posts.length; i++) {

            let postBody = posts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);

            let postAuthor = posts[i].author.name;

            let postTime = posts[i].created;
            let postDate = postTime.substring(0, 10);

            let postTitle = posts[i].title;

            let postId = posts[i].id;

            let postTag = posts[i].tags[0];

            let postAuthorImage = posts[i].author.avatar;
            if(postAuthorImage) {
                postAuthorImage = posts[i].author.avatar;
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `
                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon-post" alt="Profile pic">
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
                </div>`

            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedCont.appendChild(postCard);
        }
    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
});

// Handle "Innovation" tag filter
/**
 * See above for "Handle "Product tag filter" documentation
 */

const displayFilteredPostsFunding = fundingTagCont.addEventListener("click", async function handleTags(data) {
    const myTag = data.target.dataset.tag;
    const tagsUrl = `${baseUrl}/social/posts?_tag=${myTag}&_author=true&_comments=true&_reactions=true`;

    try {
        const resp = await fetch(tagsUrl, options);
        const posts = await resp.json();

        if (resp.ok) {
            feedCont.innerHTML = "";
            fundingTagCont.classList.add("marked-tag");

            yourPostsTagCont.classList.remove("marked-tag");
            productTagCont.classList.remove("marked-tag");
            discoveryTagCont.classList.remove("marked-tag");
            deliveryTagCont.classList.remove("marked-tag");
            technologyTagCont.classList.remove("marked-tag");
            innovationTagCont.classList.remove("marked-tag");
        }

        for(let i = 0; i < posts.length; i++) {

            let postBody = posts[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);

            let postAuthor = posts[i].author.name;

            let postTime = posts[i].created;
            let postDate = postTime.substring(0, 10);

            let postTitle = posts[i].title;

            let postId = posts[i].id;

            let postTag = posts[i].tags[0];

            let postAuthorImage = posts[i].author.avatar;
            if(postAuthorImage) {
                postAuthorImage = posts[i].author.avatar;
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `
                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon-post" alt="Profile pic">
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
                </div>`

            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedCont.appendChild(postCard);
        }
    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
});