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