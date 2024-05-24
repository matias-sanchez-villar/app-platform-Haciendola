import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/interface/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-product-acction',
  templateUrl: './product-acction.component.html',
  styleUrls: ['./product-acction.component.scss'],
})
export class ProductAcctionComponent implements OnInit {
  formGroup: FormGroup;
  edit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.formGroup = this.fb.group({
      id: [''],
      handle: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      sku: ['', Validators.required],
      grams: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,3})?$/)]],
      stock: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d*$/)]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\,\d{1,2})?$/)]],
      comparePrice: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\,\d{1,2})?$/)]],
      barcode: ['', [Validators.min(0), Validators.pattern(/^\d*$/)]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const data = JSON.parse(params['product']);
      if (data) {
        this.formGroup.patchValue({
          id: data.id,
          handle: data.handle,
          title: data.title,
          description: data.description,
          sku: data.sku,
          grams: data.grams,
          stock: data.stock,
          price: data.price,
          comparePrice: data.comparePrice,
          barcode: data.barcode,
        });
        this.edit = true;
      }
    });
  }

  async onSubmit() {
    if (this.edit) this.editProduct();
    else this.createProduct();
  }

  async createProduct() {
    try {
      const data = await this.productService.createProduct(
        this.formGroup.value as Product
      );
      if (data) {
        this.formGroup.reset();
        this.openDialog("Added product", "Product successfully added")
      }
    } catch (error: any) {
      this.openDialog("Error", error.message)
    }
  }

  async editProduct() {
    try {
      const data = await this.productService.updateProduct(
        this.formGroup.value as Product
      );
      if (data) {
        this.formGroup.reset();
        this.openDialog("Added product", "Successfully modified product")
        this.router.navigate(['product/list']);
      }
    } catch (error: any) {
      this.openDialog("Error", error.message)
    }
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
