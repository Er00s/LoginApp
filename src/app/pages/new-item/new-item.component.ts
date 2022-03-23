import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { ItemsService } from 'src/app/services/items.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import Swiper, { SwiperOptions, Pagination, Navigation } from 'swiper';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {
  images: string[] = [];

  newPost: FormGroup;

  public formSubmitted = false;

  faCircleXmark = faCircleXmark;

  public swiperConfig: SwiperOptions = {
    navigation: true,
    pagination: true,
  };

  public itemForm = this._fb.group({
    SKU: ['', [Validators.required, Validators.minLength(2)]],
    code: [, [Validators.required, Validators.minLength(2)]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(1)]],
    pictures: [[], [Validators.required, Validators.minLength(2)]],
    price: [, [Validators.required, Validators.minLength(2)]],
    currency: ['', [Validators.required, Validators.minLength(1)]],
    __v: [, [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private _itemService: ItemsService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    Swiper.use([Pagination, Navigation]);
  }

  cargarImagen(event: any) {
    let archivos = event.target.files;
    let nombre = 'test';
    for (let i = 0; i < archivos.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(archivos[i]);
      reader.onloadend = () => {
        this._storageService
          .uploadImg(nombre + '_' + Date.now(), reader.result)
          .then((urlImagen) => {
            this.images.push(urlImagen);

            this.itemForm.value.pictures = this.images;
          });
      };
    }
  }

  postItem() {
    this._itemService.postItem(this.itemForm.value).subscribe(
      (resp) => {
        Swal.fire('Item creado correctamente', '', 'success');
        this.itemForm.reset();
        this.router.navigate(['/main', 'itemslist']);
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  deleteImgToLoad(indexImg: number) {
    this.images.splice(indexImg, 1);
  }
}
