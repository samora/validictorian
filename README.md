# validictorian

Node validations without ties to any framework. Based on [validator](https://github.com/chriso/validator.js).

## Inspiration & Purpose

[validator](https://github.com/chriso/validator.js) is a great validation tool, 
but when building apps with frameworks such as [koa](http://koajs.com/) or [express](expressjs.com)
you usually want something that abstracts away some of those details.

[express-validator](https://github.com/ctavan/express-validator) satisfies this need when using express.
What about other frameworks? This is the dilemma I came across when I decided to start using koa.

Validictorian solves this issue, by simply abstracting away enough of the validation logic yet making it
simple enough to handle validations using any framework.

## Usage

```
npm install validictorian
```

Just pass in the object to be validated (eg. request body) and validation rules. 

__NOTE__: Fields in object to be validated cannot be nested.

Returns `null` if no errors, else returns an array of error messages. You can also pass in
`true` as third parameter to output mapped error messages.

Example using [Express](expressjs.com), assuming `express.bodyParser()` middleware is already setup:
```javascript
var validate = require('validictorian');

app.post('/users', function (req, res){

  var rules = {
    name: {
      isLength: {
        args: [1],
        msg: 'Name is required.'
      }
    },

    email: {
      isLength: {
        args: [1],
        msg: 'Email is required.'
      },
      isEmail: {
        msg: 'Email must be valid'
      }
    }
  };

  var errors = validate(req.body, rules);

  if (errors)
    return res.json({
      status: 'fail'
      data: errors
      }); // TIP: You can use 'jsender' module.

  // ...
  // Save req.body to database
});
```

Example using [koa](koajs.com), assuming `koa-router` middleware is already setup:
```javascript
var validate = require('validictorian'),
  parse = require('co-body');

app.post('/users', function *(){
  var body = yield parse(this);

  var rules = {
    name: {
      isLength: {
        args: [1],
        msg: 'Name is required.'
      }
    },

    email: {
      isLength: {
        args: [1],
        msg: 'Email is required.'
      },
      isEmail: {
        msg: 'Email must be valid'
      }
    }
  };

  var errors = validate(body, rules);

  if (errors)
    return this.body= {
      status: 'fail',
      data: errors
    }; // TIP: You can use 'koa-jsend' module.

  // ...
  // Save req.body to database
});
```

Can be used similarly in other frameworks.

## API

### validate(body, rules, mapped)

`body` and `rules` are the only required arguments.

#### `body`

An object containing the fields to be validated as `key, value` pairs.

Example:
```javascript
var body = {
  name: 'Samora Dake',
  email: 'samora@example.com',
  phone: '',
  gender: 'M',
  age: '27'
};
```

#### `rules`

An object stating the rules used to validate `body`. Takes the following format:

```
{
  <field>: {
    <validator>: {
      args: <Optional array of arguments to validator method>,
      msg: <Required message in case validation fails>
    }
  }
}
```

Where `<field>` is the field in  `body` and `<validator>` is the validator method.
All validators in [validator](https://github.com/chriso/validator.js#validators) can be used.

Example:
```javascript
var rules = {
  name: {
    isLength: {
      args: [1],
      msg: 'Name is required.'
    }
  },

  email: {
    isEmail: {
      msg: 'Email must be valid.'
    }
  },

  gender: {
    isLength: {
      args: [1, 1],
      msg: 'Gender must be 1 character long.'
    },

    isIn: {
      args: [['M', 'F']]
      msg: 'Gender must be M or F.'
    }
  },

  age: {
    isLength: {
      args: [1],
      msg: 'Age is required.'
    },

    isInt: {
      msg: 'Age must be number.'
    }
  }
}
```


## Tests

```
npm install -g mocha
```

Then
```
npm test
```

## License

MIT