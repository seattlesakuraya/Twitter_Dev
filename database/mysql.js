exports.getConnection = function(conf) {
    var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: conf.mysql.host,
		user: conf.mysql.user,
		password:  conf.mysql.password,
		database: conf.mysql.database,
		charset : 'utf8mb4',
	});
	return connection;	
}

exports.connect = function(connection, callback) {
	connection.connect(function(err) {
		if(err) {
			console.error('error connection: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
		callback();
	});
}

exports.createTweetTable = function(connection, nconf) {
	var sql = 'create table tweet ('
				+ 'tweet_id bigint, '
		 		+ 'tweet_id_str varchar(30), '
		 		+ 'user_id bigint , '
			 	+ 'user_id_str varchar(30), '
			 	+ 'user_name varchar(25) character set utf8mb4 , '
			 	+ 'user_screen_name varchar(16) character set utf8mb4 , '
			 	+ 'content text character set utf8mb4 , '
			 	+ 'created_at datetime, '
			 	+ 'is_truncated boolean, '
			 	+ 'hashtags text character set utf8mb4 , '
			 	+ 'symbols text character set utf8mb4 , '
			 	+ 'user_mentions text character set utf8mb4 , '
			 	+ 'urls text, '
			 	+ 'medias text, '
			 	+ 'source text, '
			 	+ 'geo text, '
			 	+ 'coordinates text, '
			 	+ 'place text, '
			 	+ 'place_name text, '
			 	+ 'country_code varchar(5), '
			 	+ 'reply_tweet_id bigint , '
			 	+ 'reply_tweet_id_str varchar(30), '
			 	+ 'reply_user_id bigint , '
			 	+ 'reply_user_id_str varchar(30), '
			 	+ 'reply_screen_name varchar(16) character set utf8mb4 , '
			 	+ 'is_quoted boolean, '
			 	+ 'retweet_count integer, '
			 	+ 'favorite_count integer, '
			 	+ 'is_retweeted boolean, '
			 	+ 'is_favorited boolean, '
			 	+ 'is_sensitive boolean, '
			 	+ 'lang varchar(10)'
			 	+ ') default charset=utf8mb4;';
	connection.query(sql, function (error, results, fields) {
		if(error) {
			console.log('failed to create tweet table.');
			console.log(error);
		} else {
			console.log('tweet table is successfully created.');
			nconf.set('create_table', false);
			nconf.save();
		}
	});
}