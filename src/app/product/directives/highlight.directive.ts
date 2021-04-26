
import { Directive, Input, SimpleChanges, Renderer2, ElementRef, OnChanges } from '@angular/core';
import { Product } from '../product.model';

@Directive({
    selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
    @Input() searchedWord: string; // searchText
    // @Input() rowOfProduct: HTMLElement;
    @Input() content: string; // HTML content
    @Input() classToApply: string; //class to apply for highlighting
    @Input() setTitle = false; //sets title attribute of HTML
    // @Input() row: Product[];


    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.content) {
            return;
        }

        if (this.setTitle) {
            this.renderer.setProperty(
                this.el.nativeElement,
                'title',
                this.content
            );
        }

        if (!this.searchedWord || !this.searchedWord.length || !this.classToApply) {
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.content);
            return;
        }

        /*  if (!this.rowOfProduct || !this.classToApply) {
              this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.content);
              return;
          } */

        this.renderer.setProperty(
            this.el.nativeElement,
            'innerHTML',
            this.getFormattedText()
        );
    }

    getFormattedText() {
        const re = new RegExp(`(${this.searchedWord})`, 'gi');
        return this.content.replace(re, `<span class="${this.classToApply}">$1</span>`);
    }

    /*  getFormattedRow() {
  
          if (this.row[0]) {
              return this.rowOfProduct.className.replace(this.rowOfProduct.className, `'bg-green-400'`);
          } else if (this.row[1]) {
              return this.rowOfProduct.className.replace(this.rowOfProduct.className, `'bg-green-200'`);
          } else if (this.row[2]) {
              return this.rowOfProduct.className.replace(this.rowOfProduct.className, `'bg-green-100'`);
  
          } */

}
