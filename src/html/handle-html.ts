import * as vscode from "vscode";
import { WebviewView, WebviewViewProvider } from "vscode";

export class HandleWebView implements WebviewViewProvider {
  public static viewId: string = "handle-view";

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: WebviewView): void | Thenable<void> {
    webviewView.webview.options = {
      enableScripts: true,
    };

    const cssUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "assets",
        "source",
        "index.css"
      )
    );
    const scriptUri = webviewView.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "assets",
        "source",
        "index.js"
      )
    );
    console.log("scriptUri", scriptUri);
    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.type) {
        case "finishMessage":
          this.finishMessage();
          break;
        case "openTaoistsPage":
          vscode.commands.executeCommand("nvm-vscode.taoists-page");
          break;
        default:
          break;
      }
    });

    webviewView.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>todolist</title>
        <link href="${cssUri}" rel="stylesheet"/>
      </head>
      <body>
        <div>
        <div id="taoists">taoists-cli</div>
        <div id="node">node</div>
          <ul id="list">

          </ul>
          <div >
            <input id="input" placeholder="请输入"/>
            <button id="add">添加</button>
          </div>
        </div>
        <script src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }

  finishMessage() {
    vscode.window.showInformationMessage("继续加油");
  }
}
