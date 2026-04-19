import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dash } from './pages/admin/dash/dash';
import { MapDealerShip } from './pages/admin/map-dealer-ship/map-dealer-ship';
import { DealerTable } from './pages/admin/dealer-table/dealer-table';
import { Login } from './pages/login/login';
import { Dash as dealerDash } from './pages/dealer/dash/dash';
import { VehiclesModels } from './pages/admin/vehicles-models/vehicles-models';
export const routes: Routes = [
    {
        path: '',
        component: Home
    },{
        path: 'dash',
        component: dealerDash
    },
    {
        path: 'login',
        component: Login
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
            },
            {
                path: 'vehicles',
                component: VehiclesModels
            }
        ]
    }
];
