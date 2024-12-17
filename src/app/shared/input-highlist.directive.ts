import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

//type MyVoid = () => void;

@Directive({
    selector: '[app-highlight]',
    standalone: true,
})
export class HighlightDirective implements OnChanges {
    @Input('app-highlight') errors: any = null;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        
        if(this.errors) {
            this.renderer.addClass(this.elRef.nativeElement, 'input-error');
        } else {
            this.renderer.removeClass(this.elRef.nativeElement, 'input-error');
        }
    }

    
}