const vscode = require('vscode');



class BunScriptTreeItem extends vscode.TreeItem {
    constructor(
        label,
        collapsibleState,
        script
    ) {
        super(label, collapsibleState);
        this.tooltip = `bun run ${script}`;
        this.description = this.version;
    }
}




class BunScriptsTreeDataProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        // Implement logic to return the items you want to display in your custom tab.
        // This could be your BunScripts or related files.
        // Return an array of vscode.TreeItem objects.
        // Example:

        //get package.json from project root
        const packageJson = require(vscode.workspace.rootPath + '/package.json');
        //get scripts from package.json
        const scripts = packageJson.scripts;

        //create an array of TreeItem objects
        const bunScriptsItems = [];

        //loop through scripts and create a TreeItem for each
        for (const script in scripts) {
            if (scripts.hasOwnProperty(script)) {
                let bunScript = scripts[script];
                const bunScriptItem = new BunScriptTreeItem(script, vscode.TreeItemCollapsibleState.None, bunScript);
                //highlight the script text in the label

                //give each TreeItem a a play icon on the right
                bunScriptItem.command = {
                    command: 'extension.runBunScript',
                    title: 'Run Bun Script',
                    tooltip: 'Run Bun Script',
                    arguments: [script]
                };
                // Set the icon path to a play icon

                bunScriptItem.iconPath = {
                    light: vscode.Uri.file(__dirname + '/bun.svg'),
                    dark: vscode.Uri.file(__dirname + '/bun.svg')
                };

                bunScriptsItems.push(bunScriptItem);
            }
        }

        return bunScriptsItems;
    }
}

module.exports = BunScriptsTreeDataProvider;
