import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { Tree, TreeProps } from '.';

describe('Tree', () => {
  const mockData: TreeProps['data'] = {
    '1': { label: 'Item 1' },
    '2': { label: 'Item 2' },
    '3': { label: 'Item 3' },
    '4': { label: 'Item 4', disabled: true }
  };

  const mockTreeNodes: TreeProps['treeNodes'] = {
    root: ['1', '2'],
    '1': ['3'],
    '2': ['4']
  };

  it('renders tree items', () => {
    render(<Tree data={mockData} treeNodes={mockTreeNodes} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 4')).not.toBeInTheDocument();
  });

  it('expands and collapses items on click', () => {
    render(<Tree data={mockData} treeNodes={mockTreeNodes} />);

    const item1 = screen.getByText('Item 1');
    fireEvent.click(item1);

    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('selects single item by default', () => {
    render(
      <Tree
        data={mockData}
        treeNodes={mockTreeNodes}
        defaultSelectedItem={'1'}
      />
    );

    const item1 = screen.getByText('Item 1');
    const treeItem1 = item1.closest('[role="treeitem"]');
    expect(treeItem1).toHaveAttribute('data-selected', 'true');

    const item2 = screen.getByText('Item 2');
    const treeItem2 = item2.closest('[role="treeitem"]');
    fireEvent.click(item2);

    expect(treeItem2).toHaveAttribute('data-selected', 'true');
    expect(treeItem1).toHaveAttribute('data-selected', 'false');
  });
});
