import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('emoji-smiling-face', this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/emoji-smiling-face.svg"));
    this.matIconRegistry.addSvgIcon('call', this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/call.svg"));
    this.matIconRegistry.addSvgIcon('line-chart', this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/line-chart.svg"));
    this.matIconRegistry.addSvgIcon('settings', this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/settings.svg"));
    this.matIconRegistry.addSvgIcon('user', this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/user.svg"));
  }
  
  title = 'lhyfe-portail';

  public async ngOnInit() {
  }

}
