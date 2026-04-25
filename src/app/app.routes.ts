import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Dash } from './pages/admin/dash/dash';
import { MapDealerShip } from './pages/admin/map-dealer-ship/map-dealer-ship';
import { DealerTable } from './pages/admin/dealer-table/dealer-table';
import { Login } from './pages/login/login';
import { Dash as dealerDash } from './pages/dealer/dash/dash';
import { MySites } from './pages/dealer/my-sites/my-sites';
import { MyUnits } from './pages/dealer/my-units/my-units';
import { VehiclesModels } from './pages/admin/vehicles-models/vehicles-models';
import { MyDrivers } from './pages/dealer/my-drivers/my-drivers';
import { Main } from './pages/dealer/main/main';
export const routes: Routes = [
    {
        path: '',
        component: Home
    }, {
        path: 'dash',
        component: dealerDash,
        children: [
            {
                path: '',
                component: Main
            },
            {
                path: 'my-sites',
                component: MySites
            },
            {
                path: 'flota',
                component: MyUnits
            }
            ,
            {
                path: 'my-drivers',
                component: MyDrivers
            },
        ]
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
                path: 'dealers',
                component: DealerTable
            },
            {
                path: 'vehicles',
                component: VehiclesModels
            }
        ]
    }
];
