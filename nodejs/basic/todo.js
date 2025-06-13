const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

async function getData(type) {
    const res = await axios.get(`${API}/${type}`);
    return res.data;
}

// 2.Get data from all users from API above. You will get a list of 10 users.
async function  getUsers() {
    return await getData('users');
}

//3.Get all the posts and comments from the API. Map the data with the users array. The data format should be like this:
async function getUsersMerge() {
    try {
        const [users, posts, comments] = await Promise.all([
            getUsers(),
            getData('posts'),
            getData('comments')
        ]);

        return users.map(user => {
            const userPosts = posts.filter(post => post.userId === user.id);
            const userComments = comments.filter(comment =>
                userPosts.some(post => post.id === comment.postId)
            );

            // Format post object
            const formattedPosts = userPosts.map(({userId, ...rest}) => rest);
            const formattedComments = userComments.map(({email, ...rest}) => rest);

            return {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                comments: formattedComments,
                posts: formattedPosts
            };
        });
    } catch (err) {
        console.error('Error:', err.message);
    }
}

//4. Filter only users with more than 3 comments.
async function filterUsers() {
    const users = await getUsersMerge();

    return users.filter(user => Array.isArray(user.comments) && user.comments.length > 3);
}

//5. Reformat the data with the count of comments and posts
async function formatUsers() {
    const users = await getUsersMerge();

    return users.map(user => {
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            commentsCount: user.comments.length,
            postsCount: user.posts.length
        };
    })
}

//6. Who is the user with the most comments/posts?
async function getMost() {
    const usersFormat = await formatUsers();
    const userMostComments = usersFormat.reduce((maxUser, currentUser) => {
        return currentUser.commentsCount > maxUser.commentsCount ? currentUser : maxUser;
    });

    const userMostPosts = usersFormat.reduce((maxUser, currentUser) => {
        return currentUser.postsCount > maxUser.postsCount ? currentUser : maxUser;
    });

    console.dir(userMostComments, {depth: null});
    console.dir(userMostPosts, {depth: null});
}

//7. Sort the list of users by the postsCount value descending?
async function sortUsers() {
    const usersFormat = await formatUsers();
    const sortUsersByPosts = [...usersFormat].sort((a, b) => b.postsCount - a.postsCount);
    console.dir(sortUsersByPosts, {depth: null});
}

//8.
async function getPostWithComments(postId) {
    try {
        const [postRes, commentsRes] = await Promise.all([
           axios.get(`${API}/posts/${postId}`),
           axios.get(`${API}/comments`, {params: { postId } })
        ]);

        const post = postRes.data;
        const comments = commentsRes.data;

        return {
            ...post,
            comments
        };
    } catch (err) {
        console.error('Error:', err.message);
    }
}

// getUsers();
// getUsersMerge();
// filterUsers();
// formatUsers();
// getMost();
// sortUsers();
// getPostWithComments(1);