# React / JSX HTML Comments
Enable HTML comments (e.g. conditional IE comments) in React components and JSX using a [Web Component](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

This repository is intended to share a solution to include native HTML comments in React components and JSX. It uses a Web Component (custom HTML element) to transform text to a native HTML comment.

The solution depends on [document.registerElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement) that requires a polyfill for most browsers, e.g. [WebReflection/document-register-element](https://github.com/WebReflection/document-register-element).

You can read more about Web Components at [www.webcomponents.org](http://webcomponents.org/) and [facebook.github.io/react/docs/webcomponents.html](https://facebook.github.io/react/docs/webcomponents.html).

Include the following javascript in your application to enable the `<react-comment>` Web Component. You can rename the component for easy usage, e.g. `<c>`.

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
```

To include a comment in your JSX or React component, simply include the `<react-comment>` tag with the comment-text as content.
### JSX
```jsx
<footer>Copyright {year}, Website.com</footer>
<react-comment>Page loaded in {loadtime} seconds</react-comment>
```

### React component / element
```javascript
var MyComponent = React.createClass({
 render: function() {
  return React.createElement('react-comment',{},'This is sample comment text.');
 }
});
```
