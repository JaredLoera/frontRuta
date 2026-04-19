import { Component , OnInit} from '@angular/core';
import { User } from '../../../core/interfaces/user.interface';
import { Profile } from '../../../core/interfaces/profile.interface';
import { User as UserService } from '../../../core/services/user/user';

@Component({
  selector: 'app-dealer-table',
  imports: [],
  templateUrl: './dealer-table.html',
  styleUrl: './dealer-table.css',
})
export class DealerTable implements OnInit {
  dealerships: User[] = [];

  constructor(private userService: UserService) {}

ngOnInit(): void {
    this.loadDealerships();
  
}
  loadDealerships() {
    
  }


  showModal = false;
  modalTitle = '';

  openAddModal() {
    this.modalTitle = 'Registrar Nueva Concesionaria';
    this.showModal = true;
  }

  viewDealer(dealer: any) {
    this.modalTitle = `Detalles de: ${dealer.nombreComercial}`;
    this.showModal = true;
    // Aquí cargarías los datos en un FormGroup o simplemente mostrarías la información
  }

  toggleStatus(dealer: any) {
    dealer.activo = !dealer.activo;
  }

  editDealer(dealer: any) {
    this.modalTitle = `Editando: ${dealer.nombreComercial}`;
    this.showModal = true;
    // Aquí cargarías los datos en un FormGroup
  }

  closeModal() {
    this.showModal = false;
  }
}
