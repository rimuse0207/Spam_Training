import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import App from './App';
import SpamAdminMainPage from './Components/SpamAdmin/SpamAdminMainPage';
import SpamClicksMainPage from './Components/SpamClicks/SpamClicksMainPage';

const RouterPage = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route path="/Spam/:id" component={SpamClicksMainPage}></Route>
                <Route path="/Spam_Amdin_Table" component={SpamAdminMainPage}></Route>
            </Switch>
        </BrowserRouter>
    );
};
export default RouterPage;
