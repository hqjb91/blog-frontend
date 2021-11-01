import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[runScripts]' })
export class RunscriptsDirective implements OnInit {
    constructor(private elementRef: ElementRef) { }
    ngOnInit(): void {
        setTimeout(() => { // wait for DOM rendering
            this.reinsertScripts();
        }, 1000);
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