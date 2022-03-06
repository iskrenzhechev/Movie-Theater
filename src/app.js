import { page, render } from './lib.js';

/* debug */
import * as api from './api/data.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { getUserData } from './util.js';
import { logout } from './api/api.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';
window.api = api;

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage)
page('/create', createPage);
page('/edit/:id', editPage);
page('/profile', profilePage)

updateUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/', homePage);
}


function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('profileNav').style.display = 'block';
        document.getElementById('createNav').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('loginNav').style.display = 'none';
        document.getElementById('registerNav').style.display = 'none';
    } else {
        document.getElementById('profileNav').style.display = 'none';
        document.getElementById('createNav').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('loginNav').style.display = 'block';
        document.getElementById('registerNav').style.display = 'block';
    }
}