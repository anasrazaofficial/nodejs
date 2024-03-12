# nodejs
This repository is for the learning purpose of JavaScript Backend

## Installation for express
`npm i express@[version]`

## Notes
- Slug is a parameter in url, for eg: `https:localhost:3000/abc`. Here `abc` is the slug
- `req.params` gets the slugs in url
- `req.query` gets the query of url, for `https:localhost:3000/abc?id=24141&mode=dark&region=pk`.  Here `id=24141&mode=dark&region=pk` is query
- To provide static files we create a folder and then put those files in that folder that we want to share and then the user can access using params. For example: The file name is `dummy.txt` then the user has to enter `https:localhost:3000/dummy.txt`
- To show files we can use `res.sendFile` function. In that we have to pass the link to that file and second parameter will be `{ root: __dirname }`, this tells that the file is in current directory (relative path).

### Middleware
Middleware works between request and response.
- If we don't run the next method then the next part of code will not be executed