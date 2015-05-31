// Get Twitter Data ==============================================================
module.exports = function(T, contentMatch) {

  // Matching Keywords ===========================================================
  var cMatch = contentMatch.getContentMatchObject();
  var platedMatch = contentMatch.getPlatedMatchObject();
  var companyMatch = contentMatch.getCompanyMatch(platedMatch);

  // Helper Functions ==============================================================
  function ContainsAny(str, items){
      for(var i in items){
          var item = items[i];
          //added toLowerCase for case insensitive
          if (str.toLowerCase().indexOf(item) > -1){
              return item;
          }

      }
      return false;
  }

  function logTweetObject(tweet, matchedWord, matchType) {
    //console.log(tweet);
    console.log(tweet.created_at);
    console.log(tweet.id);
    console.log(tweet.text);
    console.log(tweet.user.id);
    console.log(tweet.user.screen_name);

    //for each url in urls... urls.push(url.expanded_url)
    console.log(tweet.entities.urls);

    //for each hashtag in hashtags... hashtags.push(hashtag.text)
    console.log(tweet.entities.hashtags);

    //for each user in mentions... user_mentions.push({ name: user.name, id: user.id })
    console.log(tweet.entities.user_mentions);

    console.log('Plated');

    //TODO: smart way to figure out competitor

    console.log(matchedWord);
    console.log(matchType);
    console.log(new Date());

  }

  function getWordMatch(element, wordArray, matchType) {
    var matchedWord = ContainsAny(element.text, wordArray);
    if (matchedWord != false) {
      logTweetObject(element, matchedWord, matchType);
    }
  }

  function logArrayElements(element, index, array) {
    //console.log('a[' + index + '] = ' + element.text);

    getWordMatch(element, cMatch.product_marketing, 'product_marketing');
    getWordMatch(element, cMatch.market_funding, 'market_funding');
    getWordMatch(element, cMatch.status_growth, 'status_growth');
    getWordMatch(element, platedMatch.keywords, 'keyword');
    getWordMatch(element, companyMatch, 'competitor_leaders');

  }

  /* Search Tweets
  T.get('search/tweets', { q: 'blue apron since:2015-05-29', count: 100 }, function(err, data, response) {
    console.log(data);
  });
  */

  /* Home Timeline */
  T.get('statuses/home_timeline', { count: 1000 }, function(err, data, response) {
    //console.log(data);
    data.forEach(logArrayElements);
  });

  /* Get Suggested Users
  T.get('users/suggestions/:slug', { slug: 'meal kit' }, function (err, data, response) {
    console.log(data)
  });
  */

}