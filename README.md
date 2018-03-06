# Simple Chat Test

This is a test chat challenge.

It has been purely in Vanilla JS, using ES6 techniques and patterns, organized in classes, 
and then bundled together, using Babel for compatibility purposes, and then Grunt. 

Please, notice it's completelly Mobile-First, as you may see in the SCSS code. Also make sure
to check the ``/scss/`` folder, as you will see a folder named components, which tries to separate 
every single component from the app. It's based on BEM methodology, and it's completelly agnostic.

It is really scalable, however, it's not as finished as I'd really do: 

- Chats gets organized using chatrooms, so you can create infinite chatrooms, with more than one user
- Go back or refresh, uses the hash (like the chatroom name), so there's no need to load the whole page again
- For store the data I used sessionStorage
- Concerns are really separated
- Using the native template engine of ES6, so it can work with any rendering engine, as it only needs a JSON
- It works exactly as requested

If you want to lint the JS or the CSS, you can find it below, it uses ESLint and Stylelint

There are no tests, due the lack of time.

## Installation

Please, follow the steps below, in order to build the solution.

### Local Development

``` 
npm install
npm run build
grunt
```

### Test and Linting

**Test JS Code**

Some common non-bugs appear when you run it, due the lack of time to fix it.
``` 
eslint src/js
```

**Test CSS Code**

If you want to test CSS code, make sure you already compiled it with grunt. In order to avoid common bugs, we just test the whole bundled css solution.
``` 
stylelint dist/css/styles.css
```

### Roadmap (due the lack of time)

- Tests
- Improve Grunt (using Babelify and Browserify, to bundle it at one with ``grunt``)
- Organize the components following [Atomic Pattern](http://bradfrost.com/blog/post/atomic-web-design/)
- Load Messages Async (one by one, not a bunch of messages)
- Add cool effects when messages area reload
- In the chat, I'd use ``<dl>``'s, instead of ``<ul>``'s
- Make it more escalable
- When click "add as a friend", change the text
- Keep working on the components, in order to make it better + try to make a component based on CSS + JS + HTML
- Isolate the templates completely from the Business Logic
- Use Flex
- Fix "no-unused-vars" and "no-undef" common bugs from ESLint
- Fix "no-descending-specificity" for Stylelint