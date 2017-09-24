$(document).ready(function(){
//  const $body = $('body');

  const $tweetContainer = $('.container.tweets');
  let initialTweetCount = streams.home.length;
  

  const tweetEvents = {
    
    displayIndividualTweet: function(index) {
      let tweet = streams.home[index];
      let $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + tweet.created_at.toLocaleTimeString());
      $tweet.prependTo($tweetContainer);
    },
    
    displayTweets: function(start, end) {
      while (start < end) {
        tweetEvents.displayIndividualTweet(start);
        start++;
      }
    },
    
    countTweets: function() {return streams.home.length},
    
    checkNewTweets: function() {
      let newTweetCount = this.countTweets();
      if (newTweetCount > initialTweetCount) {
        let tweetMessage = $('<button></button>');
        tweetMessage.addClass('notification');
        tweetMessage.addClass('view-tweets');
        tweetMessage.text('you have ' + (newTweetCount - initialTweetCount) + ' new tweets').prependTo($tweetContainer);
      }
    }
    
  }
  
  const tweetHandlers = {
    
    displayInitialTweets: function() {
      tweetEvents.displayTweets(0, initialTweetCount - 1);
    },
    
    displayNewTweets: function() {
      let newTweetCount = tweetEvents.countTweets();
      tweetEvents.displayTweets(initialTweetCount - 1, newTweetCount);
      initialTweetCount = newTweetCount;
    }
    
    
  }
  
                  
  tweetHandlers.displayInitialTweets();                  
  setTimeout(function() {
    tweetEvents.checkNewTweets();
  }, 10000);
  $(this).on('click', function() {
    tweetHandlers.displayNewTweets();
  })
  

})


