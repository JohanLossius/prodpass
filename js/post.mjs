import { token, usernameConst, profilePictureUrl } from "./constants/localStorage.mjs";
import { profileUrl, allUserPostsUrl, baseUrl } from "./constants/api.mjs";

const queryString = document.location.search;
const queryParams = new URLSearchParams(queryString);
const postIdQuery = queryParams.get("postId");

const apiUrlSinglePost = `${baseUrl}/social/posts/${postIdQuery}?_author=true&_comments=true&_reactions=true`;

const feedSectionCont = document.querySelector(".feed-section");
const commentsSection = document.querySelector(".see-comment-div");
const form = document.querySelector(".comment-form")
const commentInput = document.querySelector("#post-comment");
const submit = document.querySelector(".comment-button");

const profileName = document.querySelector(".community-title");
const profileBodyEmail = document.querySelector(".profile-email-class");

const nrOfFollowers = document.querySelector(".nr-of-followers");
const nrOfFollowing = document.querySelector(".nr-of-following");
const nrOfPosts = document.querySelector(".nr-of-posts");
const profileImage = document.querySelector(".profile-image");

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

// Display single post

async function showSinglePost() {
    console.log("Username: ", usernameConst); 

    try {
        const resp = await fetch(apiUrlSinglePost, options);

        const json = await resp.json();

        let postBody = json.body;

        let postAuthor = json.author.name;

        let postTime = json.created;
        let postDate = postTime.substring(0, 10);

        let postTitle = json.title;

        let postAuthorImage = json.author.avatar;
        if(postAuthorImage) {
            postAuthorImage = json.author.avatar;
        } else {
            postAuthorImage = "./images/blank-profile-picture.png";
        };

        let postTag = json.tags[0];

        const postCard = document.createElement("div");
        postCard.classList.add("post-card-individual");
        postCard.innerHTML =        `
                                        <div class="post-card-header">
                                            <div class="post-card-header-div">
                                                <img class="profile-picture-icon-post" alt="">
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
                                        </div>`

        postCard.querySelector(".post-card-title").textContent = postTitle;
        postCard.querySelector(".post-main-message").textContent = postBody;
        postCard.querySelector(".name-poster-div").textContent = postAuthor;
        postCard.querySelector(".topic-tag").textContent = postTag;
        postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
        feedSectionCont.appendChild(postCard);

        if (usernameConst != postAuthor) {
            editAndDeleteSection.style.display = "none";
        }

        async function profileData() {
            try {
                
                const profileEndpoint = `/social/profiles/${postAuthor}`;
                const profileUrl = baseUrl + profileEndpoint;
        
                const response = await fetch(profileUrl, options);
        
                const json2 = await response.json();
        
                let followers = json2._count.followers;
        
                let following = json2._count.following;
        
                let posts = json2._count.posts;

                let profileEmail = json2.email;
        
                let avatar = json2.avatar;
                if(avatar) {
                    avatar = json.author.avatar;
                } else {
                    avatar = "./images/blank-profile-picture.png";
                };
                
                profileName.textContent = postAuthor;
                profileImage.setAttribute("src", avatar);
                nrOfFollowers.innerHTML = followers;
                nrOfFollowing.innerHTML = following;
                nrOfPosts.innerHTML = posts;
                profileBodyEmail.textContent = profileEmail;
            }
        
            catch (error) {
                console.log("error: ", error);
            }
        }

        profileData();   

    } catch (error) {
        console.log(error);
    }
};

showSinglePost();

// Delete post code

const deleteButton = document.querySelector("#delete-button");
const mainColumnSectionSinglePost = document.querySelector(".column-section-single-post");
const editAndDeleteSection = document.querySelector(".edit-and-delete-section");

const deleteUrl = `${baseUrl}/social/posts/${postIdQuery}`;

const deleteOptions = {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

deleteButton.addEventListener("click", async()=> {
    try {
        const resp = await fetch(deleteUrl, deleteOptions);

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
const updateUrl = baseUrl + updateUrlEndpoint;
const tagInput = document.querySelector("#tags");
const postProfilePic = document.querySelector(".profile-picture-icon-post");

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

        let postTitle = json.title;

        let postTag = json.tags[0];

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
        console.log("json update post: ", json);

        let postAuthor = json.author.name;

        let postTime = json.created;
        let postDate = postTime.substring(0, 10);

        // let postUpdatedFull = json.updated;
        // let postUpdated = postUpdatedFull.substring(0, 10);

        let postBody = json.body;

        let postTag = json.tags[0];

        let postTitle = json.title;

        let postAuthorImage = json.author.avatar;
        if(postAuthorImage) {
            postAuthorImage = json.author.avatar;
            console.log("postauthorimage: ", postAuthorImage)
        } else {
            postAuthorImage = "./images/blank-profile-picture.png";
        }

        feedSectionCont.innerHTML = "";

        const postCard = document.createElement("div");
        postCard.classList.add("post-card-individual");
        postCard.innerHTML =        `
                                        <div class="post-card-header">
                                                <div class="post-card-header-div">
                                                    <img src="" class="profile-picture-icon-post" alt="Profile picture thumbnail">
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
        postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
        feedSectionCont.appendChild(postCard);

        updateSinglePostSection.style.display = "none";
        document.body.scrollTop = document.documentElement.scrollTop = 0;

    }
    catch(error) {
        console.log("Error from update call: ", error);
    }
});



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