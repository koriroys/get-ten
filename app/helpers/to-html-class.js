import Ember from 'ember';
const { isEqual } = Ember;

export function toHtmlClass(params, { value }) {
  let output;
  if ( isEqual(value, 1) ) {
    output = "one";
  } else if ( isEqual(value, 2) ) {
    output = "two";
  } else if ( isEqual(value, 3) ) {
    output = "three";
  }
  return output;
}

export default Ember.Helper.helper(toHtmlClass);
