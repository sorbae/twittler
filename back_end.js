$(document).ready(function(){
//  const $body = $('body');
//  const $tweetBody = $('body.div.tweets');
//  $body.html('');
  
//  let index = streams.home.length - 1;
//  while(index >= 0){
//    const tweet = streams.home[index];
//    const $tweet = $('<div></div>');
//    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + tweet.created_at.toLocaleTimeString());
//    $tweet.appendTo($body);
//    index--;

  
  
  const $tweetBody = $('.tweets');
  const $tweet = $('<div></div>');
  let initialTweetCount = streams.home.length;
  
  const tweetHandlers = {
  
    tweetCount: function() {return streams.home.length;},

    displayTweet: function(index) {
      const tweet = streams.home[index];
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + tweet.created_at.toLocaleTimeString());
      $tweet.appendTo($tweetBody);
    },
    
    checkForNewTweets: function() {
      let newTweetCount = this.tweetCount();
      if (newTweetCount > initialTweetCount) {
        $tweet.text('you have ' + newTweetCount - initialTweetCount + ' new tweets.').prependTo($tweetBody);
      }
      
      setTimeout(function() {
        checkForNewTweets();
      }, 5000);
    }
    
  }
  
  
  function displayInitialTweets() {
    let index = streams.home.length - 1;
    while(index >= 0) {
      tweetHandlers.displayTweet(index);
      index--;
    }
  }
  
  displayInitialTweets();
  
  


})


