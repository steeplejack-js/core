# v1.0.0

## General
 - This is the core objects taken from the [Steeplejack](https://www.npmjs.com/package/steeplejack) project.
 This includes the `Base`, `Exception`, `FatalException` and `ValidationException` objects. The functionality
 is unchanged, save for the removal of the `.extend` helper on all objects for ES5 extension. There are no
 supported versions of NodeJS left that do no understand the `class` keyword, so this is what should now be
 used.
 - Rewrote in ES6 JavaScript. Was finding lots of problems with TypeScript - would regularly find that when
 I came back to the project after a couple of weeks, there would be issues with an old build.
