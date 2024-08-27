# Upvote Manager

I designed a simple responsive layout (RWD) to make the project easy to view on both mobile and desktop devices.

This project demonstrates an upvote system with the following main features:

1. Add New Field: Allows users to add new fields dynamically.
2. Add New Upvote Button: Users can add new upvote buttons within each field.
3. Click Upvote: Users can click the upvote button to toggle its state.
4. Switch Button to Control Upvote Consistency: A switch controls whether the upvote buttons within the same field should remain consistent.

**These states are cached in localStorage. When the page is refreshed, the states will be retained.**

## How to use
After 
```
npm install
```
you can run
```
npm run start
```
or
```
npm run test
```

## Features

### Create new vote 
Allows users to add new Vote dynamically.

### Add new upvote button
Users can add new upvote buttons within each field. When the user clicks the upvote button, it will toggle the state. This state change will only affect the upvote buttons within the same field and will not impact other fields.


### Switch Button
* Switch On: When the switch is turned on, all upvote buttons within the same field will maintain the same state. If a new upvote button is added, it will inherit the state of the existing buttons in that field.

* Switch Off: When the switch is turned off, each upvote button within the same field operates independently. Any new upvote button added will default to an unclicked state.

* Switch Toggle: Toggling the switch will clear all fields.

### Reset Button
Resets the switch to "On" and clears all fields.


## Concept Overview

I’ve refactored the code into three components: VoteWrap, VoteContent, and VoteIcon, with data passed solely through props since the logic is straightforward.

* VoteIcon: Represents the button itself.
* VoteContent: Manages the list of buttons.
* VoteWrap: Oversees all button lists.

If future expansion is needed in the child components, voteList and setVoteList can easily be moved to Redux from VoteWrap. The stateConsistency in VoteWrap toggles whether the upvote states need to remain consistent, and VoteContent can choose whether to utilize this parameter.

The reason for extracting VoteIcon into its own component is to simplify future updates to the button style. You can easily develop and swap in a new button style without modifying other components.

This design allows team members to effortlessly replace or update the button (VoteIcon), expand the button list (VoteContent), and manage the button data (VoteWrap).

## Dependencies and Tools

* React: For building the user interface.
* CRACO: Used to create aliases, enabling cleaner imports like @/components/vote/VoteContent.
* Jest: For unit testing.
* React Testing Library: For testing React components.
* LocalStorage API: For caching states to retain them across page refreshes.
* Tailwind CSS: Facilitates quick and concise CSS writing.
* Ant Design (antd): For good-looking and easy-to-use buttons.
