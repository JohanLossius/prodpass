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

        const createPostConst = {
            method: 'POST',
            body: JSON.stringify({
              title: `${titleConst}`,
              body: `${messageConst}`
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

            const postCard = document.createElement("div");
            postCard.classList.add("post-card");
            postCard.innerHTML = `

                <div class="post-card-header">
                    <div class="post-card-header-div">
                        <img src="" class="profile-picture-icon" alt="Profile picture thumbnail">
                    </div>
                    <div>
                        <div class="name-poster-div">${usernameConst}</div>
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
            postCard.querySelector(".see-full-button").setAttribute("title", postTitle);
            feedContNew.appendChild(postCard);

            // feedCont.innerHTML += `
            //     <div class="post-card">
            //         <div class="post-card-header">
            //                 <div class="post-card-header-div">
            //                     <img src="" class="profile-picture-icon" alt="Profile picture thumbnail">
            //                 </div>
            //                 <div>
            //                     <div class="name-poster-div">${usernameConst}</div>
            //                     <div class="post-footer-time-cont">
            //                         <div>Created: ${postDate}</div>
            //                     </div>
            //                 </div>
            //             <div class="post-card-header-div">
            //                 <div class="topic-tag-cont">
            //                     <div class="topic-tag">Topic tag</div>
            //                     <div class="topic-tag">Topic tag</div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="post-card-main">
            //             <h4 class="post-card-title">${postTitle}</h4>
            //             <div class="post-main-message">${postBodyExcerpt}</div>
            //             <a href="post.html?postId=${postId}" title="${postId}" class="see-full-button">
            //                 <div class="see-full-div">See Full</div>
            //             </a>
            //         </div>
            //         <div class="post-card-footer-individual">
            //             <div class="post-footer-icon-cont">
            //                 <img src="images/like-icon-heart.png" alt="Like icon" class="like-icon-class">
            //                 <div>0 likes</div>
            //             </div>
            //             <div class="post-footer-icon-cont">
            //                 <img src="images/svg-comment.svg" alt="Comment icon" class="comment-icon-class">
            //                 <div>0 comments</div>
            //             </div>
            //         </div>
            //     </div>
            // `
        }

        catch (error) {
            console.log("Error from catch error: ", error);
        }
    }  
});

// async function publishPost() {
//     try {}
// }

// {
//     "title": "string", // Required
//     "body": "string", // Optional
//     "tags": ["string"], // Optional
//     "media": "https://url.com/image.jpg" // Optional
//   }

//   const requestOptions = {
//     method: 'POST',
//     body: JSON.stringify({
//       email: `${emailConstLower}`,
//       password: `${passwordConst}`,
//     }),
//     headers: {
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   };

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
            
            const postCard = document.createElement("div")
            postCard.classList.add("post-card")
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
            //                                     <div class="name-poster-div">${postAuthor}</div>
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
            //                             <h4 class="post-card-title"></h4>
            //                             <div class="post-main-message">${postBodyExcerpt}</div>
            //                             <a href="post.html?postId=${postId}" class="see-full-button">
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
            //                     </div>`
            // feedCont.querySelector(".post-card-title").textContent = postTitle;
            // feedCont.querySelector(".post-main-message").textContent = postBodyExcerpt;
            // feedCont.querySelector(".name-poster-div").textContent = postAuthor;
            // feedCont.querySelector(".see-full-button").setAttribute("title", postTitle);
        }

    }
    catch (error) {
        console.log("Console log error from catch error: ", error);
    }
};

displayAllPosts();

// async function fetchWithToken(url) {
//     try {
//       const token = localStorage.getItem('accessToken');
//       const getData = {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const response = await fetch(url, getData);
//       console.log(response);
//       const json = await response.json();
//       console.log(json);
//       // Logs:
//       // 0: {title: 'test', body: 'test', tags: Array(0), media: '', created: '2022-09-18T08:04:05.484Z', …}
//       // 1: {title: 'This is a new post', body: 'This is updated text', tags: Array(1), media: 'whatevs', created: '2022-09-17T13:17:01.133Z', …}
//       // ... More array values
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   fetchWithToken(API_BASE_URL + '/api/v1/social/posts');
  



// const apiUrlSocial = "https://api.noroff.dev/api/v1/social";
// const apiUrlBasic = "https://api.noroff.dev/api/v1";

// async function feedPostCall() {
//     try {
//         const response = await fetch(apiUrlSocial);
//         const data = await response.json();
//         const feedPosts = data;
//         console.log(feedPosts);
        
        // for (let i = indexStart; i < blogPosts.length; i++) {

            // console.log(blogPosts[i].name);

            // let postTitle = "";
            // if (blogPosts[i].name) {
            //     postTitle = blogPosts[i].name;
            //     console.log(postTitle);
            // } else {
            //     postTitle = "Blog Title Unknown";
            //     console.log(postTitle);
            // }

            // console.log(blogPosts[i].id);

            // let postId = "";
            // if (blogPosts[i].id) {
            //     postId = blogPosts[i].id;
            //     console.log(postId);
            // } else {
            //     postId = "Blog ID Unknown";
            //     console.log(postId);
            // }

            // console.log(blogPosts[i].images[0].src);

            // let imageUrl = "";
            // if (blogPosts[i].images[0].src) {
            //     imageUrl = blogPosts[i].images[0].src;
            //     console.log(imageUrl);
            // } else {
            //     imageUrl = "";
            //     console.log(imageUrl);
            // }

            // console.log(blogPosts[i].images[0].alt);

            // let featuredImageDescription = "";
            // if (blogPosts[i].images[0].alt) {
            //     featuredImageDescription = blogPosts[i].images[0].alt;
            //     console.log(featuredImageDescription);
            // } else {
            //     featuredImageDescription = "";
            //     console.log(featuredImageDescription);
            // }

            // console.log(blogPosts[i].short_description);

            // let postExcerpt = "";
            // if (blogPosts[i].short_description) {
            //     postExcerpt = blogPosts[i].short_description;
            //     console.log(postExcerpt);
            // } else {
            //     postExcerpt = "...";
            //     console.log(postExcerpt);
            // }

            // carouselDivHome.innerHTML += `  <a href="blog-post.html?postId=${postId}&postTitle=${postTitle}" title="${postTitle}" class="blog-preview-slide">
            //                                     <h3 class="blog-preview-title-slide">${postTitle}</h3>
            //                                     <img src="${imageUrl}" alt="${featuredImageDescription}" class="blog-preview-image-slide">
            //                                     <p class="blog-preview-paragraph-slide">${postExcerpt}</p>
            //                                     <h4 class="read-full-blog-preview-slide">[... Click to read full ...]</h4>
            //                                 </a>`

            // if (i >= breakIndex) {
            //     break;
            // }
        // }
//     }
//     catch (error) {
//         console.log(error);
//     }
// };

// feedPostCall();
