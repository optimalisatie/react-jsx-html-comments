/**
 * <react-comment> Web Component
 *
 * Enable regular HTML and conditional IE comments in React.js.
 *
 * @usage
 *  <react-comment>Comment-text, e.g. [if lte IE 9]><script ... /><![endif]</react-comment>

 * @result
 *  <!--Comment-text, e.g. [if lte IE 9]><script ... /><![endif]-->
 */
var proto = Object.create(HTMLElement.prototype, {
 name: { get: function() { return 'React HTML Comment'; } },
 createdCallback: { value: function() {

  /**
   * Firefox fix, is="null" prevents attachedCallback
   * @link https://github.com/WebReflection/document-register-element/issues/22
   */
  this.is = '';
  this.removeAttribute('is');
 } },
 attachedCallback: { value: function() {
  this.outerHTML = '<!--' + this.textContent + '-->';
 } }
});
document.registerElement('react-comment', { prototype: proto });
