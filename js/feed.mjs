import {allPostsUrl, createPostUrl } from "./constants/api.mjs";
import { usernameConst, token, profilePictureUrl } from "./constants/localStorage.mjs";

// Filter posts by tag, Imported code

import { displayYourPosts, displayFilteredPostsProduct, displayFilteredPostsDiscovery, displayFilteredPostsDelivery, displayFilteredPostsTechnology, displayFilteredPostsInnovation, displayFilteredPostsFunding } from "./tags/handleTags.mjs";

console.log("yourproducts tag: ", displayFilteredPostsProduct);

const inputTitle = document.querySelector("#post-title");
const inputMessage = document.querySelector("#post-message");
const submitButton = document.querySelector("#post-button");
const form = document.querySelector(".publish-message-form");
const feedbackCont = document.querySelector(".feedback-cont");
const tagInput = document.querySelector("#tags");

const feedContNew = document.querySelector(".feed-cont-new");
const feedCont = document.querySelector(".feed-cont");

/**
 * @param {object} data Passes in the data input into the form, and submits it as an Object.
 * @property {object} createPostConst Populates the options container for the API call to be made, with the data as passed in from the form through the submit event.
 * @returns The try async function eventually returns the dynamic HTML generated from the submit form, by populating this data into the dynamically generated post card, and appends this to the uppermost Feed Cont on the Feed page. It also displays a success message to the user for when the api call was successful.
 */

form.addEventListener("submit", async (data) => {
    data.preventDefault();
    console.log("data: ", data);
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

            let postAuthorImage = json.author.avatar;
            if(postAuthorImage) {
                postAuthorImage = json.author.avatar;
                console.log("postauthorimage: ", postAuthorImage)
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }

            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon-post" alt="Profile pic">
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
                </div>`

            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedContNew.appendChild(postCard);

        }

        catch (error) {
            console.log("Error from catch error: ", error);
        }
    }  
});


/**
 * @function displayAllPosts Fetches all the posts on the server, limited to a 100 posts max, and displays these with dynamically populated HTML that is appended to the main feed cont on the feed.html page.
 * @property {string} allPostsUrl Contains the right URL for fetching all the posts from the API call, that can be done when the authorization header with its token is present.
 * @returns The async function returns the posts from the API and populates this as dynamic HTML and displays it in the feed container on the feed.html page. The HTML is generated to avoid possible XSS attacks by using the TextContent property instead of setting all .innerHTML dynamically, allowing users to misuse the HTML tags on submitting messages to the API.
 */
async function displayAllPosts() {
    try {
        const resp = await fetch(allPostsUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Response for API call: ", resp);
        const json = await resp.json();
        console.log("JSON const: ", json);

        console.log("JSON.length: ", json.length);

        for(let i = 0; i < 20; i++) {

            let postBody = json[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);

            let postAuthor = json[i].author.name;

            let postTime = json[i].created;
            let postDate = postTime.substring(0, 10);

            let postTitle = json[i].title;

            let postId = json[i].id;

            let postAuthorImage = json[i].author.avatar;
            if(postAuthorImage) {
                postAuthorImage = json[i].author.avatar;
                console.log("postauthorimage: ", postAuthorImage)
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            }

            let postTag = json[i].tags[0];
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img class="profile-picture-icon-post" alt="">
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

            // Profile pic div in post card header
            // <div class="post-card-header-div">
            //     <img src="" class="profile-picture-icon" alt="Profile pic">
            // </div>

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
};

displayAllPosts();