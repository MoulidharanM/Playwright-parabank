const{test,expect}=require('@playwright/test');


    const firstname="cus";
    const lastname="12";
    const userlogin = `cus${Date.now()}`;
    const pss="Cus05@2025";
    
test.beforeEach('User Registration',async({page})=>{
    await page.goto("https://parabank.parasoft.com/");
    const title=await page.title();
    console.log(title.split(" ")[0]);
    await page.getByRole('link',{name:"Register"}).click();
    await page.locator("#customer\\.firstName").fill(firstname);
    await page.locator("#customer\\.lastName").fill(lastname);
    await page.locator("#customer\\.address\\.street").fill("adddress");
    await page.locator("#customer\\.address\\.city").fill("Chennai");
    await page.locator("#customer\\.address\\.state").fill("Tamilnadu");
    await page.locator("#customer\\.address\\.zipCode").fill("600096");
    await page.locator("#customer\\.phoneNumber").fill("1234567890");
    await page.locator("#customer\\.ssn").fill("00112233");
    await page.locator("#customer\\.username").fill(userlogin);
    await page.locator("#customer\\.password").fill(pss);
    await page.locator("#repeatedPassword").fill(pss);
    await page.locator("//input[@value='Register']").click();
    expect(page.locator("div[id='rightPanel'] h1")).toHaveText("Welcome"+" "+userlogin);
    expect(page.locator("div[id='rightPanel'] p")).toHaveText("Your account was created successfully. You are now logged in.");
    expect(page.locator(".smallText")).toHaveText("Welcome"+" "+firstname+" "+lastname);
    
})

test('Bill Pay',async({page})=>{
    await page.getByText('Bill Pay', { exact: true }).click();
    await page.locator("input[name='payee\\.name']").fill("mohan");
    await page.locator("input[name='payee\\.address\\.street']").fill("address");
    await page.locator("input[name='payee\\.address\\.city']").fill("Chennai");
    await page.locator("input[name='payee\\.address\\.state']").fill("Tamilnadu");
    await page.locator("input[name='payee\\.address\\.zipCode']").fill("600096");
    await page.locator("input[name='payee\\.phoneNumber']").fill("6547891230");
    await page.locator("input[name='payee\\.accountNumber']").fill("654789123000");
    await page.locator("input[name='verifyAccount']").fill("654789123000");
    await page.locator("input[name='amount']").fill("2000");
    //await page.locator("input[name='fromAccountId']").selectOption("13566");
    await page.locator("input[value='Send Payment']").click();


})

test.afterEach('Logout',async({page})=>{
    await page.getByText('Log Out', { exact: true }).click();

})