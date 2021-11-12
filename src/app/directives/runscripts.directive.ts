import { AfterViewChecked, Directive, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Directive({ selector: '[runScripts]' })
export class RunscriptsDirective implements AfterViewChecked {

    constructor(@Inject(DOCUMENT) private document: any, private elementRef: ElementRef) { }

    ngAfterViewChecked(): void {
        this.reinsertScripts();
    }

    reinsertScripts(): void {
        console.log('Reinsert scripts from nativeElement into the actual dom');
        const scripts = <HTMLScriptElement[]>this.elementRef.nativeElement.getElementsByTagName('script');
        const scriptsInitialLength = scripts.length;
        for (let i = 0; i < scriptsInitialLength; i++) {
            const script: any = scripts[i];
            const scriptCopy = <HTMLScriptElement>this.document.createElement('script');
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