import 'promise-polyfill/src/polyfill' // https://www.npmjs.com/package/promise-polyfill
import Postmate from 'postmate' // https://www.npmjs.com/package/postmate


const CastedDocReady = (fn) => { 
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

// Once Page is Ready
CastedDocReady(() => {
  // Find all present casted players
  const players = document.querySelectorAll('.casted-player')
  
  // Loop through each player found
  players.forEach(player => {    
    const { podcastId } = player.dataset
    if(podcastId) {
      // Hide div while we're loading
      const {width,height} = player.getBoundingClientRect()
      player.style.display = "none";
      
      // Create an iframe and secure the connection
      new Postmate({
        container: player,
        url: `https://qa-podcast.casted.us/public/1/${podcastId}/315696?embed=true`,
        name: `casted_${podcastId}`,
        classListArray: ["casted-player-frame", "casted-frame-loading"]
      }).then(child => {
        // Once secure connection is established, append iframe to page and add attributes
        child.frame.sandbox = "allow-same-origin allow-scripts"
        child.frame.scrolling = "no"
        child.frame.style.border = "none";
        child.frame.style.width = width ? width : "100%"
        child.frame.style.height = height ? height : "75vh";
        // Once attributes are set, display the embed
        player.style.display = "block"

        // Child can now send player-events which we can post to window, or wherever
        child.on('player-event', data => {
          console.log('player-event',data);
        })
      }).catch(err => {
        console.error(err)
      })
    }
  })
})



