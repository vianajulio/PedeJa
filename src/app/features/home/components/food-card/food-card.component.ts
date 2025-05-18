import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../models/produto.model';

@Component({
  selector: 'app-food-card',
  imports: [CommonModule],
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss'
})

export class FoodCardComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<any>();

  addToOrder() {
    this.add.emit(this.product);
  }
}
