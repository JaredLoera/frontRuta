import { Routes } from '@angular/router';
import { Home } from './pages/admin/home/home';
import { Dash } from './pages/admin/dash/dash';
import { MapDealerShip } from './pages/admin/map-dealer-ship/map-dealer-ship';
import { DealerTable } from './pages/admin/dealer-table/dealer-table';
import { Login } from './pages/login/login';
import { Dash as dealerDash } from './pages/dealer/dash/dash';
import { MySites } from './pages/dealer/my-sites/my-sites';
import { MyUnits } from './pages/dealer/my-units/my-units';
export const routes: Routes = [
    {
        path: '',
        component: Home
    },{
        path: 'dash',
        component: dealerDash
    },
    {
        path: 'my-sites',
        component: MySites
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'my-units',
        component: MyUnits
    },
    {
        path: 'dashboard',
        component: Dash,
        children: [
            {
                path: '',
                component: MapDealerShip
            },
            {
               path:'dealers',
               component: DealerTable
            }
        ]
    }
];
