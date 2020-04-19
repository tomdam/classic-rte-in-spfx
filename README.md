## classic-rte-in-spfx

This is the DEMO spfx webpart that shows usage of the classic Rich Text Editor on modern SharePoint pages.
Detailed description can be found in this blog post: http://damjan.blogspot.com/2020/04/sharepoint-online-use-classic-rich-text.html

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
