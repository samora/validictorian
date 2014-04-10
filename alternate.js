/**
 * Module Dependencies
 */
var validator = require('validator');

module.exports = validictorian;


/**
 * Validate an object (eg. req body) based on rules.
 *
 * @param {object} body
 * @param {object} rules
 * @param {boolean} mapped optional mapped error output
 * @return {array/object/null}
 */
function validictorian(body, rules, mapped) {
  var errors = [];

  if (mapped) errors = {};

  // Process fields.
  Object.keys(rules).forEach(function (key){
    var field = body[key],
      fieldRules = rules[key];

    // Process field's rules.
    Object.keys(fieldRules).forEach(function (k){

      // Check if k is validator method
      var notValidator = (k.slice(0, 2) !== 'is'
        && k !== 'equals'
        && k !== 'contains'
        && k !== 'matches');

      if (notValidator) return;


      var args = fieldRules[k].args || [],
        msg = fieldRules[k].msg,
        method = validator[k],
        bool;

      args.unshift(field);

      bool = method.apply(method, args);

      if (bool) return;

      if (mapped)
        errors[key] = msg;
      else
        errors.push(msg);

    });
  });

  // Return null if no errors.
  if ((mapped && Object.keys(errors).length === 0) || (!mapped && errors.length === 0))
    return null;

  return errors;
}