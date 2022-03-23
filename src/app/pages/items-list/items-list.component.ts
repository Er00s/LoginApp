import { Component, OnInit } from '@angular/core';
import { item } from 'src/app/interfaces/item-form.interface';
import { ItemsService } from 'src/app/services/items.service';

import Swiper, { SwiperOptions, Pagination, Navigation } from 'swiper';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  //swiper
  public swiperConfig: SwiperOptions = {
    navigation: true,
    pagination: true,
  };

  items: Array<item>;

  constructor(private itemService: ItemsService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(async (resp: Array<item>) => {
      // splice para paginar, el await es necesario porque si no, no realiza el corte del arreglo (la paginacion deberia venir desde la base con un get by index)
      await resp.splice(10);
      this.items = resp;
    });

    Swiper.use([Pagination, Navigation]);
  }

  onScrollDown(): void {
    this.itemService.getItems().subscribe(async (resp: Array<item>) => {
      await resp.splice(this.items.length + 5);
      this.items = resp;
    });
  }
}

/* 
     this.items = [{ SKU :"buenas",
     code :123456,
     currency : "U$D",
     description: "buenas",
     name:"buenas",
     pictures:["https://astelus.com/wp-content/viajes/Plato-de-milanesa-con-papas-ti%CC%81pico-de-Argentina.jpg"],
     price: 1231,
     _id: "buenas",}] */
