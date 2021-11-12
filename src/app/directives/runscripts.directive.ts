import { AfterViewChecked, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[runScripts]' })
export class RunscriptsDirective implements AfterViewChecked {
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngAfterViewChecked(): void {
        this.reinsertScripts();
    }

    reinsertScripts(): void {
        const scripts = <HTMLScriptElement[]>this.elementRef.nativeElement.getElementsByTagName('script');
        const scriptsInitialLength = scripts.length;
        for (let i = 0; i < scriptsInitialLength; i++) {
            const script: any = scripts[i];
            const scriptCopy = <HTMLScriptElement>this.renderer.createElement(this.elementRef.nativeElement,'script');
            scriptCopy.type = script.type ? script.type : 'text/javascript';
            if (script.innerHTML) {
                scriptCopy.innerHTML = script.innerHTML;
            } else if (script.src) {
                scriptCopy.src = script.src;
            }
            scriptCopy.async = false;
            script.parentNode.replaceChild(scriptCopy, script);
        }
    }
}