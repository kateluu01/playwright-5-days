import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import users from '../test-data/user.json';

test.describe('Test Menu Navigation', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('Kiểm tra điều hướng tới menu Admin', async ({ page }) => {
    await dashboardPage.navigateToAdmin();
    await expect(page).toHaveURL(/.*admin/);
    await expect(dashboardPage.topbarHeader).toContainText('Admin');
  });

  test('Kiểm tra điều hướng tới menu PIM', async ({ page }) => {
    await dashboardPage.navigateToPIM();
    await expect(page).toHaveURL(/.*pim/);
    await expect(dashboardPage.topbarHeader).toContainText('PIM');
  });

    test('Kiểm tra điều hướng tới menu TIME', async ({ page }) => {
    await dashboardPage.navigateToTime();
    await expect(page).toHaveURL(/.*Time/);
    await expect(dashboardPage.topbarHeader).toContainText('Time');
  });
  test('Kiểm tra điều hướng tới menu Leave', async ({ page }) => {
    await dashboardPage.navigateToLeave();
    await expect(page).toHaveURL(/.*leave/);
    await expect(dashboardPage.topbarHeader).toContainText('Leave');
  });
});