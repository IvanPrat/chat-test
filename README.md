# Simple Chat Test

This is a test chat challenge.

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

### Roadmap

- Tests
- Use Flex
- Fix "no-unused-vars" and "no-undef" common bugs from ESLint
- Fix "no-descending-specificity" for Stylelint
