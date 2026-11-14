import { Page, Locator } from '@playwright/test';
export class TimePage {

    readonly page: Page;
    readonly viewBtn: Locator;

    constructor(page: Page)
    { 
        this.page=page;
        this.viewBtn=page.getByRole('button', {name: 'View'}).first();


    }
    async clickView()
    {
        await this.viewBtn.click();
    }

}