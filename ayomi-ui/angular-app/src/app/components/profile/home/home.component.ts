import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../services/user/users.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UsersService,
              private modalService: NgbModal) { }
  user: any = {};
  closeResult = '';
  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userService.getProfile().subscribe((data) => {
      console.log(data);
      this.user = data.data;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateUserEmail(email): void {
    // Check if email is valid
    if (email.length > 3) {
      this.user.email = email;
      this.userService.updateProfile(this.user).subscribe((data) => {
        this.user.email = data.email;
        this.modalService.dismissAll();
      });
    }
  }

}
