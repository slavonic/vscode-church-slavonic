const cuMarkdown = require('markdown-it-church-slavonic');
const { renderXML, renderLaTeX } = cuMarkdown;
const { window, Uri, workspace, WorkspaceEdit, Position, commands } = require('vscode');

let markdownEngine;  // will be set when Markdown plugin activates

const churchSlavonicGenerate = (render, suffix) => () => {
    if (window.activeTextEditor === undefined) {
        return window.showErrorMessage('Please open a Markdown document first');
    }

    if (window.activeTextEditor.document.languageId !== 'markdown') {
        return window.showErrorMessage(
            'This command requires current document to be "markdown", got ' +
            window.activeTextEditor.document.languageId
        );
    }

    if (markdownEngine === undefined) {
        return window.showErrorMessage(
            'Internal error - failed to initialize Markdown extension');
    }

    const inputText = window.activeTextEditor.document.getText();
    const outputText = render(markdownEngine, inputText);

    const currentFile = window.activeTextEditor.document.uri.fsPath;
    const newFileName = currentFile.substr(0, currentFile.lastIndexOf('.')) + suffix;
    const newFile = Uri.parse('untitled:' + newFileName);

    workspace.openTextDocument(newFile).then(document => {
        const edit = new WorkspaceEdit();
        edit.insert(newFile, new Position(0, 0), outputText);
        return workspace.applyEdit(edit).then(success => {
            if (success) {
                window.showTextDocument(document);
            } else {
                window.showInformationMessage('Error');
            }
        });
    });
};

exports.activate = (context) => {

    context.subscriptions.push(commands.registerCommand(
        'church-slavonic-generate-xml', churchSlavonicGenerate(renderXML, '.xml')));

    context.subscriptions.push(commands.registerCommand(
        'church-slavonic-generate-latex', churchSlavonicGenerate(renderLaTeX, '.tex')));

    return {
        extendMarkdownIt(md) {
            markdownEngine = md.use(cuMarkdown);
            return markdownEngine;
        }
    };
};

exports.deactivate = () => {};
