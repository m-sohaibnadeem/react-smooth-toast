import { useState } from 'react';
import ToastContainer from './components/ToastContainer'
import useToast from './hooks/useToast'
import { ToastPosition, ToastVariant } from './types/types';

function App() {
  const toast = useToast();
  const [position, setPosition] = useState<ToastPosition>("top-right");
  const [variant, setVariant] = useState<ToastVariant>("gradient");

  const positions: ToastPosition[] = ["top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center"];
  const variants: ToastVariant[] = ["minimal", "material", "modern", "progress", "rounded", "glassmorphism", "dark", "gradient"];

  const showToast = () => {
    toast.success('This is a success message!');
    toast.info('This is an info message!');
    toast.warning('This is a warning message!');
    toast.error('This is an error message!');
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    }}>
      <div>
        <label>
          Position:
          <select value={position} onChange={(e) => setPosition(e.target.value as ToastPosition)}>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Variant:
          <select value={variant} onChange={(e) => setVariant(e.target.value as ToastVariant)}>
            {variants.map(var_ => (
              <option key={var_} value={var_}>{var_}</option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={showToast}>Show Toasts</button>
      <ToastContainer position={position} variant={variant} />
    </div>
  )
}

export default App
