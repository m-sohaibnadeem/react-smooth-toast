import ToastContainer from './components/ToastContainer'
import useToast from './hooks/useToast'

function App() {
  const {success,info,warning,error,promise} = useToast();
  const showToast = () => {
    success('This is a success message!');
    info('This is an info message!');
    warning('This is a warning message!');
    error('This is an error message!');
  }
  const fakeAsyncFunction = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Simulate a random success or failure after 2 seconds
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Operation successful!");
        } else {
          reject(new Error("Operation failed!"));
        }
      }, 2000);
    });
  };

  const handleAsyncOperation = () => {
    promise(
      fakeAsyncFunction(),
      {
        pending: 'Loading...',
        success: (result) => `Operation completed: ${result}`,
        error: (err) => `Error: ${err.message}`,
      }
    );
  };

  return (
  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
  <button style={{marginLeft:"35rem"}} onClick={showToast}>Show Toasts</button>
  <button style={{marginLeft:"35rem"}} onClick={handleAsyncOperation}>Show Promise</button>
  <ToastContainer position="top-right" variant="progress" />
  </div>
  )
}

export default App
