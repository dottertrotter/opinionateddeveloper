var express = require('express'), 
	engine = require('ejs-locals'),
	fs = require('fs'),
	marked = require('marked'),
	dir = require('node-dir');

var app = express();

var posts = [];

dir.readFiles('posts', {
    match: /.md$/,
    exclude: /^\./
    }, function(err, content, filename,next) {
        if (err) throw err;
        var fileInfo = fs.statSync(filename);
        posts.push({post:marked(content), date:fileInfo.ctime});
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

app.listen(3000);
console.log('Listening on port 3000');

/* Private Functions */
orderPosts = function(){
	posts.sort(function(a,b){
		var c = new Date(a.date);
		var d = new Date(b.date);
		return c-d;
	});
}