const queryString = document.location.search;
console.log("Query string: ", queryString);

const queryParams = new URLSearchParams(queryString);
console.log("Query params: ", queryParams);

const postIdQuery = queryParams.get("postId");
console.log("postIdQuery: ", postIdQuery);

const apiSinglePostEndpoint = `/social/posts/${postIdQuery}posts?_author=true&_comments=true&_reactions=true`;
const apiUrlBasic = "https://api.noroff.dev/api/v1";
const apiUrlSinglePost = apiUrlBasic + apiSinglePostEndpoint;

const makeCommentEndpoint = `/social/posts/${postIdQuery}/comment`;
const makeCommentUrl = apiUrlBasic + makeCommentEndpoint;

console.log("make comment url: ", makeCommentUrl);

console.log("apiUrlSinglePost: ", apiUrlSinglePost);

const usernameConst = localStorage.getItem("username");
const token = localStorage.getItem("accessToken");

const feedSectionCont = document.querySelector(".feed-section");
const commentsSection = document.querySelector(".see-comment-div");
const form = document.querySelector(".comment-form")
const commentInput = document.querySelector("#post-comment");
const submit = document.querySelector(".comment-button");

const profileEndpoint = `/social/profiles/${usernameConst}`;
const profileUrl = apiUrlBasic + profileEndpoint;

const profileName = document.querySelector(".community-title");
profileName.innerHTML = usernameConst;

const nrOfFollowers = document.querySelector(".nr-of-followers");
const nrOfFollowing = document.querySelector(".nr-of-following");
const nrOfPosts = document.querySelector(".nr-of-posts");
const profileImage = document.querySelector(".profile-image");

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

// Update profile data: Not correct because needs to be fixed so applies to correct profile author, not just the logged in person.

async function profileData() {
    try {
        const response = await fetch(profileUrl, options);
        console.log("Response: ", response);

        const json2 = await response.json();
        console.log("json2: ", json2);

        let followers = json2._count.followers;
        console.log("followers: ", followers);

        let following = json2._count.following;
        console.log("following: ", following);

        let posts = json2._count.posts;
        console.log("posts: ", posts);

        let avatar = json2.avatar;
        console.log("avatar: ", avatar);

        nrOfFollowers.innerHTML = followers;
        nrOfFollowing.innerHTML = following;
        nrOfPosts.innerHTML = posts;
    }

    catch (error) {
        console.log("error: ", error);
    }
}

profileData();

// Display single post

async function showSinglePost() {

    console.log("Username: ", usernameConst);
          
    try {
        const resp = await fetch(apiUrlSinglePost, options);
        console.log(resp);

        const json = await resp.json();

        console.log("Login API reponse: ", json);

        console.log("AccessToken const: ", token);

        let postBody = json.body;
        console.log("postBody: ", postBody);

        let postAuthor = json.author.name;
        console.log("postAuthor: ", postAuthor);

        let postTime = json.created;
        let postDate = postTime.substring(0, 10);
        console.log("createdDate: ", postDate);

        let postTitle = json.title;
        console.log("title: ", postTitle);

        let postTag = json.tags[0];
        console.log("postTag: ", postTag);

        const postCard = document.createElement("div");
        postCard.classList.add("post-card-individual");
        postCard.innerHTML =        `
                                        <div class="post-card-header">
                                                <div class="post-card-header-div">
                                                    <img src="" class="profile-picture-icon" alt="Profile picture thumbnail">
                                                </div>
                                                <div>
                                                    <div class="name-poster-div"></div>
                                                    <div class="post-footer-time-cont">
                                                        <div>Created: ${postDate}</div>
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

                            // <div class="post-footer-icon-cont">
                            //     <div class="edit-post-button">Edit post</div>
                            // </div>
                            // <div class="post-footer-icon-cont">
                            //     <div class="delete-post-button" id="delete-button">Delete post</div>
                            // </div>

        postCard.querySelector(".post-card-title").textContent = postTitle;
        postCard.querySelector(".post-main-message").textContent = postBody;
        postCard.querySelector(".name-poster-div").textContent = postAuthor;
        postCard.querySelector(".topic-tag").textContent = postTag;
        feedSectionCont.appendChild(postCard);

        if (usernameConst != postAuthor) {
            editAndDeleteSection.style.display = "none";
        }

    } catch (error) {
        console.log(error);
    }
};

showSinglePost();


// Make a comment code

// form.addEventListener("submit", async (data) => {
//     data.preventDefault();

//     if (commentInput.value) {
//         const messageConst = commentInput.value;

//         console.log("comment message console log: ", messageConst);

//         const createCommentOptions = {
//             method: 'POST',
//             body: JSON.stringify({
//               body: `${messageConst}`
//             }),
//             headers: {
//                 "Content-type": 'application/json; charset=UTF-8',
//                 "Authorization": `Bearer ${token}`
//             },
//         };

//         console.log("createCommentOptions: ", createCommentOptions);

//         try {
//             const resp = await fetch(makeCommentUrl, createCommentOptions);

//             console.log("resp comment const: ", resp);

//             const json = await resp.json();
//             console.log("json comment const: ", json);




            // let postBody = json.body;
            // console.log("postBody: ", postBody);

            // let postTime = json.created;
            // let postDate = postTime.substring(0, 10);
            // console.log("createdDate: ", postDate);

            // let postId = json.id;
            // console.log("postID: ", postId);

            // const commentCard = document.createElement("div")
            // commentCard.classList.add("comment-card")
            // commentCard.innerHTML = `
            //                             <div class="profile-thumbnail-and-comment-div">
            //                                 <div class="profile-thumbnail-div">
            //                                     <img src="images/blank-profile-picture.png" class="profile-picture-icon" alt="Profile picture thumbnail">
            //                                 </div>
            //                                 <div class="comment-div">
            //                                     <div class="name-and-date-div-comment">
            //                                         <div class="profile-name-comment-div">${usernameConst}</div>
            //                                         <div class="posted-date-comment-div">${postDate}</div>
            //                                     </div>
            //                                     <div class="main-comment-div"></div>
            //                                 </div>
            //                             </div>
            //                             <div class="like-on-comment-div">
            //                                 <div class="like-icon-comment-div">
            //                                     <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
            //                                 </div>
            //                                 <div class="nr-of-likes-div-comment"></div>
            //                             </div>

            // `
            // commentCard.querySelector(".main-comment-div").textContent = postBody;
            // commentsSection.appendChild(commentCard);





//         }

//         catch (error) {
//             console.log("Error from catch error, make comment: ", error);
//         }
//     }  
// });



// Full comment div content

//                                             <div class="profile-thumbnail-and-comment-div">
//                                                 <div class="profile-thumbnail-div">
//                                                     <img src="images/blank-profile-picture.png" class="profile-picture-icon" alt="Profile picture thumbnail">
//                                                 </div>
//                                                 <div class="comment-div">
//                                                     <div class="name-and-date-div-comment">
//                                                         <div class="profile-name-comment-div">Kevin Lassier</div>
//                                                         <div class="posted-date-comment-div">3 days ago</div>
//                                                     </div>
//                                                     <div class="main-comment-div">What a great post, thanks for sharing. Also, I'd liked to elaborate on a few more points. How can we really deliver the value as promised? And would you like to increase the rates of the services?</div>
//                                                 </div>
//                                             </div>
//                                             <div class="like-on-comment-div">
//                                                 <div class="like-icon-comment-div">
//                                                     <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
//                                                 </div>
//                                                 <div class="nr-of-likes-div-comment">5 likes</div>
//                                             </div>



// Delete post code

const deleteButton = document.querySelector("#delete-button");
const mainColumnSectionSinglePost = document.querySelector(".column-section-single-post");
const editAndDeleteSection = document.querySelector(".edit-and-delete-section");

console.log("Delete button: ", deleteButton);

const deleteUrlEndpoint = `/social/posts/${postIdQuery}`;
const deleteUrl = apiUrlBasic + deleteUrlEndpoint;


const deleteOptions = {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

deleteButton.addEventListener("click", async()=> {
    try {
        const resp = await fetch(deleteUrl, deleteOptions);
        console.log("Delete response ", resp);

        mainColumnSectionSinglePost.innerHTML = `<div class="confirmation-div">The post was successfully deleted.</div>`;

    } catch(error) {
        console.log("Delete error: ", error);
    }
});


// Update post code

const updateSinglePostSection = document.querySelector(".publish-message-section-update-single-post");

const editButton = document.querySelector(".edit-post-button");
const inputTitle = document.querySelector("#post-title");
const inputMessage = document.querySelector("#post-message");
const publishButton = document.querySelector("#post-button");
const formUpdate = document.querySelector(".publish-message-form");
const updateUrlEndpoint = `/social/posts/${postIdQuery}?_author=true&_comments=true&_reactions=true`
const updateUrl = apiUrlBasic + updateUrlEndpoint;
const tagInput = document.querySelector("#tags");

console.log("inputTitle: ", inputTitle);
console.log("inputMessage: ", inputMessage);

editButton.addEventListener("click", displayUpdatePost);

function displayUpdatePost() {
    updateSinglePostSection.style.display = "block";
    updateSinglePostInputs();
}


async function updateSinglePostInputs() { 
    try {
        const resp = await fetch(apiUrlSinglePost, options);

        const json = await resp.json();

        let postBody = json.body;
        console.log("postBody: ", postBody);

        let postTitle = json.title;
        console.log("title: ", postTitle);

        let postTag = json.tags[0];
        console.log("postTag: ", postTag);

        console.log("post tag update: ", postTag);

        inputTitle.setAttribute("value", postTitle);
        inputMessage.setAttribute("value", postBody);
        // How to set value automatically to current tag?
        // tagInput.setAttribute("value", postTag);

    } catch (error) {
        console.log(error);
    }
};

formUpdate.addEventListener("submit", async (data) => {
    data.preventDefault();

    const tagConst = tagInput.value;

    console.log("tag const log: ", tagConst);

    const updateOptions = {
        method: 'PUT',
        body: JSON.stringify({
            id: postIdQuery,
            title: inputTitle.value,
            body: inputMessage.value,
            tags: [tagConst],
          }),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    try {
        const resp = await fetch(updateUrl, updateOptions)

        const json = await resp.json();

        console.log("api feedback update post call: ", json);

        let postAuthor = json.author.name;
        console.log("postAuthor: ", postAuthor);

        let postTime = json.created;
        let postDate = postTime.substring(0, 10);
        console.log("createdDate: ", postDate);

        let postUpdatedFull = json.updated;
        let postUpdated = postUpdatedFull.substring(0, 10);
        console.log("updatedDate: ", postUpdated);

        let postBody = json.body;
        console.log("postBody: ", postBody);

        let postTag = json.tags[0];
        console.log("postTag: ", postTag);

        let postTitle = json.title;
        console.log("title: ", postTitle);

        feedSectionCont.innerHTML = "";

        const postCard = document.createElement("div");
        postCard.classList.add("post-card-individual");
        postCard.innerHTML =        `
                                        <div class="post-card-header">
                                                <div class="post-card-header-div">
                                                    <img src="" class="profile-picture-icon" alt="Profile picture thumbnail">
                                                </div>
                                                <div>
                                                    <div class="name-poster-div"></div>
                                                    <div class="post-footer-time-cont">
                                                        <div>Created: ${postDate} (updated ${postUpdated})</div>
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
        postCard.querySelector(".post-main-message").textContent = postBody;
        postCard.querySelector(".name-poster-div").textContent = postAuthor;
        postCard.querySelector(".topic-tag").textContent = postTag;
        feedSectionCont.appendChild(postCard);

        updateSinglePostSection.style.display = "none";
        document.body.scrollTop = document.documentElement.scrollTop = 0;

    }

    catch(error) {
        console.log("Error from update call: ", error);
    }

});
