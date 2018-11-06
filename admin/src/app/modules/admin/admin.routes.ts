import {RouterModule, Routes} from '@angular/router';
import {ControlComponent} from './components/control/control.component';
import {ModuleWithProviders} from '@angular/core';
import {AdminComponent} from './admin.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'control',
                component: ControlComponent,
            }
        ]
    }
];

export const AdminRoutes: ModuleWithProviders = RouterModule.forRoot(adminRoutes);
