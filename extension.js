// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

const BunScriptsTreeDataProvider = require('./bunScriptsTreeDataProvider');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const bunScriptsTreeDataProvider = new BunScriptsTreeDataProvider();

	vscode.window.registerTreeDataProvider('bunScripts', bunScriptsTreeDataProvider);

	//runBunScript command
	const runBunScript = vscode.commands.registerCommand('extension.runBunScript', (script) => {
		vscode.window.showInformationMessage(`Running Bun Script: ${script}`);
		// Read the ASCII art from bun.txt file
		
		// Create and show the terminal
		const terminal = vscode.window.createTerminal();
		terminal.show();

		// Run the script
		terminal.sendText(`bun run ${script}`);
	});

}

module.exports = {
	activate
};
