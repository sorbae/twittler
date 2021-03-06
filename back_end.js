$(document).ready(function(){
//  const $body = $('body');

  const $allTweetContainer = $('.container.tweets');
  const $notificationContainer = $('.container.notification');
  const homeFeed = streams.home;
  let initialTweetCount = homeFeed.length;
  let tweetUsers = streams.users;
  

  const tweetEvents = {

    renderUserTweet: function() {
      let tweet = {};
      tweet.user = 'you';
      tweet.message = $('input').val();
      tweet.created_at = new Date();
      addTweet(tweet);
      initialTweetCount = tweetEvents.countTweets();
    },
    
    createTweetHeader: function(tweet) {
      let $tweetHeader = $('<div class="tweet-header"></div>');
      let $headerSpan = $('<span class="header"></span>');
      let $timeSpan = $('<span class="time"></span>');
    
      let time = tweet.created_at.toLocaleTimeString();
      let userLink = $('<a href="#" class="' + tweet.user + '">@' + tweet.user + '</a>');
      
      $headerSpan.append(userLink);
      $timeSpan.append(time);
      
      $tweetHeader.append($headerSpan);
      $tweetHeader.append($timeSpan)
      return $tweetHeader;
    },
    
    createTweetBody: function(tweet) {
      let $tweetBody = $('<div class="tweet-body"></div>');
      let message = $('<p>' + tweet.message + ' ' + '</p>');
      
      $tweetBody.append(message);
      return $tweetBody;
    },
    
    displayIndividualTweet: function(collection, index) {
      let tweet = collection[index];
      let $tweet = $('<div class="container tweet"></div>');
      let $tweetHeader = tweetEvents.createTweetHeader(tweet);
      let $tweetBody = tweetEvents.createTweetBody(tweet);
      
      $tweet.addClass(tweet.user);
      $tweetHeader.appendTo($tweet);
      $tweetBody.appendTo($tweet);
      $tweet.prependTo($allTweetContainer);
    },
    
    displayTweets: function(collection, start, end) {
      while (start < end) {
        tweetEvents.displayIndividualTweet(collection, start);
        start++;
      }
    },
    
    countTweets: function() {return homeFeed.length},
    
    notificationForNewTweets: function(newTweetCount) {
      let tweetMessage = $('<button id="view-tweets"></button>');
      tweetMessage.text('See more hoots in your feed').prependTo($notificationContainer);
    },
    
    checkNewTweets: function() {
      let newTweetCount = tweetEvents.countTweets();
      let notificationExists = $('.container.notification').children().length > 0;
      if (newTweetCount > initialTweetCount && !notificationExists) {
        tweetEvents.notificationForNewTweets(newTweetCount);
      }
      setTimeout(tweetEvents.checkNewTweets, 15000)
    }
    
  }
  
  
  const tweetHandlers = {
    
    displayInitialTweets: function() {
      tweetEvents.displayTweets(homeFeed, 0, initialTweetCount - 1);
    },
    
    displayNewTweets: function() {
      let newTweetCount = tweetEvents.countTweets();
      tweetEvents.displayTweets(homeFeed, initialTweetCount - 1, newTweetCount);
      initialTweetCount = newTweetCount;
    },
    
    filterTweetsByUser: function(user) {
      let tweets = Array.from($('.container.tweet'));
      for (let tweet of tweets) {
        tweet.classList.remove('hide');
        if (!(tweet.classList.contains(user))) {
          tweet.classList.add('hide');
        }
      }
    },
    
    createDefaultUser: function() {
      streams.users['you'] = [];
    },
    
    refreshTweets: function() {
      $('.container.tweet').removeClass('hide');
      $('.container.writeTweet').removeClass('hide');
      tweetHandlers.displayNewTweets();
      $('#view-tweets').remove('button');
    }
  }
  
  
  window.onload = function init() {
    
    tweetHandlers.displayInitialTweets(); 
    tweetHandlers.createDefaultUser();
    
    setTimeout(function() {
      tweetEvents.checkNewTweets();
    }, 15000);
  
    $('.container.notification').on('click', 'button', function() {
      tweetHandlers.refreshTweets();
    })
    
    $('.container.tweets').on('click', 'a', function() {
      let user = this.className;
      tweetHandlers.filterTweetsByUser(user);
      $('.container.writeTweet').addClass('hide');
    })
    
    $('nav').on('click', 'img', function() {
      let newTweetCount = tweetEvents.countTweets();
      if (initialTweetCount !== newTweetCount) {
        tweetHandlers.refreshTweets();
      }
    })
    
    $('.container.writeTweet').on('click', 'button', function() {
      if ($('input').val()) {
        tweetEvents.renderUserTweet();
        tweetHandlers.refreshTweets();
        $('#tweet-input').val('');
      }
    })
    
  }

})
