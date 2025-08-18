import { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { TreeContext } from '../Tree.contexts';
import { LayerContext } from './TreeItem.contexts';
import { TreeItemIdType } from './TreeItem.types';

export const useTreeItem = ({ itemId }: { itemId: TreeItemIdType }) => {
  const value = useContext(TreeContext);
  if (value === null) throw Error('TreeContext value is null');
  const { selectedItemsValue, expandedItemsValue, ...rest } = value;
  return {
    isSelected: selectedItemsValue.includes(itemId),
    isExpanded: expandedItemsValue.includes(itemId),
    selectedItemsValue,
    ...rest
  };
};

export const useLayer = () => {
  const value = useContext(LayerContext);
  return value;
};

export const useFocus = ({
  treeItemElRef,
  isExpanded,
  children
}: {
  treeItemElRef: React.RefObject<HTMLElement>;
  isExpanded: boolean;
  children?: React.ReactNode;
}) => {
  const [isFirstTreeItem, setIsFirstTreeItem] = useState<boolean>(false);

  const getFirstDescendantTreeItem = (
    element: HTMLElement
  ): HTMLElement | null => {
    return element.querySelector<HTMLElement>('.JinniSubTree .JinniTreeItem');
  };

  const getLastDescendantTreeItem = (element: HTMLElement): HTMLElement => {
    const subTree = element.querySelector<HTMLElement>(
      ':scope > .JinniSubTree.isExpanded'
    );
    if (subTree) {
      const children = subTree.querySelectorAll<HTMLElement>(
        ':scope > .JinniTreeItem'
      );
      if (children.length > 0) {
        const lastChild = children[children.length - 1];
        return getLastDescendantTreeItem(lastChild);
      }
    }
    return element;
  };

  const getNextTreeItemSibling = (element: HTMLElement): HTMLElement | null => {
    let currentEl: HTMLElement = element;
    let nextTreeItemSibling: HTMLElement | null = null;
    while (!nextTreeItemSibling) {
      const nextSibling = currentEl.nextElementSibling as HTMLElement | null;
      if (!nextSibling) break;
      if (nextSibling.classList.contains('JinniTreeItem')) {
        nextTreeItemSibling = nextSibling;
        break;
      }
      currentEl = nextSibling;
    }
    return nextTreeItemSibling;
  };

  const getPrevTreeItemSibling = (element: HTMLElement): HTMLElement | null => {
    let currentEl: HTMLElement = element;
    let prevTreeItemSibling: HTMLElement | null = null;
    while (!prevTreeItemSibling) {
      const prevSibling =
        currentEl.previousElementSibling as HTMLElement | null;
      if (!prevSibling) break;
      if (prevSibling.classList.contains('JinniTreeItem')) {
        prevTreeItemSibling = prevSibling;
        break;
      }
      currentEl = prevSibling;
    }
    return prevTreeItemSibling;
  };

  const getParentTreeItem = (element: HTMLElement): HTMLElement | null => {
    return (
      element.parentElement?.closest<HTMLElement>('.JinniTreeItem') || null
    );
  };

  const getParentNextTreeItemSibling = (
    element: HTMLElement
  ): HTMLElement | null => {
    const parentTreeItemEl = getParentTreeItem(element);
    if (!parentTreeItemEl) return null;
    return getNextTreeItemSibling(parentTreeItemEl);
  };

  useLayoutEffect(() => {
    const treeItemEl = treeItemElRef.current;
    if (!treeItemEl) return;
    const treeEl = treeItemEl.closest('.JinniTree');
    if (!treeEl) return;

    const firstTreeItem = treeEl.querySelector<HTMLElement>(
      ':scope > .JinniTreeItem'
    );
    setIsFirstTreeItem(firstTreeItem === treeItemEl);
  }, []);

  useEffect(() => {
    const treeItemEl = treeItemElRef.current;
    if (!treeItemEl) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.currentTarget !== event.target) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        let nextTreeItemToFocus: HTMLElement | null = null;
        if (children && isExpanded) {
          nextTreeItemToFocus = getFirstDescendantTreeItem(treeItemEl);
        }
        if (!nextTreeItemToFocus) {
          nextTreeItemToFocus = getNextTreeItemSibling(treeItemEl);
        }
        if (!nextTreeItemToFocus) {
          nextTreeItemToFocus = getParentNextTreeItemSibling(treeItemEl);
        }
        if (nextTreeItemToFocus) {
          nextTreeItemToFocus?.focus();
        }
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        let prevTreeItemToFocus: HTMLElement | null = null;
        prevTreeItemToFocus = getPrevTreeItemSibling(treeItemEl);
        if (prevTreeItemToFocus) {
          if (prevTreeItemToFocus.dataset.expanded) {
            prevTreeItemToFocus =
              getLastDescendantTreeItem(prevTreeItemToFocus);
          }
        } else {
          prevTreeItemToFocus = getParentTreeItem(treeItemEl);
        }
        if (prevTreeItemToFocus) {
          prevTreeItemToFocus?.focus();
        }
      }
      if (event.key === 'Enter' || event.key === 'Space') {
        event.preventDefault();
        treeItemEl.querySelector<HTMLElement>('.JinniTreeItemContent')?.click();
      }
    };

    treeItemEl.addEventListener('keydown', handleKeyDown);
    return () => {
      treeItemEl.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded, children]);

  return { isFirstTreeItem };
};
