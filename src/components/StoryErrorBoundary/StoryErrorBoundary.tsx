import React from 'react';

class StoryErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Context not provided</div>;
    }
    return this.props.children;
  }
}

export default StoryErrorBoundary;
