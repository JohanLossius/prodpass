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
  
    const singlePostOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
          
    console.log("singlePostOptions: ", singlePostOptions);
    console.log("Username: ", usernameConst);
          
    try {
        const resp = await fetch(apiUrlSinglePost, singlePostOptions);
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
                                                    <div class="topic-tag">Topic tag</div>
                                                    <div class="topic-tag">Topic tag</div>
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
                                            <div class="post-footer-icon-cont">
                                                <div class="edit-post-button">Edit post</div>
                                            </div>
                                            <div class="post-footer-icon-cont">
                                                <div class="delete-post-button">Delete post</div>
                                            </div>
                                        </div>
                            `

        postCard.querySelector(".post-card-title").textContent = postTitle;
        postCard.querySelector(".post-main-message").textContent = postBody;
        postCard.querySelector(".name-poster-div").textContent = postAuthor;
        feedSectionCont.appendChild(postCard);

    } catch (error) {
        console.log(error);
    }
};

showSinglePost();


// Make a comment code

form.addEventListener("submit", async (data) => {
    data.preventDefault();

    if (commentInput.value) {
        const messageConst = commentInput.value;

        console.log("comment message console log: ", messageConst);

        const createCommentOptions = {
            method: 'POST',
            body: JSON.stringify({
              body: `${messageConst}`
            }),
            headers: {
                "Content-type": 'application/json; charset=UTF-8',
                "Authorization": `Bearer ${token}`
            },
        };

        console.log("createCommentOptions: ", createCommentOptions);

        try {
            const resp = await fetch(makeCommentUrl, createCommentOptions);

            console.log("resp comment const: ", resp);

            const json = await resp.json();
            console.log("json comment const: ", json);

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

        }

        catch (error) {
            console.log("Error from catch error, make comment: ", error);
        }
    }  
});


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