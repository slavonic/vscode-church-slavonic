const cuMarkdown = require('markdown-it-church-slavonic');
const vscode = require('vscode');
var markdownit = require('markdown-it');

require('supports-color');

const fs = require("fs");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    let disposable = vscode.commands.registerCommand('csl.generateXml', function () {  
        let currentFile =  vscode.window.activeTextEditor.document.uri.fsPath;
        var xmlRendrer = markdownit().use(cuMarkdown, { renderer: 'xml' });
        fs.readFile(currentFile, 'utf8', function(err, data) {
            if (err) throw err;
            let xml = xmlRendrer.render(data);
            let newFileName = currentFile.substr(0, currentFile.lastIndexOf('.')) + '.xml';
            fs.writeFile(newFileName, xml, err => {
                if (err) {
                    return vscode.window.showErrorMessage(
                      "Failed to create boilerplate file!"
                    );
                } else {
                    vscode.window.showInformationMessage('File sucessfully created');
                    vscode.workspace.openTextDocument(newFileName).then(doc => {
                        vscode.window.showTextDocument(doc);
                     });
                }
            });

          });
    });

    context.subscriptions.push(disposable);

    return {
        extendMarkdownIt(md) {
            return md.use(cuMarkdown);
        }
    }
}

exports.activate = activate;
exports.deactivate = function deactivate() {};
