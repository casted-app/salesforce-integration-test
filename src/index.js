import 'promise-polyfill/src/polyfill' // https://www.npmjs.com/package/promise-polyfill
import Postmate from 'postmate' // https://www.npmjs.com/package/postmate


function CastedDocReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

// Once Page is Ready
CastedDocReady(function(){
  // Find all present casted players
  var players = document.querySelectorAll('.casted-player')
  
  // Loop through each player found
  for(var i=0; i<players.length;i++) {
    var player = players[i],
        size = player.getBoundingClientRect()
    
    if(player.dataset.podcastId) {
      // Hide div while we're loading
      player.style.display = "none";
      
      // Create an iframe and secure the connection
      new Postmate({
        container: player,
        url: 'http://localhost:3001/public/1/The-Casted-Podcast---QA-c3aeeda9/1c43a1f9?embed=true',
        name: 'casted' + player.dataset.podcastId,
        classListArray: ["casted-player-frame", "casted-frame-loading"]
      }).then(function(child){
        // Once secure connection is established, append iframe to page and add attributes
        child.frame.sandbox = "allow-same-origin allow-scripts"
        child.frame.scrolling = "no"
        child.frame.style.border = "none";
        child.frame.style.width = size.width
        child.frame.style.height = size.height ? size.height : "75vh";
        // Once attributes are set, display the embed
        player.style.display = "block"

        // Child can now send player-events which we can post to window, or wherever
        child.on('player-event', function(data) {
          console.log('player-event',data);
        })
      
      })
    }
  }
})



