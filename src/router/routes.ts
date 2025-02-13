import Dashboard from '../pages/Dashboard.vue';
import InitialSetup from "../pages/InitialSetup.vue";
import WorkspaceSelect from "../pages/WorkspaceSelect.vue";

const routes = [
    { path: '/', name: 'workspaceselect', component: WorkspaceSelect },
    { path: '/setup', name: 'initialsetup', component: InitialSetup },
    { path: '/dashboard', name: 'dashboard', component: Dashboard }
]

export default routes;