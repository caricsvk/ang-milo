import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { LoadingMaskService } from '../../core/loading-mask.service';
import { MgHttpInterceptor } from '../../http.interceptor';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
  ConfirmationDialogOnCloseResult
} from '../confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs/Subject';
import { LoadingMaskComponent } from './loading-mask.component';

@Component({
  selector: 'mg-loading-mask-global',
  templateUrl: './loading-mask.component.html',
  styleUrls: ['./loading-mask.component.scss']
})
export class LoadingMaskGlobalComponent extends LoadingMaskComponent implements OnInit, OnDestroy {

  private static isGlobalMaskInitialized = false;

  isGlobal = true;
  isMaskShown = false;

  constructor(
    elementRef: ElementRef,
    loadingMaskService: LoadingMaskService
  ) {
    super(elementRef, loadingMaskService);
  }

  ngOnInit() {
    if (LoadingMaskGlobalComponent.isGlobalMaskInitialized) {
      throw new Error('Global mask was already initialized, use mask local mask ,' +
        ' or use LoadingMaskService to adjust behaviour');
    }
    LoadingMaskGlobalComponent.isGlobalMaskInitialized = true;

    this.loadingMaskService.isGlobalMaskShown().subscribe(isMaskShown => this.isMaskShown = isMaskShown);
  }

}
