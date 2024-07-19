import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    padding: '2em'
  });

  constructor() { }

  showSuccess(message: string) {
    this.toast.fire({
      icon: 'success',
      title: message
    });
  }

  showError(message: string) {
    this.toast.fire({
      icon: 'error',
      title: message
    });
  }
  
}
