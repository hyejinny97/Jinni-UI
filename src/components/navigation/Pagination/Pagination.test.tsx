import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import Pagination from './Pagination';

describe('<Pagination />', () => {
  it('renders pagination with a default maximum of 5 visible pages and 4 control buttons', () => {
    render(<Pagination count={10} />);

    const pagination = screen.getByRole('navigation');
    const paginationItems = pagination.querySelectorAll('.JinniPaginationItem');
    expect(pagination).toBeInTheDocument();
    expect(paginationItems.length).toBe(9);

    const pageButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.page-type'
    );
    const controlButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.control-type'
    );
    expect(pageButtons.length).toBe(5);
    expect(controlButtons.length).toBe(4);
    expect(pageButtons[0]).toHaveAttribute('aria-current', 'page');

    fireEvent.click(pageButtons[1]);
    expect(pageButtons[1]).toHaveAttribute('aria-current', 'page');
  });

  it('renders pagination with restricted visible page count', () => {
    render(<Pagination count={10} displayCount={3} />);

    const pagination = screen.getByRole('navigation');
    const paginationItems = pagination.querySelectorAll('.JinniPaginationItem');
    expect(pagination).toBeInTheDocument();
    expect(paginationItems.length).toBe(7);

    const pageButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.page-type'
    );
    const controlButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.control-type'
    );
    expect(pageButtons.length).toBe(3);
    expect(controlButtons.length).toBe(4);
  });

  it('sets the default selected page via the defaultPage prop', () => {
    render(<Pagination count={10} defaultPage={4} />);

    const pagination = screen.getByRole('navigation');
    const paginationItems = pagination.querySelectorAll('.JinniPaginationItem');
    expect(pagination).toBeInTheDocument();
    expect(paginationItems.length).toBe(9);

    const pageButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.page-type'
    );
    expect(pageButtons.length).toBe(5);
    expect(pageButtons[3]).toHaveAttribute('aria-current', 'page');
  });

  it('renders controlled pagination', () => {
    render(<Pagination count={10} page={3} />);

    const pagination = screen.getByRole('navigation');
    const paginationItems = pagination.querySelectorAll('.JinniPaginationItem');
    expect(pagination).toBeInTheDocument();
    expect(paginationItems.length).toBe(9);

    const pageButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.page-type'
    );
    expect(pageButtons.length).toBe(5);
    expect(pageButtons[2]).toHaveAttribute('aria-current', 'page');
  });

  it('renders pagination with ellipsis', () => {
    render(
      <Pagination
        count={10}
        displayCount={10}
        defaultPage={5}
        displayMethod="ellipsis"
      />
    );

    const pagination = screen.getByRole('navigation');
    const paginationItems = pagination.querySelectorAll('.JinniPaginationItem');
    expect(pagination).toBeInTheDocument();
    expect(paginationItems.length).toBe(9);

    const pageButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.page-type'
    );
    const controlButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.control-type'
    );
    const ellipsis = pagination.querySelectorAll('.JinniPaginationEllipsis');
    expect(pageButtons.length).toBe(5);
    expect(controlButtons.length).toBe(4);
    expect(ellipsis.length).toBe(2);

    const selectedPage = pagination.querySelector(
      '.JinniPaginationItem.page-type[aria-current="page"]'
    );
    expect(selectedPage).toHaveTextContent('5');
  });

  it('limits visible pages in pagination with ellipsis', () => {
    render(
      <Pagination
        count={10}
        displayCount={10}
        defaultPage={5}
        displayMethod="ellipsis"
        siblingCount={0}
        boundaryCount={2}
      />
    );

    const pagination = screen.getByRole('navigation');
    const paginationItems = pagination.querySelectorAll('.JinniPaginationItem');
    expect(pagination).toBeInTheDocument();
    expect(paginationItems.length).toBe(9);

    const pageButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.page-type'
    );
    const controlButtons = pagination.querySelectorAll(
      '.JinniPaginationItem.control-type'
    );
    const ellipsis = pagination.querySelectorAll('.JinniPaginationEllipsis');
    expect(pageButtons.length).toBe(5);
    expect(controlButtons.length).toBe(4);
    expect(ellipsis.length).toBe(2);

    expect(pageButtons[0]).toHaveTextContent('1');
    expect(pageButtons[1]).toHaveTextContent('2');
    expect(pageButtons[2]).toHaveTextContent('5');
    expect(pageButtons[3]).toHaveTextContent('9');
    expect(pageButtons[4]).toHaveTextContent('10');
  });

  it('renders disabled pagination', () => {
    render(<Pagination count={10} disabled />);

    const pagination = screen.getByRole('navigation');
    const paginationItems = pagination.querySelectorAll('.JinniPaginationItem');
    expect(pagination).toBeInTheDocument();
    paginationItems.forEach((item) => expect(item).toBeDisabled());
  });
});
