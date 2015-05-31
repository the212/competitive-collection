// Helper Functions ==============================================================
function ContainsAny(str, items){
    for(var i in items){
        var item = items[i];
        //added toLowerCase for case insensitive
        if (str.toLowerCase().indexOf(item) > -1){
            return true;
        }

    }
    return false;
}

function logArrayElements(element, index, array) {
  	//console.log('a[' + index + '] = ' + element.text);

	if(ContainsAny(element.text, ["hiring", "food", "deliver"])){
   		console.log('a[' + index + '] = ' + element.text);
	}

}


// Get Twitter Data ==============================================================
module.exports = function(T) {

  /* Search Tweets
  T.get('search/tweets', { q: 'blue apron since:2015-05-29', count: 100 }, function(err, data, response) {
    console.log(data);
  });
  */

  /* Home Timeline */
  T.get('statuses/home_timeline', { count: 100 }, function(err, data, response) {
    //console.log(data);

    data.forEach(logArrayElements);

  });

  /* Get Suggested Users
  T.get('users/suggestions/:slug', { slug: 'meal kit' }, function (err, data, response) {
    console.log(data)
  });
  */

}