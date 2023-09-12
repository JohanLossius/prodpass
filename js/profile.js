const usernameConst = localStorage.getItem("username");
const token = localStorage.getItem("accessToken");

const baseUrl = "https://api.noroff.dev/api/v1";
const allUserPostsEndpoint = `/social/profiles/${usernameConst}/posts?_author=true&_comments=true&_reactions=true`;
const profileEndpoint = `/social/profiles/${usernameConst}`;

const allUserPostsUrl = baseUrl + allUserPostsEndpoint;
const profileUrl = baseUrl + profileEndpoint;

const feedCont = document.querySelector(".feed-cont");

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

async function showProfilePosts() {
          
    console.log("options: ", options);
    console.log("Username: ", usernameConst);
          
    try {
        const resp = await fetch(allUserPostsUrl, options);
        console.log(resp);

        const json = await resp.json();

        console.log("Login API reponse: ", json);

        console.log("AccessToken const: ", token);

        for(let i = 0; i < json.length; i++) {

            let postBody = json[i].body;
            let postBodyExcerpt = postBody.substring(0, 400);
            console.log("postBodyExcerpt: ", postBodyExcerpt);

            let postTime = json[i].created;
            let postDate = postTime.substring(0, 10);
            console.log("createdDate: ", postDate);

            let postTitle = json[i].title;
            console.log("title: ", postTitle);

            let postAuthor = json[i].author.name;
            console.log("author: ", postAuthor);

            let postId = json[i].id;
            console.log("postID: ", postId);

            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile picture thumbnail">
                    </div>
                    <div>
                        <div class="name-poster-div"></div>
                        <div class="post-footer-time-cont">
                            <div>Posted: ${postDate}</div>
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
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedCont.appendChild(postCard);

            // feedCont.innerHTML += `
            //                     <div class="post-card">
            //                         <div class="post-card-header">
            //                                 <div class="post-card-header-div">
            //                                     <img src="" class="profile-picture-icon" alt="Profile picture thumbnail">
            //                                 </div>
            //                                 <div>
            //                                     <div class="name-poster-div">${usernameConst}</div>
            //                                     <div class="post-footer-time-cont">
            //                                         <div>Posted: ${postDate}</div>
            //                                     </div>
            //                                 </div>
            //                             <div class="post-card-header-div">
            //                                 <div class="topic-tag-cont">
            //                                     <div class="topic-tag">Topic tag</div>
            //                                     <div class="topic-tag">Topic tag</div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                         <div class="post-card-main">
            //                             <h4 class="post-card-title">${postTitle}</h4>
            //                             <div class="post-main-message">${postBodyExcerpt}</div>
            //                             <a href="post.html?postId=${postId}" title="${postTitle}" class="see-full-button">
            //                                 <div class="see-full-div">See Full</div>
            //                             </a>
            //                         </div>
            //                         <div class="post-card-footer-individual">
            //                             <div class="post-footer-icon-cont">
            //                                 <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
            //                                 <div>0 likes</div>
            //                             </div>
            //                             <div class="post-footer-icon-cont">
            //                                 <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
            //                                 <div>0 comments</div>
            //                             </div>
            //                         </div>
            //                     </div>
            //                     `
        }

    } catch (error) {
        console.log(error);
    }
};

showProfilePosts();

