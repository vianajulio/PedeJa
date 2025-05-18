import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PaymentComponent } from './features/payment/payment.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    {path: 'pagamento', component: PaymentComponent}
];
