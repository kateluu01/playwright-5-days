import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../test-data/user.json'; // Import data

test.describe('Test Login Flow', () => {
  let loginPage: LoginPage;

  // beforeEach sẽ chạy TRƯỚC MỖI test case trong block describe này
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Đăng nhập thành công', async ({ page }) => {
    // Dùng data từ file JSON thay vì gõ chữ trực tiếp
    await loginPage.login(users.validUser.username, users.validUser.password);
    
    //await expect(page).toHaveURL(/.*inventory/);
   await loginPage.logout();
  });

  test('Navigate to Admin menu', async({page}) =>{
    await loginPage.login(users.validUser.username, users.validUser.password);
    await loginPage.clickAdmin();
    await loginPage.clickPIM();
    await loginPage.clickTime();
    await loginPage.logout();
  }
)
/*
  test('Đăng nhập thất bại với user bị khóa', async ({ page }) => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    // Đoạn này bạn có thể expect câu báo lỗi hiển thị trên UI
  });

  test('Navigate to All items', async({page})=> {
    await loginPage.clickAllItems();
  })
    */
});