$(document).ready(function(){
//  const $body = $('body');
//  const $tweetBody = $('body.div.tweets');
//  $body.html('');
//  

   
  const $tweetBody = $('.tweets');
  let initialTweetCount = streams.home.length;
  
  const tweetEvents = {
  
    tweetCount: function() {return streams.home.length;},

    displayTweet: function(index) {
      const tweet = streams.home[index];
      const $tweet = $('<div></div>');
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
  
  const tweetHandlers = {
    
    //if button pressed --> displayNewTweets
    displayNewTweets: function() {
      //current feed length --> original feed length
        //displayTweet
    }
    
  }
  
  
  function displayInitialTweets() {
    let index = initialTweetCount - 1;
    while(index >= 0) {
      tweetEvents.displayTweet(index);
      index--;
    }
  }
  
  displayInitialTweets();
  
  


})


