import 'rxjs/add/operator/filter/';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { HttpService } from './http.service';

/**
 * LoadingMaskComponent tracks http requests in progress and show global mask automatically,
 * it also counts showed local loadings: <mg-loading-mask>, <mat-spinner>, <mat-progress-bar>
 * and hide global mask if there are any visible local masks
 */
@Injectable()
export class LoadingMaskService {

  private globalMaskDisabled = new BehaviorSubject(false);
  private globalMaskForced = new BehaviorSubject(false);
  private globalMaskShown = new BehaviorSubject(false);

  private recursiveLoadingTimeout: any | undefined;

  constructor(router: Router,
              httpService: HttpService) {

    const navigationStartOrEnd = (event: any) => event instanceof NavigationStart || event instanceof NavigationEnd ||
      event instanceof NavigationError;

    Observable.combineLatest(
      httpService.getNumberOfRequestsInProgress(),
      router.events.filter(navigationStartOrEnd),
      this.globalMaskDisabled.asObservable(),
      this.globalMaskForced.asObservable(),
    ).subscribe(combinedValues => {
      if (this.recursiveLoadingTimeout) {
        clearTimeout(this.recursiveLoadingTimeout);
      }
      this.setupShownMask(combinedValues);
    });
  }

  private setupShownMask(combinedValues: any[], recursiveChecks = 0) {
    const [ httpRequestsInProgress, lastNavigationEvent, globalMaskDisabled, globalMaskForced ] = combinedValues;
    let numberOfShownLocalLoadings = this.countNumberOfVisibleElements('mg-loading-mask') +
      this.countNumberOfVisibleElements('mat-spinner') +
      this.countNumberOfVisibleElements('mat-progress-bar');
    if (this.globalMaskShown.getValue()) { // remove one mat-spinner if global mask is shown
      numberOfShownLocalLoadings --;
    }
    const showGlobalMask = globalMaskForced || lastNavigationEvent instanceof NavigationStart || (!globalMaskDisabled &&
      numberOfShownLocalLoadings <= 0 && httpRequestsInProgress > 0);

    this.globalMaskShown.next(showGlobalMask);

    /**
     * ideally we subscribe for added / removed loading DOM elements and we could get rid of this, but with current DOM APIs
     * it's a heavy operation so we rather check them on demand and keep checking them if global mask is shown or some
     * of them is shown for few seconds
    */
    if ((showGlobalMask && recursiveChecks < 10) || (numberOfShownLocalLoadings > 0 && recursiveChecks < 100)) {
      this.recursiveLoadingTimeout = setTimeout(() => this.setupShownMask(combinedValues,
        recursiveChecks + 1), recursiveChecks * 32);
    }
  }

  private countNumberOfVisibleElements(elementTagName: string) {
    return [].slice.call(document.getElementsByTagName(elementTagName)).filter(
      (header: HTMLElement) => header.offsetParent !== null || header.offsetTop).length;
  }

  /**
   * call this when you want to temporarily disable global loading mask, don't forget to call enableGlobalMask after,
   * note that any initialized local mask before http request prevent showing global mask
   */
  disableGlobalLoading() {
    this.globalMaskDisabled.next(true);
  }

  enableGlobalLoading() {
    this.globalMaskDisabled.next(false);
  }

  /**
   * force global mask to be shown in any circumstances
   */
  forceGlobalLoading() {
    this.globalMaskForced.next(true);
  }

  cancelForcedGlobalLoading() {
    this.globalMaskForced.next(false);
  }

  isGlobalMaskShown = () => this.globalMaskShown.asObservable();

}
