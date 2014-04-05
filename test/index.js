// Dependencies
var validate = require('..');

var body = {
  name: '',
  email: 'user.example.com',
  sex: 'Male'
};

var rules = {
  name: {
    isLength: {
      args: ['1'],
      message: 'Name is required.'
    }
  },

  email: {
    isEmail: {
      message: 'Email must be valid.'
    }
  },

  sex: {
    isLength: {
      args: ['1', '1'],
      message: 'Sex must be 1 char long.'
    }
  }
};

describe('validictorian', function() {
  it('should validate mapped errors', function (){
    var results = validate(body, rules, true);

    results.name.should.be.equal(rules.name.isLength.message);
    results.email.should.be.equal(rules.email.isEmail.message);
    results.sex.should.be.equal(rules.sex.isLength.message);
  });

  it.skip('should validate unmapped errors', function (){
    var results = validate(body, rules);

    results.length.should.be.equal(3);
    results.indexOf('Name is required.').should.not.be.equal(-1);
    results.indexOf('Email must be valid.').should.not.be.equal(-1);
    results.indexOf('Sex must be 1 char long.').should.not.be.equal(-1);
  });
});