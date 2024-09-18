import ToastContainer from './components/ToastContainer'
import useToast from './hooks/useToast'

function App() {
  const toast = useToast();
  const showToast = () => {
    toast.success('This is a success message!');
    toast.info('This is an info message!');
    toast.warning('This is a warning message!');
    toast.error('This is an error message!');
  };
  return (
  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
  <button style={{marginLeft:"35rem"}} onClick={showToast}>Show Toasts</button>
  <ToastContainer position="top-right" variant="progress" />
  </div>
  )
}

export default App
