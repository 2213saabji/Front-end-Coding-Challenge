import { Route ,Routes,BrowserRouter} from "react-router-dom";
import './main.css';
import { Box } from '@mui/material';

import {ListStaredUsers} from "./sections/users/view"
import { AuthProvider } from './auth/context/auth-provider';

function App() {
  
  return (
    <Box className="App">
    <AuthProvider>
    <BrowserRouter> 
      <Routes>
        <Route index element={<ListStaredUsers/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </Box>
  );
}

export default App;
