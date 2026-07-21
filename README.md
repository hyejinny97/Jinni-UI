# @jinni-labs/ui

Jinni UI is an open-source React component library.
It maintains a consistent design through a built-in design system while allowing for flexible customization to suit your project.

## Documentation

- [Storybook](https://master--6734450e7712786aaf46381e.chromatic.com)
- [Github Repo](https://github.com/hyejinny97/Jinni-UI)

## Installation

Install the package in your project directory with:

```bash
npm install @jinni-labs/ui
```

## Get Started

1. Wrap your application with the `JinniProvider` component:

    ```tsx
    import { StrictMode } from "react";
    import { createRoot } from "react-dom/client";
    import App from "./App";
    import JinniProvider, {
      createDesignSystem,
    } from "@jinni-labs/ui/JinniProvider";

    const designSystem = createDesignSystem();

    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <JinniProvider designSystem={designSystem}>
          <App />
        </JinniProvider>
      </StrictMode>,
    );
    ```

2. Start using components:

    ```tsx
    import Button from "@jinni-labs/ui/Button";

    const App = () => {
      return <Button>Simple</Button>;
    };

    export default App;
    ```