# Pokemon Arceus Team Builder

![Pokemon Legends Arceus Cover Photo](/assets/cover-photo.jpeg)

## Purpose

Gamefreak's new game, Pokemon Legends Arceus, offers an immense new world full of many familiar and some new Pokemon. This open world RPG offers a lot in terms of flexibility, but this freedom can lead to some difficulty in building a team. To combat this I decided to make a team builder app that will allow users to pick their 6 Pokemon for their team and get real time, visual feedback on the type coverage they have.

Because of the number Pokemon in the game, **242 at time of release**, it is important to make sure that you have a wide type coverage. The balancing of attacks that allows almost any similarly leveled creature to wreck your team makes typing even more important. This tool will keep your team going strong as your explore.

## Technologies Used

The backbone of this app is the PokeAPI. From this I got all the information needed to populate team slots and update the type coverage item. I added a script tag for the CDN to the axios package in my main HTML page. This makes it cleaner for making my requests than using the Fetch API.

I thought about using React with this app, but decided to stick with HTML5, CSS and Vanilla JavaScript. React does a lot of cool stuff with creating the reusable components and managing state, but I wanted to focus on object creation, state mangagement and object cleanup with this app. Vanilla JavaScript is a way to force myself to learn these better.

## Challenges

One issue I ran into with this is that Arceus introduces new typings for certain old Pokemon, but the API does not account for this. In order to overcome this I created a middleware that intercepts each Pokemon response and checks if the typing has changed in Arceus from the base typing. If so, I override the intial types with an array built off a new Pokemon type object before receiving the response on the Front End
