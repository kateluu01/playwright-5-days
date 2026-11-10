import { Page, Locator } from '@playwright/test';

export class AdminPage {
  // Khai báo các biến và kiểu dữ liệu (TypeScript yêu cầu bước này)
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly selectRole: Locator;
  readonly selectRole01: Locator;
  readonly inputEmployeeName: Locator;
  readonly selectStatus: Locator;
  readonly selectEnable: Locator;
  readonly clickSearch: Locator;
  readonly selectDisable: Locator;


 // readonly allItems: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.usernameInput =page.getByRole('textbox').nth(1);
    this.selectRole=page.getByText('-- Select --').first();
    this.selectRole01=page.getByRole('option', { name: 'Admin' });
    this.inputEmployeeName=page.getByRole('textbox',{name:'Type for hints...'  });
   /* this.selectStatus=page.getByText('--Select--').nth(1);*/
    this.selectStatus = page.locator('.oxd-input-group')
                           .filter({ hasText: 'Status' })
                           .locator('.oxd-select-text');
    this.selectEnable=page.getByRole('option',{name:'Enabled'});

    this.clickSearch=page.getByRole('button', {name: 'Search'});

    this.selectDisable=page.getByRole('option', {name:'Disabled'});

  }

  async goto() {
    await this.page.goto('/');
  }

  async fillUserName(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  
  }
  async selectValueDropdownlist(){
    await this.selectRole.click();
    await this.selectRole01.click();
       
  }
  async fillEmloyeeName()
  {
  //  await this.inputEmployeeName.click();
   // await this.inputEmployeeName.fill('Luke Ackerman');
  
    
  }

  async selectStatusEnable()
  {
     await this.selectStatus.click();
    await this.selectEnable.click();
    

  }

    async selectStatusDisable()
  {
  await this.selectStatus.click();
  await this.selectDisable.click();


  }

  async clickSearchbtn()
  {
      await this.clickSearch.click();

  }

  async logout()
  {
  
  }
  /*
  async clickAllItems()
  {
    await this.hambugerButton.click();
    await this.allItems.click();

  }
    */
    
}