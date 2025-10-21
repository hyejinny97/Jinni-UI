import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import Breadcrumbs from './Breadcrumbs';
import { Link } from '@/components/navigation/Link';

describe('<Breadcrumbs />', () => {
  it('render breadcrumbs with separators', () => {
    render(
      <Breadcrumbs>
        <Link href="#">route1</Link>
        <Link href="#">route2</Link>
        <Link href="#">route3</Link>
      </Breadcrumbs>
    );

    const breadcrumbs = screen.getByRole('list');
    const allListItems = screen.getAllByRole('listitem', { hidden: true });
    const links = screen.getAllByRole('link');
    const separators = allListItems.filter(
      (li) => li.getAttribute('aria-hidden') === 'true'
    );

    expect(breadcrumbs).toBeInTheDocument();
    expect(allListItems.length).toBe(5);
    expect(links.length).toBe(3);
    expect(separators.length).toBe(2);
    expect(separators[0]).toHaveTextContent('/');
  });

  it('shows an ellipsis button when items exceed the maxItems limit and expands all items when clicked', () => {
    render(
      <Breadcrumbs maxItems={3}>
        <Link href="#">route1</Link>
        <Link href="#">route2</Link>
        <Link href="#">route3</Link>
        <Link href="#">route4</Link>
        <Link href="#">route5</Link>
      </Breadcrumbs>
    );

    const linksBeforeExpanded = screen.getAllByRole('link');
    const ellipsisButton = screen.getByRole('button', { name: 'Show path' });
    expect(linksBeforeExpanded.length).toBe(2);
    expect(linksBeforeExpanded[0]).toHaveTextContent('route1');
    expect(linksBeforeExpanded[1]).toHaveTextContent('route5');
    expect(ellipsisButton).toBeInTheDocument();

    fireEvent.click(ellipsisButton);

    const linksAfterExpanded = screen.getAllByRole('link');
    expect(linksAfterExpanded.length).toBe(5);
    expect(
      screen.queryByRole('button', { name: 'Show path' })
    ).not.toBeInTheDocument();
  });

  it('renders the specified number of itemsBeforeCollapse before the ellipsis button when items exceed maxItems', () => {
    render(
      <Breadcrumbs maxItems={3} itemsBeforeCollapse={2}>
        <Link href="#">route1</Link>
        <Link href="#">route2</Link>
        <Link href="#">route3</Link>
        <Link href="#">route4</Link>
        <Link href="#">route5</Link>
      </Breadcrumbs>
    );

    const links = screen.getAllByRole('link');
    const ellipsisButton = screen.getByRole('button', { name: 'Show path' });
    expect(links.length).toBe(3);
    expect(links[0]).toHaveTextContent('route1');
    expect(links[1]).toHaveTextContent('route2');
    expect(links[2]).toHaveTextContent('route5');
    expect(ellipsisButton).toBeInTheDocument();
  });

  it('renders breadcrumbs with different separator', () => {
    render(
      <Breadcrumbs separator=">">
        <Link href="#">route1</Link>
        <Link href="#">route2</Link>
        <Link href="#">route3</Link>
      </Breadcrumbs>
    );

    const allListItems = screen.getAllByRole('listitem', { hidden: true });
    const separators = allListItems.filter(
      (li) => li.getAttribute('aria-hidden') === 'true'
    );

    expect(allListItems.length).toBe(5);
    expect(separators.length).toBe(2);
    expect(separators[0]).toHaveTextContent('>');
    expect(separators[1]).toHaveTextContent('>');
  });
});
