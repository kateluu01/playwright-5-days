import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PIMPage } from '../pages/PIMPage';
import {AdminPage} from '../pages/AdminPage';
import {TimePage} from '../pages/TimePage';
import {RecruitmentPage} from '../pages/RecruitmentPage';


test.describe.serial('Ngày 1 - Quản lý nhân sự (PIM)', () => {
  // Set thời gian timeout để phòng trường hợp web load chậm
  test.setTimeout(60000);

  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let pimPage: PIMPage;
  let adminPage: AdminPage;
  let timePage: TimePage;
  let recruitmentPage: RecruitmentPage;

  // Đổi tên testUser thành Kate Luu giống như bạn vừa record (Thêm Date.now để không bị trùng lặp khi chạy nhiều lần)
  const testUser = {
    firstName: 'Kate',
    lastName: 'Luu' + Date.now(), 
    username: 'kateluu' + Date.now(),
    password: 'Password@123',
    test:'admin'
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    pimPage = new PIMPage(page);
    adminPage=new AdminPage(page);
    timePage= new TimePage(page);
    recruitmentPage= new RecruitmentPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    
  });
  /*

  test('Bài tập 1: Thêm mới nhân viên kèm tài khoản đăng nhập', async ({ page }) => {
    await dashboardPage.navigateToPIM();
    await pimPage.clickAddEmployee();
    await pimPage.fillEmployeeDetails(testUser.firstName, testUser.lastName);
    
    // Lưu ý: Trong video record bạn không có đoạn gạt toggle Login, 
    // Nhưng vì đề bài yêu cầu "Thêm nhân viên KÈM TÀI KHOẢN ĐĂNG NHẬP" nên mình vẫn giữ hàm này lại nhé
    await pimPage.enableLoginDetails();
    await pimPage.fillLoginDetails(testUser.username, testUser.password);
    
    await pimPage.submitForm();

    await expect(pimPage.successToast).toBeVisible({ timeout: 10000 }); 
  });

  test('Bài tập 2: Tìm kiếm và xóa nhân viên', async ({ page }) => {
    await dashboardPage.navigateToPIM();
    // Giống như record: Sau khi tạo xong, mình phải bấm vào link "Employee List" để về lại bảng danh sách
    await pimPage.employeeListTab.click();
    
    // Truyền cả họ và tên để hàm search chọn đúng dropdown
    await pimPage.searchEmployee(testUser.firstName, testUser.lastName);
    
    // Xóa nhân viên
    await pimPage.deleteFirstEmployeeInList();

    // Check thông báo xóa thành công
    await expect(pimPage.deleteSuccessToast).toBeVisible({ timeout: 10000 });
  });
*/
  test ('Exercise 3; navigate to Admin page', async({page})=> {
    await dashboardPage.navigateToAdmin();
    await adminPage.fillUserName(testUser.test);
    await adminPage.selectValueDropdownlist();
    
    await adminPage.fillEmloyeeName();
    await adminPage.selectStatusEnable();
    await adminPage.selectStatusDisable();

    await page.waitForTimeout(3000);

  });


test ('Navigate to Time page', async({page})=> {

  await dashboardPage.navigateToTime();
  await timePage.clickView();
  // await page.waitForTimeout(1000);
  });

test('Navigate to Recruitment page 01', async({page}) => {
  await dashboardPage.navigateToRecruitment();
  await recruitmentPage.clickStatusInterviewPassed();
  await recruitmentPage.clickSearch();
  
  // 1. Chờ biểu tượng loading biến mất
  await page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
  
  // 2. Ngưng 1 giây để bảng HTML thực sự vẽ xong (chống lỗi chớp DOM)
  await page.waitForTimeout(1000);
});

test('Navigate to Recruitment page', async({page})=> {
  await dashboardPage.navigateToRecruitment();
  await recruitmentPage.clickStatusRejected();
  await recruitmentPage.clickSearch();

  // 1. Chờ biểu tượng loading biến mất
  await page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
  
  // 2. Ngưng 1 giây để bảng HTML thực sự vẽ xong
  await page.waitForTimeout(1000);

  const rows = page.locator('.oxd-table-card');
  const rowCount = await rows.count();
  console.log(`Số lượng ứng viên Rejected tìm thấy: ${rowCount}`);
  
  // Chỉ đi vào vòng lặp check text nếu thực sự có dữ liệu trả về
  if (rowCount > 0) {
    for (let i = 0; i < rowCount; i++) {
      // Viết gộp locator để lấy text trực tiếp, dùng textContent()
      const statusText = await rows.nth(i).locator('.oxd-table-cell').nth(5).textContent();
      
      // Kiểm tra xem text có phải là 'Rejected' không
      expect((statusText || '').trim()).toBe('Rejected');
    }
  } else {
    console.log('Không có ứng viên nào bị Rejected để kiểm tra.');
  }
});

});