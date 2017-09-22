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

  
  const tweetHandlers = {
  
    tweetCount: function() {return streams.home.length;},

    displayTweet: function() {
      const tweet = streams.home[0];
      const $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + tweet.created_at.toLocaleTimeString());
      $tweet.appendTo($('.tweets'))
    }
  }
})

