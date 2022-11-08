import { Fragment, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Edit from "./pages/Edit"
import {createTheme,ThemeProvider} from "@mui/material/styles"
import { grey, blue, indigo } from '@mui/material/colors'
import Navbar from "./components/navbar"
import Anasayfa from "./pages/Anasayfa"
import Exercise from "./pages/Exercise"
import {Register } from './pages/Register'
import { Login } from './pages/Login'
import { store } from './app/store' 
import {Provider} from "react-redux"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette:{

    turkceRenk:blue[300],
    ingilizceRenk:grey[200],
    arkaplan:indigo[600],
    mode:"dark",
   secondary:{
    main:"#330e62"
   }
  },
  typography:{
    fontFamily:"Montserrat",
    fontWeightLight:200,
    fontWeightRegular:300,
    fontWeightMedium:400,
    fontWeightBold:500,
    fontSize:16
  },
  
})




function App() {
  return (
    <Provider store={store}>
          <ThemeProvider theme={theme}>
          
            <BrowserRouter>
              <Fragment>
                    <Navbar />
                    <Routes>
                            <Route path='/register' element={<Register/>} />
                            <Route path='/login' element={<Login/>} />
                            <Route path='/' element={<Anasayfa/>} />
                            <Route path='/edit/:id' element={<Edit/>} />
                    </Routes>
              
                </Fragment>
            </BrowserRouter>
          <ToastContainer />
          </ThemeProvider>
    </Provider>
  );
}

export default App;
