
import Login from '~/pages/Login';
import ForgotPassword from '~/pages/ForgotPassword';
import Register from '~/pages/Register';
import ResetPassword from '~/pages/ResetPassword';
import Dashboard from '~/pages/DashBoard';
import PersonalInfoForm from '~/pages/PersonalInfoForm';


const publicRoutes = [
    { path: '/', component: Login, layout: null},
    { path: '/forgot-password', component: ForgotPassword, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/reset-password', component: ResetPassword, layout: null },
    { path: '/dashboard', component: Dashboard, layout: null },
    { path: '/person-info', component: PersonalInfoForm, layout: null }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes }