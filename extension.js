const cuMarkdown = require('markdown-it-church-slavonic');

exports.activate = function activate() {
    return {
        extendMarkdownIt(md) {
            return md.use(cuMarkdown);
        }
    }
}

exports.deactivate = function deactivate() {};
