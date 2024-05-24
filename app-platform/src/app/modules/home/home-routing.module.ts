import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ProductAcctionComponent } from './pages/product-acction/product-acction.component';
import { LayoutComponent } from '../../layout/layout.component';
import { homeGuard } from 'src/app/core/guards/home.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [homeGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'list',
        component: ProductComponent,
      },
      {
        path: 'new',
        component: ProductAcctionComponent,
      }
    ],
  },
  //{ path: '**', redirectTo: '/list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
