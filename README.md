# React / JSX HTML Comments
Enable HTML comments (e.g. conditional IE comments) in React components and JSX using a Web Component.

This repository is intended to share a solution to include native HTML comments in React components and JSX. It uses a Web Component (custom HTML element) to transform the contents of the tag to a native HTML comment.

The solution depends on [document.registerElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement) that requires a Polyfill for most browsers, e.g. [WebReflection/document-register-element](https://github.com/WebReflection/document-register-element).

Include the following javascript in your application.

```javascript
/**
 * Create <react-comment> Web Component
 *
 * @usage
 *  <react-comment>Comment-text, e.g. [if lte IE 9]><script ... /><![endif]</react-comment>
 
 * @result
 *  <!--Comment-text, e.g. [if lte IE 9]><script ... /><![endif]-->
 */
var proto = Object.create(HTMLElement.prototype, {
name: {
    get: function() { return 'React Comment'; }
},
createdCallback: { value: function() {

    /**
     * Firefox fix, is="null" prevents attachedCallback
     * @link https://github.com/WebReflection/document-register-element/issues/22
     */
    this.is = '';
    this.removeAttribute('is');
}},
attachedCallback: { value: function() {
    this.outerHTML = '<!--' + this.textContent + '-->';
}}
});
document.registerElement('react-comment', { prototype: proto });
```
