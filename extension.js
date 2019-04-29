const cuMarkdown = require('markdown-it-church-slavonic');
const { renderXML, renderLaTeX } = cuMarkdown;
const { window, Uri, workspace, WorkspaceEdit, Position, commands } = require('vscode');

let markdownEngine;  // will be set when Markdown plugin activates

const churchSlavonicGenerate = (render, language) => () => {
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

    workspace.openTextDocument({language}).then(document => {
        const edit = new WorkspaceEdit();
        edit.insert(document.uri, new Position(0, 0), outputText);
        return workspace.applyEdit(edit).then(success => {
            if (success) {
                window.showTextDocument(document);
            } else {
                window.showErrorMessage('Error applying edit (unexpected)');
            }
        });
    }).catch(error => {
        window.showErrorMessage('Error: ' + error);
    });
};

exports.activate = (context) => {

    context.subscriptions.push(commands.registerCommand(
        'church-slavonic-generate-xml', churchSlavonicGenerate(renderXML, 'xml')));

    context.subscriptions.push(commands.registerCommand(
        'church-slavonic-generate-latex', churchSlavonicGenerate(renderLaTeX, 'tex')));

    return {
        extendMarkdownIt(md) {
            markdownEngine = md.use(cuMarkdown);
            return markdownEngine;
        }
    };
};

exports.deactivate = () => {};
