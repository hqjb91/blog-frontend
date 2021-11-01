import { AfterViewChecked, Directive, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({ selector: '[runScripts]' })
export class RunscriptsDirective implements AfterViewChecked {
    constructor(private elementRef: ElementRef, private router:Router) { }

    ngOnInit() {
        // Allows for ngOnInit to be called on routing to the same routing Component since we will never reuse a route
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }

    ngAfterViewChecked(): void {
        this.reinsertScripts();
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