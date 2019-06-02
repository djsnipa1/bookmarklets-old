/**
 * "View current Page Source" uses Prism by Lea Verou (lea.verou.me)
 * This code released under MIT license: opensource.org/licenses/mit
 * @author Antonio Bueno atnbueno.com/shortcuts/
 *
 * WARNING: This script injects CSS & JavaScript from cdn.jsdelivr.net
 * Some websites may block this via their CSP
 * Alternatively, both the CSS and the JavaScript can be inlined in
 * this code, at the cost of making it unreadable
 */

if (document.doctype) { // = only webpages have one
  // Get current page source
  var source = new XMLSerializer().serializeToString(document);
  // Sets HTML5 doctype
  var doctype = document.implementation.createDocumentType("html", "", "");
  document.doctype.parentNode.replaceChild(doctype, document.doctype);
  // Empties <head> and injects Prism's CSS (read warning above)
  var head = document.querySelector("head");
  head.innerHTML = '<link href="https://cdn.jsdelivr.net/npm/prism-themes/themes/prism-atom-dark.min.css" rel="stylesheet" /><style>pre,code{white-space:pre-wrap !important;word-wrap:break-word !important;font-family:"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace !important;}</style>';
  // Empties <body> and prepares HTML for applying Prism
  var body = document.querySelector("body");
  body.innerHTML = '<pre class="language-html"><code>' + source.replace(/</g, "&lt;") + "</code></pre>";
  // Injects Prism's JavaScript (read warning above)
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/prismjs";
  body.append(script);
} else {
  alert("Sorry, no <body> here 😁"); // I couldn't resist 😝
}

// Goes back to the Shortcuts app with the current page source
completion(source);