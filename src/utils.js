var jsdom = require("jsdom");
var path = require("path");
var hljs = require('highlight.js');
var fs = require('fs');
var sass = require('sass');

function fixHtmlRefs(html, pageDir, _pageDir) {
	var dom = new jsdom.JSDOM(html);
	var links = dom.window.document.querySelectorAll("[href]");
	var imageSrcs = dom.window.document.querySelectorAll("[src]");

	function changeTagName(el, tag) {
		const newElement = dom.window.document.createElement(tag);

		for (const { name, value } of el.attributes) {
			newElement.setAttribute(name, value);
		}

		while (el.firstChild) {
			newElement.appendChild(el.firstChild);
		}

		el.parentNode.replaceChild(newElement, el);

		return newElement;
	}

	for(const link of links) {
		link.href = link.href.replace(/\.md$/, ".html").replace("./" + pageDir, "./");
		if(link.href.startsWith("/")) {
			link.href = path.normalize("/" + pageDir + link.href.substring(1));
		}
		if(link.href.startsWith("root/")) {
			link.href = path.normalize("/" + _pageDir + link.href.substring(5));
		}
	}

	for(const image of imageSrcs) {
		image.src = image.src.replace(/\.md$/, ".html").replace("./" + pageDir, "./");
		if(image.src.startsWith("/")) {
			image.src = path.normalize("/" + _pageDir + image.src.substring(1));
		}
		if(image.src.startsWith("root/")) {
			image.src = path.normalize("/" + _pageDir + image.src.substring(5));
		}
	}

	var codeblocks = dom.window.document.querySelectorAll('pre code[class^="language-"]');
	for(const codeblock of codeblocks) {
		codeblock.innerHTML = hljs.highlight(codeblock.textContent, {language: codeblock.className.split("-")[1]}).value;
		codeblock.parentElement.classList.add("hljs");
	}

	// select all non hljs codeblocks
	var inlineCodeblocks = dom.window.document.querySelectorAll('code:not([class^="language-"])');
	for(const codeblock of inlineCodeblocks) {
		if(codeblock.classList.contains("no-inline")) {
			codeblock.classList.remove("no-inline");
			continue;
		}
		codeblock.classList.add("inline-code");
	}

	var inlineCodeblocks = dom.window.document.querySelectorAll('pre code:not([class^="language-"])');
	for(const codeblock of inlineCodeblocks) {
		if(codeblock.parentElement.classList.contains("no-inline")) {
			codeblock.parentElement.classList.remove("no-inline");
			continue;
		}
		codeblock.parentElement.classList.add("inline-code");
	}

	var inlineSyntaxBlocks = dom.window.document.querySelectorAll('syntax');
	for(let codeblock of inlineSyntaxBlocks) {
		codeblock = changeTagName(codeblock, "code");
		codeblock.classList.add("inline-syntax", "inline-code");

		var format = codeblock.getAttribute("lang");
		codeblock.removeAttribute("lang");

		console.log(codeblock.textContent);
		if(format != null)
			codeblock.innerHTML = hljs.highlight(codeblock.textContent, {language: format}).value;
	}

	return dom
}

function copyDir(src, dest) {
	// Check if the source exists
	if (!fs.existsSync(src)) {
		console.error(`Source directory ${src} does not exist`);
		return;
	}

	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	const items = fs.readdirSync(src);

	for (let item of items) {
		const srcPath = path.join(src, item);
		const destPath = path.join(dest, item);

		const stats = fs.statSync(srcPath);
		if (stats.isDirectory()) {
			copyDir(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

function compileSass(file, dest) {
	var result = sass.compileString(fs.readFileSync(file, 'utf8'));
	fs.writeFileSync(dest, result.css);
}

module.exports = {
	fixHtmlRefs: fixHtmlRefs,
	copyDir: copyDir,
	compileSass: compileSass,
}