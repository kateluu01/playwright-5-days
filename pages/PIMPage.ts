import { Page, Locator } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  
  readonly addButton: Locator;
  readonly employeeListTab: Locator; // Thêm tab Employee List theo record
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly createLoginToggle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveButton: Locator;
  readonly employeeNameSearchInput: Locator;
  readonly searchButton: Locator;
  readonly deleteIcon: Locator;
  readonly confirmDeleteButton: Locator;
  readonly deleteSuccessToast: Locator;
  readonly successToast: Locator;
  readonly employeeIdInput: Locator; // THÊM DÒNG NÀY

  constructor(page: Page) {
    this.page = page;
    
    // Locators phần Add
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.employeeListTab = page.getByRole('link', { name: 'Employee List' }); // Bấm sang tab List giống record
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' }); // Dùng locator mới từ record
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    
    this.createLoginToggle = page.locator('.oxd-switch-wrapper');
    this.usernameInput = page.locator('xpath=//label[normalize-space()="Username"]/../following-sibling::div//input');
    this.passwordInput = page.locator('xpath=//label[normalize-space()="Password"]/../following-sibling::div//input');
    this.confirmPasswordInput = page.locator('xpath=//label[normalize-space()="Confirm Password"]/../following-sibling::div//input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    // Sửa dòng this.successToast = page.getByText(...) thành dòng này:
   this.successToast = page.getByText('Successfully Saved');

    // Locators phần Search & Delete
    this.employeeNameSearchInput = page.getByPlaceholder('Type for hints...').first();
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    
    // Giữ nguyên class thùng rác vì .nth(4) của record rất dễ sai nếu số lượng cột thay đổi
    this.deleteIcon = page.locator('.oxd-icon.bi-trash').first(); 
    
    // Dùng regex /Yes, Delete/ để bỏ qua cái icon rác () đằng trước chữ trong record
    this.confirmDeleteButton = page.getByRole('button', { name: /Yes, Delete/ }); 
    this.deleteSuccessToast = page.getByText('Successfully Deleted');
    this.employeeIdInput = page.locator('xpath=//label[normalize-space()="Employee Id"]/../following-sibling::div//input');
  }

  async clickAddEmployee() {
    await this.addButton.click();
  }

  async fillEmployeeDetails(firstName: string, lastName: string) {
   await this.firstNameInput.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);

    // THÊM ĐOẠN NÀY ĐỂ XỬ LÝ TRÙNG ID:
    // Tạo 1 chuỗi số ID ngẫu nhiên (ví dụ: 123456)
    const uniqueEmpId = Date.now().toString().slice(-6); 
    
    // Fill thẳng vào ô Employee Id, Playwright sẽ tự động xóa ID cũ đi
    await this.employeeIdInput.click();
    await this.employeeIdInput.fill(uniqueEmpId);
  }

  async enableLoginDetails() {
    await this.createLoginToggle.click({ force: true }); 
    await this.usernameInput.waitFor({ state: 'visible', timeout: 5000 });
  }

  async fillLoginDetails(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.confirmPasswordInput.fill(pass);

    // Ép WebKit hiểu rằng mình đã nhập xong bằng cách gỡ con trỏ (blur)
    await this.confirmPasswordInput.blur();
  }

  async submitForm() { 
  await this.page.waitForTimeout(2000); 
    
    // Cuộn chuột đến nút Save (để chắc chắn nó nằm trên màn hình)
    await this.saveButton.scrollIntoViewIfNeeded();
    
    // Click bình thường, KHÔNG dùng force: true nữa
    await this.saveButton.click();
  }

  // Cập nhật lại hàm search xịn hơn dựa trên đoạn code record của bạn!
  async searchEmployee(firstName: string, lastName: string) {
    await this.employeeNameSearchInput.click();
    await this.employeeNameSearchInput.fill(firstName);
    
    // Đợi dropdown xổ ra và click đúng vào tên (Cách này ổn định hơn bấm mũi tên)
    const fullName = `${firstName} ${lastName}`;
    await this.page.getByRole('option', { name: fullName }).click();
    
    await this.searchButton.click();
    
    // Chờ loading xoay xong
    await this.page.waitForSelector('.oxd-loading-spinner', { state: 'detached' });
    await this.page.waitForTimeout(1000); 
  }

  async deleteFirstEmployeeInList() {
    await this.deleteIcon.click();
    await this.confirmDeleteButton.click();
  }
}