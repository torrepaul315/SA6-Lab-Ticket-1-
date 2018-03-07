## JS Tooling Lab

- npm init -y
- npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server
- touch webpack.config.js
- paste:
```
  const path = require('path')
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    entry: './src/js/app.js',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'My App',
        template: 'index.html'
      })
    ]
  }
```

- add to "scripts" section in package.json:
```
  "scripts": {
    ...
    "start": "webpack-dev-server --inline --content-base ./dist --env development",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development"
  }
```

- touch src/js/app.js
- add something basic:
```
  console.log('loaded!')
```

- touch index.html (index.html should be located at the root of your project)
- paste:
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div class="container">
      Hello World!
    </div>
  </body>
</html>
```

- npm run build
- open dist/index.html

Wootz! Your app is loaded.  Check the chrome console to see that your javascript executed.  Check out the "./dist" folder to see what was generated. Just upload the dist folder to a hosting site like S3 and you're good to go.

We've built the site for production.  For development, we want a dev server that automatically reloads when we make changes.  Try this:

- npm start
- open localhost:8080

Looks the same right?  Now try changing something in your js or html file.  Watch the site auto recompile & reload.  neat right!

- npm i --save-dev css-loader style-loader url-loader babel-core babel-loader babel-preset-es2015

- edit webpack.config.js.  add a new object to the structure exported from the file
```
  module.exports = {
    ... ,
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.resolve(__dirname, "src"),
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "src"),
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

- watch the page reload
- hey your css is there!
