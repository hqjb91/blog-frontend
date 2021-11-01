import { AfterViewChecked, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[runScripts]' })
export class RunscriptsDirective implements AfterViewChecked {
    constructor(private elementRef: ElementRef) { }

    ngAfterViewChecked(): void {
        this.reinsertScripts();
    }

    @HostListener('unloaded')
    ngOnDestroy() {
        console.log('Cleared');
    }

    reinsertScripts(): void {
        const scripts = <HTMLScriptElement[]>this.elementRef.nativeElement.getElementsByTagName('script');
        const scriptsInitialLength = scripts.length;
        for (let i = 0; i < scriptsInitialLength; i++) {
            const script: any = scripts[i];
            const scriptCopy = <HTMLScriptElement>document.createElement('script');
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