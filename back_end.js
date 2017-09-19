$(document).ready(function(){
  const $body = $('body');
  $body.html('');
  
  var index = streams.home.length - 1;
  while(index >= 0){
    const tweet = streams.home[index];
    const $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + tweet.created_at.toLocaleTimeString());
    $tweet.appendTo($body);
    index--;
  }
});