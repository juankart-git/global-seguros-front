import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number = 0;
  operation: string = 'Agregar producto';

  constructor(private fb: FormBuilder, 
              private _productService: ProductService, 
              private toastr: ToastrService,
              private router: Router,
              private aRoute: ActivatedRoute){
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    })
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id !== 0){
      this.operation = "Editar producto";
      this.getProduct(this.id);
    }
  }

  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }
    this.loading = true;
    if(this.id !== 0){ // EDIT      
      product.id = this.id;
      this._productService.editProduct(this.id, product).subscribe(() => {        
        this.toastr.info('El producto fue editado satisfactoriamente', 'Producto creado'); 
        this.loading = false;
        this.router.navigate(['/']);       
      })
    }
    else{ // ADD     
      this._productService.saveProduct(product).subscribe(() => {
        this.toastr.success('El producto fue creado satisfactoriamente', 'Producto creado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }
    
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      })
      
    });
  }

}
