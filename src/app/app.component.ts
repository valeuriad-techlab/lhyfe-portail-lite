import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LhyfeNavbarLink, LhyfeNavLink } from 'projects/lhyfe-components/src/public-api';

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

  navBarLinks: LhyfeNavbarLink[] = [
    {
      url: '/dashboard',
      icon: "line-chart",
      label: $localize `Dashboard`
    },
    {
      url: '/user-account',
      icon: "user",
      label: $localize `Profil`,
      hidden: true
    },
    {
      url: '/settings',
      icon: "settings",
      label: $localize `Parameters`,
      hidden: true
    },
    {
      url: '/contact',
      icon: "call",
      label: $localize `Contact`,
      hidden: true
    }
  ];

  navLinks: LhyfeNavLink[] = [
    {
      url: '/dashboard',
      icon: "line-chart"
    },
    {
      url: '/user-account',
      icon: "user",
      hidden: true
    },
    {
      url: '/settings',
      icon: "settings",
      hidden: true
    },
    {
      url: '/contact',
      icon: "call",
      hidden: true
    }
  ];

  public async ngOnInit() {
  }

}
