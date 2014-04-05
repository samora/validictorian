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

  Object.keys(rules).forEach(function (key){
    var field = body[key],
      fieldRules = rules[key];

    Object.keys(fieldRules).forEach(function (k){
      var args = fieldRules[k].args || [],
        message = fieldRules[k].message,
        method = validator[k],
        bool;

      args.unshift(field);

      bool = method.apply(method, args);

      if (bool) return;

      if (mapped)
        errors[key] = message;
      else
        errors.push(message);

    });
  });

  if ((mapped && Object.keys(errors).length === 0) || (!mapped && errors.length === 0))
    return null;


  return errors;
}