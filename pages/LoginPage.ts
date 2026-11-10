import { Page, Locator } from '@playwright/test';

export class LoginPage {
  // Khai báo các biến và kiểu dữ liệu (TypeScript yêu cầu bước này)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly hambugerButton: Locator;
  readonly logoutButton: Locator;
  readonly adminMenu: Locator;
  readonly pimMenu: Locator;
  readonly timeMenu: Locator;
 // readonly allItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', {name: 'Login'});
    this.adminMenu=page.getByText('Admin', { exact: true });
    this.pimMenu=page.getByText('PIM', {exact: true});
    this.timeMenu=page.getByText('Time', {exact: true});

    this.hambugerButton = page.locator('.oxd-userdropdown-icon');
    this.logoutButton=page.getByText('Logout');
  

  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickAdmin()
  {
    await this.adminMenu.click();
  }
  async clickPIM()
  {
    await this.pimMenu.click();

  }
  async clickTime()
  {
    await this.timeMenu.click();

  }
  async logout()
  {
    await this.hambugerButton.click();
    await this.logoutButton.click();
  }
  /*
  async clickAllItems()
  {
    await this.hambugerButton.click();
    await this.allItems.click();

  }
    */
    
}