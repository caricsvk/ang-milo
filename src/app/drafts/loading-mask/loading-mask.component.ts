import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { LoadingMaskService } from '../../core/loading-mask.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mg-loading-mask',
  templateUrl: './loading-mask.component.html',
  styleUrls: ['./loading-mask.component.scss']
})
export class LoadingMaskComponent implements OnInit, OnDestroy {

  private globalMaskSubscription: Subscription;

  @Input() diameter = 100;
  @Input() strokeWidth = 8;
  @Input() checkAndFixParent = true;

  isMaskShown = true;
  isGlobal = false;

  constructor(
    private elementRef: ElementRef,
    protected loadingMaskService: LoadingMaskService
  ) { }

  ngOnInit() {
    this.checkAndFixParentPosition();
    this.globalMaskSubscription = this.loadingMaskService.isGlobalMaskShown().subscribe(globalMaskShown =>
      this.isMaskShown = !globalMaskShown);
  }

  ngOnDestroy(): void {
    this.globalMaskSubscription.unsubscribe();
  }

  private checkAndFixParentPosition() {
    if (this.checkAndFixParent && this.elementRef) {
      const
        parentElement = this.elementRef.nativeElement.parentElement,
        parentPosition = getComputedStyle(parentElement).position,
        parentDisplay = getComputedStyle(parentElement).display,
        allowablePos = ['relative', 'absolute', 'fixed'],
        nodeWarnTitle = `[Loading mask]: Warning! Host's parent element`;

      if (allowablePos.indexOf(parentPosition) < 0) {
        parentElement.style.position = 'relative';
        console && console.warn(`${nodeWarnTitle} <${parentElement.tagName}> ` +
          `has had none of allowed style positions (${allowablePos}), set to "relative".`);
      }
      if (parentDisplay === 'inline') {
        console && console.warn(`${nodeWarnTitle} <${parentElement.tagName}> ` +
          `behaves as "inline", it's NOT recommended to use loading mask inside inline nodes.`);
      }
    }
  }

}
