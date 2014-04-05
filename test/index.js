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
      msg: 'Name is required.'
    }
  },

  email: {
    isEmail: {
      msg: 'Email must be valid.'
    }
  },

  sex: {
    isLength: {
      args: ['1', '1'],
      msg: 'Sex must be 1 char long.'
    }
  }
};

describe('validictorian', function() {
  it('should validate mapped errors', function (){
    var results = validate(body, rules, true);

    results.name.should.be.equal(rules.name.isLength.msg);
    results.email.should.be.equal(rules.email.isEmail.msg);
    results.sex.should.be.equal(rules.sex.isLength.msg);
  });

  it.skip('should validate unmapped errors', function (){
    var results = validate(body, rules);

    results.length.should.be.equal(3);
    results.indexOf('Name is required.').should.not.be.equal(-1);
    results.indexOf('Email must be valid.').should.not.be.equal(-1);
    results.indexOf('Sex must be 1 char long.').should.not.be.equal(-1);
  });
});