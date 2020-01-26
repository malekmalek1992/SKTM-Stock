import React ,{useState} from 'react';
import Form  from "./Form";
import { BrowserRouter as Router,Route} from "react-router-dom";
import Plant1 from "./Plant1";
import Plant2 from "./Plant2";
import Plant3 from "./Plant3";
import NavBar from "./NavBar";
import Order from "./Order";
import Request from "./Request";

function Home (){
   const[isRegistered,setIsRegistered]=useState(false)
   const [isLogedin,setIsLogedin]=useState(false)
   const [isAdminp1,setIsAdminep1]=useState(false)
   const [isAdminp2,setIsAdminep2]=useState(false)
   const [user, setUser]=useState("")
   const p1admins = ["0000","1111","2222"];// admin users in plant 1
   const p2admins =["3333","4444"];//admin users in plant 2
    function login(state,user){
        setIsLogedin(state)
        setIsRegistered(false)
       var IsUserAdminep1 = p1admins.some(admin => {
         return user === admin
        })
        if (IsUserAdminep1){
          setIsAdminep1(true)
        }else {
          setIsAdminep1(false);
        }
        var IsUserAdminep2 = p2admins.some(admin => {
          return user=== admin
         })
         if (IsUserAdminep2){
           setIsAdminep2(true)
         }else {
           setIsAdminep2(false);
         }
         setUser(user);
        
    }
    function register(state){
      setIsRegistered(state)
    }
    return  <div className="login">
      {!isLogedin ? <Form 
          register ={register}
          login={login}
          isRegistered={isRegistered}
      /> :
       <Router>
          <NavBar logout={login} admin1 ={isAdminp1} admin2 ={isAdminp2}/>
          <Route path="/plant1" exact>
            <Plant1
             user ={isAdminp1}
             />
          </Route>
          <Route path="/plant2">
            <Plant2  user ={isAdminp2} />
          </Route>
          <Route path="/plant3">
            <Plant3 />
          </Route>
          <Route path="/order">
            <Order user = {user} admin1 ={isAdminp1} admin2 ={isAdminp2}/>
          </Route>
          <Route path="/request">
            <Request />
          </Route>
    </Router> }
  </div>
};
export default Home;