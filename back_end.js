$(document).ready(function(){
//  const $body = $('body');

  const $tweetContainer = $('.container.tweets');
  const $notificationContainer = $('.container.notification');
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
    
    notificationForNewTweets: function(newTweetCount) {
      let tweetMessage = $('<button id="view-tweets"></button>');
      tweetMessage.text('you have ' + (newTweetCount - initialTweetCount) + ' new tweets').prependTo($notificationContainer);
    },
    
    checkNewTweets: function() {
      let newTweetCount = this.countTweets();
      if (newTweetCount > initialTweetCount) {
        this.notificationForNewTweets(newTweetCount);
      }
      setTimeout(function() {
        this.checkNewTweets();
      }, 10000)
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
  
  
  window.onload = function init() {
    tweetHandlers.displayInitialTweets();                  
    
    setTimeout(function() {
      tweetEvents.checkNewTweets();
    }, 10000);
  
    $('.container.notification').on('click', 'button', function() {
      tweetHandlers.displayNewTweets();
      $('#view-tweets').remove('button');
    })

  }
  

})
