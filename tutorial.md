## JS Tooling Lab

- npm init
- npm install --save-dev webpack webpack-cli
- touch webpack.config.js
- paste:
```
  module.exports = {
    entry: './src/js/app.js',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    }
  }
```

- add to "scripts" section in package.json:
```
  "scripts": {
    ...
    "build": "webpack --watch"
  }
```

- touch src/js/app.js
- add something basic:
```
  console.log('loaded!')
```

- touch index.html
- paste:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>I Can Haz Cheeseburger?</title>
  </head>
  <body>
    <div class="container">
      Hello World!
    </div>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

- npm run build
- open index.html

Wootz! Your app is loaded.  Check the chrome console to see that your javascript executed.

- npm i --save-dev css-loader style-loader url-loader babel-core babel-loader babel-preset-es2015

- edit webpack.config.js
```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      },
    ]
  }
```

- touch src/css/main.css
- add some css directives:
```
.container {
  text-align: center;
}
```

- edit app.js. add to top:
```
  require('../css/main.css');
```

- rerun npm run build
- reload page
- hey your css is there!
