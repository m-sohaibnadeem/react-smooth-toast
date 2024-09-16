import ToastContainer from './components/ToastContainer'
import useToast from './hooks/useToast'

function App() {
  const toast = useToast();

  const showToast = () => {
    toast.success('This is a success message!', { duration: 5000, });
    toast.error('This is an error message!', { icon: '❌' });
    toast.info('This is an info message!', { className: 'custom-class' });
    toast.warning('This is a warning message!');
    toast.success('This is a success message!', { duration: 5000 });
    toast.error('This is an error message!',);
    toast.info('This is an info message!', { className: 'custom-class' });
    toast.warning('This is a warning message!');
  };
  return (
  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
  
  <button style={{marginLeft:"35rem"}} onClick={showToast}>Show Toasts</button>
  <ToastContainer position="bottom-right"/>

  </div>
  )
}

export default App
