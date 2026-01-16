import { describe, it, expect } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor
} from '@/tests/react-testing-tools';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselFraction,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselProgress
} from '.';

describe('<Carousel />', () => {
  it('should render carousel with carousel items', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const carouselItems = screen.getAllByRole('group');
    expect(carouselItems).toHaveLength(3);
    expect(carouselItems[0]).toHaveTextContent('Slide 1');
    expect(carouselItems[1]).toHaveTextContent('Slide 2');
    expect(carouselItems[2]).toHaveTextContent('Slide 3');
  });

  it('should render carousel with default value', () => {
    render(
      <Carousel defaultValue={1}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    );

    const dotButtons = screen.getAllByRole('button');
    expect(dotButtons[1]).toHaveAttribute('aria-current', 'true');
  });

  it('should support controlled component with value prop', async () => {
    const ControlledCarousel = () => {
      const [value, setValue] = useState(0);
      return (
        <div>
          <Carousel value={value} onChange={setValue}>
            <CarouselContent>
              <CarouselItem>Slide 1</CarouselItem>
              <CarouselItem>Slide 2</CarouselItem>
              <CarouselItem>Slide 3</CarouselItem>
            </CarouselContent>
            <CarouselDots />
          </Carousel>
          <div data-testid="current-value">{value}</div>
        </div>
      );
    };

    render(<ControlledCarousel />);

    expect(screen.getByTestId('current-value')).toHaveTextContent('0');

    const dotButtons = screen.getAllByRole('button');
    fireEvent.click(dotButtons[2]);

    await waitFor(() => {
      expect(screen.getByTestId('current-value')).toHaveTextContent('2');
    });
  });

  it('should render carousel with prev and next buttons', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselPrevButton />
        <CarouselNextButton />
      </Carousel>
    );

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons.find((btn) =>
      btn.getAttribute('aria-label')?.includes('previous')
    );
    const nextButton = buttons.find((btn) =>
      btn.getAttribute('aria-label')?.includes('next')
    );

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should render carousel with dots pagination', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    );

    const dots = screen.getByRole('navigation', { name: 'dot navigation' });
    const dotButtons = screen.getAllByRole('button');

    expect(dots).toBeInTheDocument();
    expect(dotButtons).toHaveLength(3);
  });

  it('should render carousel with fraction pagination', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselFraction data-testid="fraction" />
      </Carousel>
    );

    const fraction = screen.getByTestId('fraction');
    expect(fraction).toBeInTheDocument();
    expect(fraction).toHaveTextContent('1');
    expect(fraction).toHaveTextContent('/');
    expect(fraction).toHaveTextContent('3');
  });

  it('should render carousel with progress bar', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselProgress />
      </Carousel>
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });
});
