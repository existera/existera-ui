import type { ExTreeViewItemData } from "@/lib/components/TreeView/props/ExTreeViewItemProps";
import ExTreeView from "@/lib/components/TreeView/ExTreeView";
import ExTreeViewItem from "@/lib/components/TreeView/ExTreeViewItem";
import PageContent from "@/shared/documentation/PageContent";

export default function TreeViewPage() {
  const onClick = (item: ExTreeViewItemData) => console.log("Click:", item);
  const onEdit = (item: ExTreeViewItemData) => console.log("Edit:", item);
  const onMove = (item: ExTreeViewItemData) => console.log("Move:", item);
  const onDelete = (item: ExTreeViewItemData) => console.log("Delete:", item);

  return (
    <PageContent section={[]}>
      <section className="mx-auto w-full min-w-0 max-w-lg space-y-4 p-6 text-foreground">
        <h1 id="tree-view-heading" className="text-2xl font-semibold">
          Tree View
        </h1>
        <ExTreeView size="md" aria-labelledby="tree-view-heading">
          <ExTreeViewItem
            id="documents"
            name="Documents"
            icon="folder"
            total={2}
            onClick={onClick}
            onEdit={onEdit}
            onMove={onMove}
            onDelete={onDelete}>
            <ExTreeViewItem
              id="readme"
              name="README.md"
              icon="file-text"
              onClick={onClick}
              onEdit={onEdit}
              onMove={onMove}
              onDelete={onDelete}
            />
            <ExTreeViewItem
              id="components"
              name="Components"
              icon="folder"
              total={1}
              onClick={onClick}
              onEdit={onEdit}
              onMove={onMove}
              onDelete={onDelete}>
              <ExTreeViewItem
                id="tree-view"
                name="ExTreeView.tsx"
                icon="file-code"
                onClick={onClick}
                onEdit={onEdit}
                onMove={onMove}
                onDelete={onDelete}
              />
            </ExTreeViewItem>
          </ExTreeViewItem>
          <ExTreeViewItem
            id="notes"
            name="Notes.txt"
            icon="file-text"
            onClick={onClick}
            onEdit={onEdit}
            onMove={onMove}
            onDelete={onDelete}
          />
        </ExTreeView>
      </section>
    </PageContent>
  );
}
