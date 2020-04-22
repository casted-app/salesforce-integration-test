## Option 2

#### Proposed Solution

Salesforce will add an iframe to their pages that point to a Casted player. The embedded player will send analytic events via the postMessage protocol.

See a very simple [Demo](dist/iframe.html).

#### Benefits
**Easy Implementation**
* Salesforce simply includes an iframe on the page
* Analytic events are passed to the parent page via the postMessage protocol
* Any updates to the player's design or functionality can be made on the Casted and deployed without any changes to the Salesforce embed code

**Security**
* iFrames create a limited access relationship between Salesforce site and the embedded content - no access to the Salesforce is allowed except what is explicitly defined.
* Salesforce has complete control over what message are received, how they are handled, and what permissions the iframe receives
* Any changes to the embedded player codebase cannot gain any additional access except was already explicitly defined by Salesforce

#### Considerations

**Sizing**
* The embeded player will not always be the same height based on how many takeaways exist, how long the transcripts is, etc. Scrolling an iframe is typically considered a bad user experience
* This can be addressed by agreeing on a max height for the player and Casted will attempt to ensure the content does not extend past that height
* Alternatively, a postMessage can be used where the player gives the parent a suggested height and the parent updates the child's frame height


**SEO**
* One drawback of iframes is search engines often give credit for the content to the embedded content's source. 
* This can be addressed if we create a subdomain such as `podcast.salesforce.com` to mask the player. This will ensure salesforce.com receives all SEO and content credit.
* Without a subdomain, Casted will ensure to use canonical tags to tell search engines the content is owned by salesforce.com even though it's hosted on listen.casted.us. This is less than ideal than a sub domain but will work as a backup.

**Layout and Design** 
* The player design will be developed and maintained by Casted
* Salesforce will provide mockups and approvals 
* Any changes to the design will require working with Casted to develop and deploy those changes


#### How it Works

Salesforce will add an iframe anywhere in the DOM with the src attribute pointing to the podcast's dedicated page. Sandbox, width, and height attributes should also be set.
 
```html
<body>
  <!-- ... page markup -->
  <iframe 
    width="100%" 
    height="350px" 
    scrolling="no" 
    style="border: none" 
    sandbox="allow-scripts allow-same-origin"
    src="https://qa-podcast.casted.us/...exampleurl">
  </iframe>
  <!-- ... rest of page -->
</body>
```
See this code in action in the repo at [/dist/iframe.html](https://github.com/casted-app/salesforce-integration-test/blob/master/dist/iframe.html)

When a user interacts with the loaded player, events will be submitted via the postMessage protocol. Listening for those events is fairly simple:

```html
<script>
  // Listen for event's posted to window from child iframe
  window.addEventListener("message", function(message){
    // Ensure event is coming from Casted
    if(message.origin === "https://qa-podcast.casted.us" && message.data.event) {
      // Handle events
      console.log("Event Received", message.data.event, message.data.payload)
    }
  }, false)
</script>
```

## Other Solutions
Although Casted believes the above solution is the most ideal solution, we are happy to consider any modifications or alternatives that helps meets Salesforce's goals and security requirements.

For example, [see option 2](option2.md)