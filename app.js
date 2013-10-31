var express = require('express'), 
	engine = require('ejs-locals'),
	fs = require('fs'),
	marked = require('marked'),
	dir = require('node-dir');

var app = express();

var posts = [];

dir.readFiles(__dirname + '/posts', {
    match: /.md$/,
    exclude: /^\./
    }, function(err, content, filename, next) {
        if (err) throw err;
        var fileInfo = fs.statSync(filename);
        posts.push({post:marked(content), date:fileInfo.ctime, name: getPostName(filename)});
        next();
    },
    function(err, files){
        if (err) throw err;
        orderPosts();
        console.log('finished reading files:',files);
    });

app.configure(function() {
	app.use(app.router);
	app.engine('ejs', engine);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.render('index', { posts: posts });
});

app.get('/post/:name', function(req, res){
	res.render('single', { post: posts[getPostNumber(req.params.name)] });
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port 3000');

/* Private Functions */
orderPosts = function(){
	posts.sort(function(a,b){
		var c = new Date(a.date);
		var d = new Date(b.date);
		return c-d;
	});

	posts.reverse();
}

getPostNumber = function(postName){
	for(i = 0; i < posts.length; i++){
		if(posts[i].name == postName){
			return i;
		}
	}
	return -1;
}

getPostName = function(filename){
	var pieces = filename.split("/");
	var nameWithExt = pieces.slice(-1)[0];
	return nameWithExt.split(".md")[0];
}