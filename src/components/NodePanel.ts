import {
  Event,
  ProviderResult,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";

export class DataProvider implements TreeDataProvider<DataItem> {
  onDidChangeTreeData?: Event<DataItem | null | undefined> | undefined;
  data: DataItem[];

  constructor(List: string[]) {
    this.data = List.map((v) => {
      return new DataItem(v);
    });
  }

  getTreeItem(element: DataItem): TreeItem | Thenable<TreeItem> {
    element.command = {
      command: "itemClick", //命令id
      title: "标题",
      arguments: [element.label], //命令接收的参数
    };
    return element;
  }

  getChildren(element?: DataItem | undefined): ProviderResult<DataItem[]> {
    if (element === undefined) {
      return this.data;
    }
    return element.children;
  }
  refresh() {}
}

class DataItem extends TreeItem {
  public children: DataItem[] | undefined;

  constructor(label: string, children?: DataItem[] | undefined) {
    super(
      label,
      children === undefined
        ? TreeItemCollapsibleState.None
        : TreeItemCollapsibleState.Collapsed
    );

    this.children = children;
  }
}
