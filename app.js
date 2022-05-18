const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connection = require('./database');

//Middleware:
app.use(helmet());
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

//Routers:
const loginRoute = require('./routes/auth');
const followRoute = require('./routes/follow');
const unfollowRoute = require('./routes/unfollow');
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts');
const likeRoute = require('./routes/like');
const unlikeRoute = require('./routes/unlike');
const commentRoute = require('./routes/comment');
const allPostsRoute = require('./routes/allPosts');

//API routes:
app.use('/api/authenticate', loginRoute);
app.use('/api/follow', followRoute);
app.use('/api/unfollow', unfollowRoute);
app.use('/api/user', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/like', likeRoute);
app.use('/api/unlike', unlikeRoute);
app.use('/api/unlike', unlikeRoute);
app.use('/api/comment', commentRoute)
app.use('/api/all_posts', allPostsRoute);

connection();
app.get('/', (req, res)=>{
    res.send("Assignment by Tushar Bharti.")
})
app.listen(process.env.PORT || 5000, () => {
    console.log('The server is running successfully!');
})