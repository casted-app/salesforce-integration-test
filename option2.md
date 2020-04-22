## Option 2

#### Proposed Solution

Casted will provide a [script](src/index.js) that can be hosted by Salesforce. This script will search through the current page and find placeholders on the page and setup a secure iframe to load the player.

Checkout a very simple [Demo](dist/index.html) of this in action

#### Benefits
**Simple Implementation**
* Team only has to add a div to a page with what podcast they want to display
* The script handles the complexities of sizing, securing an iframe, and creating event handlers
* Any updates to the player's design or functionality can be made on the Casted and deployed without any changes to the script hosted by Salesforce

**Security**
* iFrames create a limited access relationship between Salesforce site and the embedded content - no access to the Salesforce is allowed except what is explicitly defined.
* The script provided by Casted and hosted by Salesforce will explicitly define limited access and communication between the parent (Salesforce) page and embedded content (Casted Player). For instance, the embedded player will only be able to send predefined messages such as analytics events (like player start, stop).
* Any changes to the embedded player codebase cannot gain any additional access except was already explicitly defined in the hosted script

#### Considerations

**SEO**
* One drawback of iframes is search engines often give credit for the content to the embedded content's source. 
* This can be addressed if we create a subdomain such as `podcast.salesforce.com` to mask the player. This will ensure salesforce.com receives all SEO and content credit.
* Without a subdomain, Casted will ensure to use canonical tags to tell search engines the content is owned by salesforce.com even though it's hosted on listen.casted.us. This is less than ideal than a sub domain but will work as a backup.

**Layout and Design** 
* The player design will be developed and maintained by Casted
* Salesforce will provide mockups and approvals 
* Any changes to the design will require working with Casted to develop and deploy those changes


#### How it Works

Salesforce will add a placeholder `div` anywhere in the DOM with the `class` "casted-player" and add a `data-podcast-id` attribute that describes which podcast player should be embedded.
 
```html
<body>
  <!-- ... page markup -->
  <div class="casted-player" data-podcast-id="The-Casted-Podcast-86740"></div>
  <!-- ... rest of page -->
</body>
```

Once the page starts loading, the script will find the `div` above and do the following:

1. Generate an `iframe`
2. Secure that iframe with a handshake procedure to ensure the embedded content and parent page can communicate and no unexpected content can be injected
3. Load the src into the iframe
4. Size content and display on page
5. Establish event handlers for analytic events (player start, stop, progress, etc)

The resulting output will look (something) like this:

```html
<body>
  <!-- ... page markup -->
  <div class="casted-player" data-podcast-id="The-Casted-Podcast-86740" style="display: block;">
    <iframe name="casted_The-Casted-Podcast-86740" class="casted-player-frame" src="https://qa-podcast.casted.us/public/1/The-Casted-Podcast-86740/315696?embed=true" sandbox="allow-same-origin allow-scripts" scrolling="no"></iframe>
  </div>
  <!-- ... rest of page -->
</body>
```

## Other Solutions
Although Casted believes the above solution is the most ideal solution, we are happy to consider any modifications or alternatives that helps meets Salesforce's goals and security requirements.

For example, [see option 1](option1.md)