import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html'
})

export class GalleryComponent implements OnInit {
  selectedImageUrl: string;
  @Input() images: string[];

  get hasImages() {
    // This '?' is added delebrately, to protect against errors - If no images are present.
    return this.images?.length > 0;
  }

  constructor() {}

  ngOnInit(): void {
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

}
