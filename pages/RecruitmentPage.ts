import {Page, Locator} from '@playwright/test';

export class RecruitmentPage{

    readonly page: Page;
    readonly searchBtn: Locator;
    readonly resetBtn: Locator;
    readonly selectJobTitle: Locator;
    readonly selectAccountAssistant: Locator;
    readonly selectVacancy: Locator;
    readonly selectSeniorQALead: Locator;
    readonly selectStatus: Locator;
    readonly selectStatusRejected: Locator;
    readonly selectStatusInterviewPassed: Locator;

    constructor(page: Page)
    {
        this.page=page;
        this.searchBtn=page.getByRole('button', {name: 'Search'});
        this.resetBtn=page.getByRole('button', {name: 'Reset'});
        this.selectJobTitle=page.getByText('-- Select --').first();
        this.selectAccountAssistant=page.getByRole('option',{name: 'Account Assistant'});
        this.selectVacancy=page.locator('.oxd-input-group').filter({ hasText: 'Vacancy' }).locator('.oxd-select-text');
        this.selectSeniorQALead=page.getByRole('option', {name: 'Senior QA Lead'});
        this.selectStatus=page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
        this.selectStatusRejected=page.getByRole('listbox').getByRole('option', { name: 'Rejected' });
        this.selectStatusInterviewPassed=page.getByRole('listbox').getByRole('option',{name: 'Interview Passed'});
        

    }

    async clickSearch()
    {
        await this.searchBtn.click();
    }
    async clickReset()
    {
        await this.resetBtn.click();
    }
    async clickSelectJobTitle()
    {
        await this.selectJobTitle.click();
        await this.selectAccountAssistant.click();
        
    }
    async clickVacancy()
    {
        await this.selectVacancy.click();
        await this.selectSeniorQALead.click();
    }
    async clickStatusRejected()
    {
        await this.selectStatus.click();
        await this.selectStatusRejected.click();
    }
      async clickStatusInterviewPassed()
    {
        await this.selectStatus.click();
        await this.selectStatusInterviewPassed.click();
    }

}