# nodejs

This repository is for the learning purpose of JavaScript Backend

## Course 1 (Code with Harry)

### Installation for express

`npm i express@[version]`

### Notes

- Slug is a parameter in url, for eg: `https:localhost:3000/abc`. Here `abc` is the slug
- `req.params` gets the slugs in url
- `req.query` gets the query of url, for `https:localhost:3000/abc?id=24141&mode=dark&region=pk`.  Here `id=24141&mode=dark&region=pk` is query
- To provide static files we create a folder and then put those files in that folder that we want to share and then the user can access using params. For example: The file name is `dummy.txt` then the user has to enter `https:localhost:3000/dummy.txt`
- To show files we can use `res.sendFile` function. In that we have to pass the link to that file and second parameter will be `{ root: __dirname }`, this tells that the file is in current directory (relative path).

#### Middleware

Middleware works between request and response.

- If we don't run the next method then the next part of code will not be executed

#### EJS

EJS(Embedded JavaScript) is a popular template engine for Node. js and web development. It allows you to generate dynamic HTML content by embedding JavaScript code within your HTML templates.

## Course 2 (Free Code Camp)

- REPL is a term in nodejs which stands for: Read, Evaluate, Print and Loop.
- We cannot use `window` and `document` object in NodeJS
- `dependencies` includes packages needed for the application to run in a production environment, while `devDependencies` includes packages required during development and testing but are not necessary for the production deployment.
- `npm uninstall <packagename>` = Uninstalls the given package

### Some Global Variables

1. __dirname  = path to current directory
2. __filename = file name
3. require    = function to use modules (CommonJS)
4. module     = info about current module (file)
5. process    = info about env where the program is being execute

### Buitin modules

Some of the Buitin modules are:

#### OS

This module is used to get information about the operating system

- `userInfo()`  = Gives information about the user
- `uptime()`    = Tells the time how long the system is running
- `totalmem()`  = Returns the total memory
- `freemem()` = Returns the free memory

#### path

This module is used to get information about the path

- `sep`     = Returns the path separator
- `join(path1,path2,...)`  = Joins the path with given arguments
- `basename(path)` = Returns the basename of the given path
- `resolve(path1,path2,...)` = Returns the absolute path

#### fs

- `readFileSync(path, type(utf-8, ascii ,etc.))` = Reads the contents of the file from the given path.
- `writeFileSync(path, content, appendcontent)` = Writes the contents of the file to the given path. The third argument is optional if it is {flag:'a'} then the given content will be added to the already existing content
- `readFile(path, type(utf-8, ascii ,etc.),callback(error,result))` = Reads the contents of the file from the given path
- `writeFile(path, content, appendcontent,,callback(error,result))` = Writes the contents of the file to the given path. The third argument is optional if it is {flag:'a'} then the given content will be added to the already existing content

>Note: `readFileSync` and `writeFileSync` are synchronous, if the files are huge or there are multiple processes of reading or writing, the system will be slow down, while `readFile` and `writeFile` are asynchronous. They will wait for the response and then execute the code just like promises.

#### http

- `createServer(callback(req ,res))` = Create a server
- `listen(port)` = Listen on the given port
- `res.write(content)` = Shows the content on the webpage on given port
- `res.end()` = Returns the server response
- `req.url` = Returns the url of the request

### Event Loop

- Js in single threaded because it runs the code line by line which is also called non-blocking
- Event Loop is basically the same as settimeout which runs after when the code is executed for avoiding time issues.
- `util.promisify(fs.writeFile)` is use to write a promise we don't have to setup the complete structure of the promise
- The part of the code that runs in the end asynchronously is called the offloaded code

#### Examples

1. readfile
2. setTimeout
3. setInterval \
and more...

>Course api: <https://course-api.com/slides.html>

### Events Emitter

- on: Listens for an event
- emit: Emits an event
- We can add multiple listeners as we want
- We need to maintain the order.i.e. first on then emit

### Streams

- `createReadStream(path, options)` is use to get data in chunks
- `pipe()` is use to send data in chunks as response

### Servers

- `writeHead(status code(200),type)` is use to provide headers

### Express

- `get(routes)` = Use to create routes
- `all('*')` = Use to give output to all routes
- `res.status(code)` = Use to provide status code after response
- `app.use(function)` = Use to use middlewares

### Query params

- We must use return keyword after sending the response

### Middlewares

- Middlewares must be written after imports and before methods
- We can pass the second argument as a function in the method for express app which passes as a middleware
- Middleware function gets 3 parameters `req`, `res`, and `next`, if we don't call `next()` or don't send the response.i.e. `res.send()` then the window keeps reloading
- `app.use(basepath = optional, function)` is a middleware which is use to run a function in all the methods and basepath is use if we want to call the function in only those methods which are started with the given path
- To use multiple middlewares we use in array.i.e. `app.use([middleware1, middleware2,...)]`

## Course 3 (Udemy - Pro JavaScript Backend Development)

Learn backend development with javascript. Learn swagger, express, authentication, payment gateway, cloudinary and more

### Steps to make a cluster on Mongodb Atlas

1. Go to clusters section
2. Click on create cluster
3. Select provider and region
4. Click on create cluster
5. In cluster, click on connect
6. Provide username and password
7. Click on create user and then click on `choose a conncetion method`
8. Select `connect to your application` -> `drivers`, if you want to make it for your application
9. Now copy the `connection string` and replace `<password>` with your actual password of database
10. Click on `done` button

### Steps to connect Compass and Atlas

1. Go to Atlas and then in database section, connect with the desired cluster
2. Click on `compass`
3. Copy the `connection string`
4. Go to compass and paste the `connection string` in the URI
5. Change the `<password>` with your actual password and click on `connect`

### Middlewares

1. `app.use(express.json())` = It parses incoming JSON data from HTTP requests.
    >Code: [express.json](./mydocs/app.js)

2. `app.use(express.urlencoded({ extended:true }))` = If the form is passed in query then we need to encode the url which is done by this middleware. `{ extended:true }` is optional if we provide this then it'll work for the object having children and grandchildren objects in it, like,\
`{"name":{"first":"Anas","last":"Raza"}}`

3. `app.set("view engine", "ejs")` = This is use for rendering web pages. The term 'View engine' allow us to render web pages using template files and 'ejs' is the type of view engine.

>Code: [fileUpload, View engine and urlencoded](./ejsAndCloudinary/app.js)

### Swagger

- Swagger is use to write documentation for APIs
- Important [link](https://swagger.io/docs/specification/basic-structure/) to the documentation

#### Installation

- Run `npm install swagger-ui-express yaml`
- Import:

```javascript
const swaggerUi = require('swagger-ui-express');
const fs = require("fs");
const YAML = require('yaml');
```

- Make instance:

```javascript
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file);
```

- Use middleware:

```javascript
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

- Now create a file named `swagger.yaml` (that you passed in `fs.readFileSync`)

### Nodemon

Nodemon works on specific files like `.js`, `.jsx`, etc. but if we want to update the list of extensions, we first need to create a file named `nodemon.json` and then add `{ "ext": ".js, .json, .yaml, .jsx" }` in the file

>Demo: Click [here](/socialApp/nodemon.json) to go to the code

### Enum

We can pass enum values in 2 ways:

```yaml
1. enum:
 - enum1 
 - enum2 
 - enum3
 ... 
```

```yaml
2. enum: [enum1, enum2, enum3, ...]
```

>Demo: Click [here](/mydocs/swagger.yaml) to go to the documentation

### NPM Packages

#### express-fileupload

This package is use to send and get files(like images) in request and response. After passing this as a middleware, there is a field added to the request object, `req.files`.

- `file.mv(path, errorHandler)` = This method is use to move file to the desired path.
- `app.use(fileUpload())` = If file upload comes up, it adds file object in request object. Like, `req.file`. Sometimes it's called with a params, like\
`app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }))`:
  - `useTempFiles` is true if you want to store image in a temporary directory.
  - `tempFileDir` is the path to the temporary directory.
  We can make it default by passing nothing in the parameters. But the actual difference is that default uses memory instead of the disk space which will make the system, but it's quicker to access. In short, passing these parameters is generally suitable for larger applications.

>Code: [Here](./mydocs/app.js)

#### bcryptjs

This package is use for encryptions

- `bcryptjs.hash(value, n=10)` = This is method that encrypts the value. There is an algorithm that converts the value into encrypted form, where `n` is the number of turns that this algorithm should run. More the turns more complex encryption.
- `bcryptjs.compare(Entered password, password from database)` = This method compares the password against the password stored in the database.

>Code: [Here](./authSystem/app.js)

#### jsonwebtoken

This package is use for generating tokens. A token is an important and secret part of key to your data. It is secure. It contains values of your payload. It should be kept private as password.

- `jwt.sign(payload, secret_key, options)` = This function is use to generate a token. It takes 3 parameters:
  - payload: Object of your request body. It can contain 1 - all fields.
  - secret_key: A key which can be anything.
  - options: There're 2 options:
    - Token expires in
    - Algorithm process: Default is `HS256` which is highly safe and secure.
- `jwt.verify(token, secret_key)` = This method verifies the token if it's valid or not. The validation method returns a decode object that we stored the token in.

>Code: [Here](./authSystem/app.js)

### ORM vs ODM

`ORM (Object Relational Mapping)` is a method that links an application to a relational database (SQL), while `ODM (Object Document Mapper)` is used in non relational database (NoSQL). \
We use `Mongoose` for ODM

### Mongoose

- It allows to define pre and post hooks, enabling pre-defined logic to be executed.
- `Schema` can be considered as a table of SQL database
- `model` is a wrapper of the schema.
- `process.exit(0 / 1)`: This function accepts single parameter (0 or 1).
  - 0 means end the process without any kind of failure.
  - 1 means end the process with some failure.
- Sometimes database operations take time so making them asynchronous is a better approach.
- `select: boolean (default: true)`: Whenever you fetch a document from the database, the field with this key will not be included in the result if it is `false` unless you explicitly include it. You can fetch it as `Model.find({}).select('+field')`
- `Schema.pre('event',function(next){...})`: It runs before specific events. Events can be:
  - save: Runs before a document is saved.
  - validate: Runs before a document is validated.
  - remove: Runs before a document is removed.
  - find: Runs before a find query is executed.
  - update: Runs before an update query is executed.

### Token in postman

To send token in the headers of a postman, you need to follow these steps:

1. Go to `Headers` section
2. Enter `Authorization` as the key
3. Enter `Bearer token` as the value (without single or double quotes)

We can also send the token through Authorization section:

1. Go to `Authorization` section
2. Select `Bearer Token` as Auth Type
3. Pass the token in the `Token` field (without single or double quotes)

### View Engine / ejs

'View engine' allows us to render web pages using template files and 'ejs' is the type of view engine. For view engines, the structure is that we need to make a folder named `views` and inside that folder there are HTML files with `.ejs` extension that needed to be rendered. In the main file there's a need of middleware,\
`app.set("view engine", "ejs")`, where 'ejs' is the type of view engine

### Structure of a backend folder

#### configs

This folder contains the configuration of the server, like connecting to the database.

#### controllers

This folder contains the logic and functionality of all the models, pages and controllers.

#### middlewares

This folder contains the middlewares.

#### models

This folder contains the models of database, in which the models are defined.

#### routes

This folder contains the routes for all the controllers and models. It imports the controllers and put it in the specific route and export it to `app.js` or `index.js`.\
These routes works as a middleware in the main file, or we can say that we have to use these in `app.use('/api/v1', routeMethod)`

```javascript
const express = require('express')
const { a,b,c,... } = require('../controllers/home')

const router = express.Router()

router.route('/').get(a)
router.route('/b').get(b)
router.route('/c').get(c)
// More routes...

module.exports = router
```

#### utils

This folder contains any functions and logics that can be needed in controllers

### Cloudinary

You need `account name`, `api key`, and `api secret`. Then import cloudinary and then do this:

```javascript

```

It should be connected in the file that runs like `app.js` or `index.js`.

### Some extra points

- `multipart/form-data` = A data type for media files
- If import is not holded in a variable then it means to execute or run that module. i.e,

```javascript
const express = require('express'); // This line is holding a module in a variable
require('file').function(); // This line is running `function` from `file`
```

- `enctype="multipart/form-data"` = This is added in the (HTML / frontend) as an attribute of the  form for handling images and files.
- We can put the functionality in the promise to manage multiple asynchronous operations, associating handlers with success or failure. Like this [promise](./tShirtStore/middlewares/) and [inner features](./tShirtStore/controllers/home.js).\
We can also use the `trycatch` for that just as it is done in [authSystem](./authSystem/app.js)
