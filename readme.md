## What is This?
Casted is proposing a secure, simple, and scalable way to embed podcast players on the Salesforce resource center. This document is to detail the proposed solutions and provide examples of the implementation.


**NOTE** - The examples are using a placeholder player. The final player design and embedded functionality is still being designed and developed as a collaboration between Salesforce and Casted.


## Proposed Solutions

#### Option 1
Salesforce will add an iframe to their pages that point to a Casted player. The embedded player will send analytic events via the postMessage protocol.

See a very simple [Demo](dist/iframe.html).

Read the details of this solution [here](option1.md).

#### Option 2
Casted will provide a [script](src/index.js) that can be hosted by Salesforce. This script will search through the current page and find placeholders on the page and setup a secure iframe to load the player.

Checkout a very simple [Demo](dist/index.html) of this in action.

Read the details of this solution [here](option2.md).