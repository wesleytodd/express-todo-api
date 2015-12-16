# A Todo API

This is an example api to be used when making example todo apps.  It can be used stand-alone or with an existing Express app.

## But WHYYYYYY??????

I often want to test out some ideas with a front-end that actually talks to a backend, or with some sort of backend api archetecture that needs a few routes.  I have used this for a few different things like this, so I figured I would clean it up and publish it for re-use.

## Usage

```
$ npm install -g express-todo-api
$ express-todo-api
```

```
$ npm install --save express-todo-api

// index.js
var app = require('express')();
app.use(require('express-todo-api'));
app.listen();
```

## Routes

Todos:

```
# Get a list of todos
GET /api/todos[?limit=<Number>&offset=<Number>&status=(active|complete|all)]

# Create a new todo
POST /api/todos

# Edit an existing todo
PATCH /api/todos/:id
PUT /api/todos/:id

# Change the status of a todo
PUT /api/todos/:id/:status

# Delete a todo
DELETE /api/todos/:id
```

**Users:** kindof started, so you can do assigning tasks to a user, but not actually done
