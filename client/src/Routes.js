import React from 'react'
import {Routes as Router,Route} from "react-router-dom"
import { Login } from './Pages/Login/Login'
import Posteditor from './Pages/Posteditor/Posteditor'
import { Register } from './Pages/Register/Register'
import { PrivateRouter } from './ProtectedRoutes'
import { Home } from './Pages/Home/Home'
import { Postdetail } from './Pages/Postdetail/Postdetail'
export const Routes = () => {
  return (
    <Router>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path = "/" element={<PrivateRouter><Home/></PrivateRouter>}/>
        <Route path="/add-post" element = {<PrivateRouter><Posteditor/></PrivateRouter>}/>
        <Route path="/post/:postID" element = {<PrivateRouter><Postdetail/></PrivateRouter>}/>
    </Router>
  )
}
