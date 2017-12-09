# kea antd example

This is an example create-react-app project showing the use of
[antd](https://ant.design/docs/react/getting-started)'s React components and
[keajs](https://kea.js.org/) in place of redux. The application is described by
the prompt below.

The application includes localstorage persistence, kea-controlled
actions/reducers and uses as much from antd as possible. Where antd falls short,
we use [emotion](https://emotion.sh/) to declare classes and some of the
override APIs from antd. There are also tests for action creators and reducers.

# The Prompt

So our front-end stack consists of

React & Flux We heavily use ALL of ES6/7 features.

I will want you to create an small app powered by React/Flux/CSS Flexbox in
which there will be a button on the screen that says “Open”. Clicking on this
button will open a modal which is centered in the middle of the screen and
always takes 60% width and 80% height (it should have an open and close scale
animation). In this modal there will be a tab bar on the left taking 20% width
and content area taking 80% width. Each tab’s content area is just a textarea
(you can type in it) and you can add or remove tabs (design is up to you). There
should also be a close button. If you close the modal (or refresh) and reopen
it, it should have its previous state (including last selected tab). There
should also be a “number of tabs” counter next to the “Open” button.

Don’t worry about IE support or anything.

Making it pretty is massive bonus points but not required.

At the end of the session you should just be able to zip up the folder (minus
the node_modules folder), send it to us and we should be able to npm install and
run it on our machines.
