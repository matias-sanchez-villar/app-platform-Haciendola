import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from '../../../../shared/interface/Product'; 
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})

export class ProductComponent implements OnInit {
  products: Product[] = [];
  visible: boolean = false;

  constructor(private productService : ProductService, private router: Router, 
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    await this.productService.getAllProducts()
      .then((data : any) => {
        this.products = data;
      })
      .catch((error) => {
        this.openDialog("Error", error.message)
      });
  }

  clickBtnEdit(product : Product){
    this.router.navigate(['product/new', { product: JSON.stringify(product) }]);
  }

  async clickBtnDelete(id : string){
    try {
      const data = await this.productService.deleteProduct(id)
      if(data){
        this.openDialog("Deleted product", "Product disposed correctly")
      }
    }catch (error: any) {
      this.openDialog("Error", error.message)
    }
  }

  deleteProduct(id : string){
    this.products = this.products.filter(product => product.id !== id)
  }

  openDialog(title : string, message : string) : MatDialogConfig {
    return this.dialog.open(ModalComponent, {
      data: {
        title,
        message
      }
    })
  }

}