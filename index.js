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
 function validictorian (body, rules, mapped) {
  var errors = [];

  if (mapped) errors = {};

  var fields = Object.keys(rules);

  // Loop through rules' fields.
  for (var i = 0; i < fields.length; i++){
    var field = fields[i],
      fieldRules = rules[field],
      methods = Object.keys(fieldRules);

    // Ensure field is in body.
    if (Object.keys(body).indexOf(field) === -1) continue;

    // Loop through field's rules;
    for (var j = 0; j < methods.length; j++){
      var method = methods[j];

      // Ensure is validator method.
      var notValidator = (method.slice(0, 2) !== 'is'
        && method !== 'equals'
        && method !== 'contains'
        && method !== 'matches');

      if (notValidator) continue;

      var args = fieldRules[method].args || [],
        msg = fieldRules[method].msg;

      args.unshift(body[field]);

      // Apply validator method.
      var valid = validator[method].apply(validator[method], args);

      if (valid) continue;

      if (mapped)
        errors[field] = msg;
      else
        errors.push(msg);
    }
  }

  // Return null if no errors.
  if ((mapped && Object.keys(errors).length === 0) 
    || (!mapped && errors.length === 0))
    return null;

  return errors;
 }