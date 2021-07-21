import React, { Suspense, lazy , useState, useEffect } from 'react';
import { Redirect, Route, Switch ,BrowserRouter } from 'react-router-dom';
import SLUGS from './resources/slugs';
import LoadingComponent from './components/loading/LoadingComponent';

const LoginComponent = lazy(() => import('./components/auth/login/LoginComponent'));
const SignUpComponent = lazy(() => import('./components/auth/signup/SignUpComponent'));
const DashboardComponent = lazy(() => import('./components/dashboard/dashboardComponent'));
const EditComponent = lazy(() => import('./components/dashboard/editComponent'));
const AddComponent = lazy(() => import('./components/dashboard/addComponent'));

function App() {

    const [loggedin, isLoggedin ] = useState(false);

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('login'))===true) {
            isLoggedin(true);
        }else if(JSON.parse(localStorage.getItem('login'))==false || localStorage.getItem("login") === null){
            isLoggedin(false);
        }      
    },[]);

  return (
    <div className="App">

    	<Suspense fallback={<LoadingComponent loading />}>
            <BrowserRouter>
                <Switch>
                    <Route path={SLUGS.login} exact component={LoginComponent} />
                    <Route path={SLUGS.signup} component={SignUpComponent} />
                    
                    {loggedin ? 
                        <>
                        <Route path={SLUGS.dashboard} component={DashboardComponent} />
                        <Route path={SLUGS.additem} component={AddComponent} />
                        <Route path={SLUGS.edititem} component={EditComponent} />
                        </>
                    :
                    <Redirect to={SLUGS.login} />
                }
                </Switch>
            </BrowserRouter>
        </Suspense>

    </div>
  );
}

export default App;
