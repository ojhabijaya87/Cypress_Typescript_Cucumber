/// <reference types="cypress-xpath" />

import HomeIds from "../web_elements/home.ids";


class HomePage extends HomeIds{

  public selectMenu(menu: string) {
    this.menus.contains(menu).click();
  }
  public clickCreate() {
    this.create.should('be.visible').click();
  }
  public selectTheme(theme: string) {
    this.themes.select(theme);
  }
}
export const home = new HomePage();