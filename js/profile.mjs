import { token, usernameConst, profilePictureUrl } from "./constants/localStorage.mjs";
import { profileUrl, allUserPostsUrl } from "./constants/api.mjs";

const feedCont = document.querySelector(".feed-cont");

const profileName = document.querySelector(".community-title");
profileName.innerHTML = usernameConst;

const nrOfFollowers = document.querySelector(".nr-of-followers");
const nrOfFollowing = document.querySelector(".nr-of-following");
const nrOfPosts = document.querySelector(".nr-of-posts");
const profileImage = document.querySelector(".profile-image");
const profileBodyEmail = document.querySelector(".profile-email-class");

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

/**
 * @function profileData This function uses the URL that is generated with the author's username, to create an API call that fetches the data about the author, to display it on the profile section of the profile page. The data is dynamically populated with JS into the hardcoded HTML of the web page.
 */
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

        let profilePicture = json2.avatar;
        console.log("profilePicture: ", profilePicture);
        if(profilePicture) {
            profilePicture = json2.avatar;
        } else {
            profilePicture = "./images/blank-profile-picture.png";
        };

        let profileEmail = json2.email;
        console.log("profileEmail ", profileEmail);

        profileImage.setAttribute("src", profilePicture);
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

/**
 * @function showProfilePosts This function uses the logged in users name, and uses that to create a URL that fetches the posts of the author from the server. Then it uses that data fetched, to display the posts with dynamic HTML that is automatically being built and appended to the relevant feed container section of the web page.
 */
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

            let postAuthorImage = json[i].author.avatar;
            console.log("postImage: ", postAuthorImage);
            if(postAuthorImage) {
                postAuthorImage = json[i].author.avatar;
            } else {
                postAuthorImage = "./images/blank-profile-picture.png";
            };

            let postTag = json[i].tags[0];
            console.log("postTag: ", postTag);

            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
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
            postCard.querySelector(".post-card-title").textContent = postTitle;
            postCard.querySelector(".post-main-message").textContent = postBodyExcerpt;
            postCard.querySelector(".name-poster-div").textContent = postAuthor;
            postCard.querySelector(".topic-tag").textContent = postTag;
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            postCard.querySelector(".profile-picture-icon-post").setAttribute("src", postAuthorImage);
            feedCont.appendChild(postCard);

        }

    } catch (error) {
        console.log(error);
    }
};

showProfilePosts();

