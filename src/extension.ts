// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { DataProvider } from "./components/NodePanel";
import nodeNvmWindows from "./hooks/node-nvm-windows";
import { HandleWebView } from "./html/handle-html";
import { HTML1 } from "./html/htmlString";
// 导入 WebView.ts 下的 createWebView 方法

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// 插件被激活时执行的操作
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "nvm-vscode" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // 注册命令 命令配置 需要在 package 中配置 contributes.commands 对应的命令
  let helloWorld = vscode.commands.registerCommand(
    "nvm-vscode.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from nvm-vscode!");
    }
  );
  context.subscriptions.push(helloWorld);

  // 页面创建与展示
  let nvmPage = vscode.commands.registerCommand(
    "nvm-vscode.taoists-page",
    () => {
      // 获取当前活动的文本编辑器
      const activeTextEditor = vscode.window.activeTextEditor;
      if (activeTextEditor) {
        // 获取当前文件的行数
        const lineCount = activeTextEditor.document.lineCount;
        // 显示行数信息
        vscode.window.showInformationMessage(`当前文件共有 ${lineCount} 行`);
      } else {
        // 没有活动的文本编辑器时显示提示信息
        //  vscode.window.showInformationMessage("请打开一个文件");
        creactPage(context);
      }
    }
  );
  context.subscriptions.push(nvmPage);

  // node version list
  creactPanel(context);
  //------------------------------------------------
  // 自定义节点 操作面板
  vscode.window;
  vscode.commands;

  const todolistWebview = new HandleWebView(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      HandleWebView.viewId,
      todolistWebview
    )
  );

  context.storageUri;
}

export function creactPage(context: vscode.ExtensionContext) {
  // 创建一个 Webview
  const panel = vscode.window.createWebviewPanel(
    "taoists",
    "taoists web",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );
  panel.webview.html = HTML1;
}

export function creactPanel(context: vscode.ExtensionContext) {
  let List = nodeNvmWindows("list");
  vscode.window.registerTreeDataProvider("nodeList", new DataProvider(List));
  context.subscriptions.push(
    vscode.commands.registerCommand("itemClick", (label) => {
      vscode.window.showInformationMessage(label);
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
