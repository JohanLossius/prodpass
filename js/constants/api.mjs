import { usernameConst, token, profilePictureUrl } from "../constants/localStorage.mjs";

const baseUrl = "https://api.noroff.dev/api/v1";
const allPostsUrlEndPoint = "/social/posts?_author=true&_comments=true&_reactions=true";
const allPostsUrl = baseUrl + allPostsUrlEndPoint;

const createPostEndpoint = "/social/posts?_author=true&_comments=true&_reactions=true";
const createPostUrl = baseUrl + createPostEndpoint;
const myPostsUrl = `${baseUrl}/social/profiles/${usernameConst}/posts?_author=true&_comments=true&_reactions=true`;

const allUserPostsEndpoint = `/social/profiles/${usernameConst}/posts?_author=true&_comments=true&_reactions=true`;
const profileEndpoint = `/social/profiles/${usernameConst}`;

const allUserPostsUrl = baseUrl + allUserPostsEndpoint;
const profileUrl = baseUrl + profileEndpoint;

export { allPostsUrl, createPostUrl, baseUrl, myPostsUrl, profileUrl, allUserPostsUrl };

