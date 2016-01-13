# A Todo API

This is an example api to be used when making example todo apps.  It can be used stand-alone or with an existing Express app.

## But WHYYYYYY??????

I often want to test out some ideas with a front-end that actually talks to a backend, or with some sort of backend api archetecture that needs a few routes.  I have used this for a few different things like this, so I figured I would clean it up and publish it for re-use.

## Installation

```
$ npm install -g express-todo-api
```

## CLI Usage

```
$ express-todo-api --help

  Usage: express-todo-api [options]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -p, --port [port]   The server port
    -P --prefix [path]  The api route prefix
```

## API Usage

```javascript
var app = require('express')();
app.use(require('express-todo-api')());
app.listen(4000);
```

## Routes

Todos:

```
# Get a list of todos
GET /api/todos[?limit=<Number>&offset=<Number>&status=<String (active|complete|all)>&query=<String (text)&assignedTo=<String (user.id)>>]

# Create a new todo
POST /api/todos

# Edit an existing todo
PATCH /api/todos/:id
PUT /api/todos/:id

# Change the status of a todo
PUT /api/todos/:id/status/:status

# Change the assigned user of a todo
PUT /api/todos/:id/assign/:userId

# Delete a todo
DELETE /api/todos/:id
```

Users:

```
# Get a list of users
GET /api/users[?limit=<Number>&offset=<Number>&query=<String (username)>]

# Create a new user
POST /api/users

# Delete a user
DELETE /api/users/:id
```
