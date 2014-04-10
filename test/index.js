// Dependencies
var validate = require('..');

var body = {
  name: '',
  username: 'Very invalid',
  email: 'user.example.com',
  sex: 'Male'
};

var rules = {
  name: {
    isLength: {
      args: [1],
      msg: 'Name is required.'
    }
  },

  username: {
    matches: {
      args: [/^[a-z0-9-_]+$/],
      msg: 'Username can only contain a-z (lowercase alphabets), 0-9 (digits), _ (underscores) and - (hyphens).'
    }
  },

  email: {
    isEmail: {
      msg: 'Email must be valid.'
    }
  },

  sex: {
    isLength: {
      args: [1, 1],
      msg: 'Sex must be 1 char long.'
    }
  }
};

describe('validictorian', function() {
  it.only('should validate mapped errors', function (){

    var results = validate(body, rules, true);

    results.name.should.be.equal(rules.name.isLength.msg);
    results.username.should.be.equal(rules.username.matches.msg);
    results.email.should.be.equal(rules.email.isEmail.msg);
    results.sex.should.be.equal(rules.sex.isLength.msg);
  });

  it('should validate unmapped errors', function (){

    var results = validate(body, rules);

    results.length.should.be.equal(4);
    results.indexOf(rules.name.isLength.msg).should.not.be.equal(-1);
    results.indexOf(rules.username.matches.msg).should.not.be.equal(-1);
    results.indexOf(rules.email.isEmail.msg).should.not.be.equal(-1);
    results.indexOf(rules.sex.isLength.msg).should.not.be.equal(-1);
  });
});