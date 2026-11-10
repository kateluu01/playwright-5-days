import {Page, Locator} from '@playwright/test';
export class DashboardPage
{
    readonly page: Page;
    readonly adminMenu: Locator;
    readonly pimMenu: Locator;
    readonly leaveMenu: Locator;
    readonly topbarHeader: Locator;
    readonly timeMenu: Locator;
    readonly recruitmentMenu: Locator;


    constructor(page: Page)
    {
        this.page=page;
        this.adminMenu=page.getByRole('link', {name: 'Admin'});
        this.pimMenu=page.getByRole('link', {name: 'PIM'});
        this.leaveMenu=page.getByRole('link',{name: 'Leave'});
        this.timeMenu=page.getByRole('link', {name: 'Time'});
        this.topbarHeader = page.locator('.oxd-topbar-header-breadcrumb-module');
        this.recruitmentMenu=page.getByRole('link',{name:'Recruitment'});
     
    }

    async navigateToAdmin()
    {
        await this.adminMenu.click();
    }
    async navigateToPIM()
    {
        await this.pimMenu.click();
    }
    async navigateToLeave()
    {
        await this.leaveMenu.click();
    }
    async navigateToTime()
    {
        await this.timeMenu.click();
    }
    async navigateToRecruitment()
    {
        await this.recruitmentMenu.click();
    }

}