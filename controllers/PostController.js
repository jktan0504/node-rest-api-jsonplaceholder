let restClient = require('node-rest-client').Client;
let client = new restClient();

const util = require('util');
const request = require("request");
const requestPromise = util.promisify(request);

// GET ALL POSTS FROM jsonplaceholder
exports.getAllPosts = async (req, res, next) => {

    return new Promise(async (resolve, rejects) => {
        try {
            var options = {
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;',
                },
            };
            
            let result = await requestPromise(options, function (error, response) {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(response.body));
                }
            });
        } catch (err) {
            console.log(err);
            rejects(err)
        }
    });
    
};

// GET SINGLE POST FROM jsonplaceholder
exports.getSinglePost = async (req, res, next) => {
    let postId = req.postId;
    return new Promise(async (resolve, rejects) => {
        try {
            let postId = req.postId;
            var options = {
                method: 'GET',
                url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;',
                },
            };
            
            let result = await requestPromise(options, function (error, response) {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(response.body));
                }
            });
        } catch (err) {
            console.log(err);
            rejects(err)
        }
    });
    
};

// GET ALL POSTS FROM jsonplaceholder
exports.getAllComments = async (req, res, next) => {

    return new Promise(async (resolve, rejects) => {
        try {
            var options = {
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/comments',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;',
                },
            };
            
            let result = await requestPromise(options, function (error, response) {
                if (response.statusCode == 200) {
                    resolve(JSON.parse(response.body));
                }
            });
        } catch (err) {
            console.log(err);
            rejects(err)
        }
    });
    
};


// GET TOP POSTS ORDERERD BY THE NUMBER OF COMMENTS
exports.getTopCommentPosts = async (req, res, next) => {
    let allPosts = await this.getAllPosts(req, res, next);
    let allComments = await this.getAllComments(req, res, next);
    
    let resultArray = [];

    allPosts.forEach(post => {
        let selectedComments =  [];
        selectedComments = allComments.filter(comment => comment.postId == post.id);
        let data = {
            post_id: post.id,
            post_title: post.title,
            post_body: post.body,
            total_number_of_comments: selectedComments.length
        };
        resultArray.push(data);
    });

    var sortedResultArray = resultArray.sort((a, b) => {
        return a.total_number_of_comments > b.total_number_of_comments;
    });

    res.status(200).json({ data: sortedResultArray });
};