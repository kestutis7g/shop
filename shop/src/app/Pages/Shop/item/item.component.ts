import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api-service';
import { ICart } from 'src/model/ICart';
import { IItem } from 'src/model/IItem';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: IItem | undefined
  quantity: number = 0
  constructor(
    private service: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let route = this.route.params.subscribe(params => {

      this.service.getItemById(params['id']).subscribe(
        data => {
          this.item = data;
          console.log(this.item);
        },
        error => {
          console.log(error);
        }
      )
    });
  }

  addToCart(id: number) {
    console.log(id);
    let cartItem: ICart = {
      id: 0,
      itemId: id,
      userId: 0,
      quantity: this.quantity
    }

    this.service.addItemToCart(cartItem).subscribe(
      data => {

      },
      error => {
        console.log(error);
      }
    )

  }

}
