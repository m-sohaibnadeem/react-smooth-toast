# React Smooth Toast

A lightweight and customizable toaster notification library for React built with TypeScript. This library provides an easy-to-use API for displaying toast notifications with customizable icons, styles, positions, and animations.

## Features

- **Multiple Toast Types**: Supports `success`, `error`, `info`, and `warning` toasts.
- **Multiple Toast Variants**: Supports `minimal`, `material`, and more variants coming soon.
- **Customizable**: Easily customize icons, class names, styles, and positions.
- **Animations**: Built-in smooth entry and exit animations with pure CSS options.
- **Responsive**: Toasts are positioned correctly on different screen sizes.
- **Easy Integration**: Simple setup with context and hooks.

## Installation

Install the library using npm:


```bash
npm install react-smooth-toast
```
## Demo gif
![Toast Demo](https://raw.githubusercontent.com/m-sohaibnadeem/react-smooth-toast/main/src/assets/toasts-demo.gif)


## Getting Started

### 1. Wrap Your Application with the ToastProvider

To use the toast notifications, wrap your application with the `ToastProvider` from the library.

```tsx
// src/index.tsx or src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from 'react-smooth-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);
```

### 2. Add the ToastContainer to Your Application

Include the `ToastContainer` component to render the toasts in your UI. You can set the position of the container.

```tsx
// src/App.tsx
import React from 'react';
import ToastContainer from 'react-smooth-toast';
import useToast from 'react-smooth-toast';

const App: React.FC = () => {
  const toast = useToast();

  const showToast = () => {
    toast.success('This is a success message!', { duration: 4000 });
    toast.error('This is an error message!', { icon: '❌' });
    toast.info('This is an info message!', { className: 'custom-class' });
    toast.warning('This is a warning message!', { style: { backgroundColor: 'orange' } });
  };

  return (
    <div>
      <button onClick={showToast}>Show Toasts</button>
      <ToastContainer position="top-right" variant="minimal"/>
    </div>
  );
};

export default App;
```

## API

### `ToastProvider`

Wraps your application and provides context for the toast notifications.

### `ToastContainer`

A component that renders the list of toasts. 

**Props**:

- `position`: (optional) Defines the position of the toast container. Options are `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`. Default is `'top-right'`.

### `useToast()`

A custom hook that provides functions to trigger toasts of various types.

**Methods**:

- `success(message: string, options?: ToastOptions)`: Displays a success toast.
- `error(message: string, options?: ToastOptions)`: Displays an error toast.
- `info(message: string, options?: ToastOptions)`: Displays an info toast.
- `warning(message: string, options?: ToastOptions)`: Displays a warning toast.

### `ToastOptions`

Options for customizing toasts.

- `id`: (optional) Unique identifier for the toast.
- `type`: `'success' | 'error' | 'info' | 'warning'`.
- `message`: The message to be displayed in the toast.
- `icon`: (optional) A React node to display as an icon.
- `duration`: (optional) Duration in milliseconds before the toast is dismissed. Default is `3000ms`.
- `style`: (optional) Inline styles for the toast.
- `className`: (optional) Custom class name for additional styling.

## Customization

### Icons and Styles

Customize icons and styles for individual toasts:

```tsx
toast.success('Success!', {
  icon: <YourCustomIcon />,
  style: { backgroundColor: 'green' },
  className: 'my-custom-class'
});
```

### Positions

Position the toast container anywhere on the screen using the `position` prop:

```tsx
<ToastContainer position="bottom-left" variant="minimal"/>
```


## Example

Here's a quick example of using the toast notifications in your app:

```tsx
import React from 'react';
import ToastContainer from 'react-smooth-toast';
import useToast from 'react-smooth-toast';

const App: React.FC = () => {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast.success('Operation successful!')}>Success</button>
      <button onClick={() => toast.error('Something went wrong!')}>Error</button>
      <button onClick={() => toast.info('Here is some information.')}>Info</button>
      <button onClick={() => toast.warning('Warning! Be careful.')}>Warning</button>
      <ToastContainer position="top-right" variant="material"/>
    </div>
  );
};

export default App;
```

## Contribution

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) if you want to contribute.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Feel free to use and modify this library to fit your needs! Happy coding! 🚀
```

