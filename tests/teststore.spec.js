const{test,expect}=require("@playwright/test")

test.beforeEach('automationstore',async({ page }) => {
     
    await page.goto("https://automationteststore.com/");
    await page.getByText("Account").first().click();
    await page.locator("#loginFrm_loginname").fill("moulidharanm");
    await page.locator("#loginFrm_password").fill("Dharan@2000");
    await page.getByRole("button",{name:'Login'}).click();
    await page.getByText("Home").last().click();        
})

test('page details',async({page})=>{
    const welcomemessage=await page.locator(".welcome_msg").textContent();
    console.log(welcomemessage);
    console.log("Page Title:"+ await page.title());
})

test('Page UI',async({page})=>{
    expect(page).toHaveURL("https://automationteststore.com/");
    console.log("Page Loaded Successfully");
    const mainsectioncount=await page.locator(".heading1").count();
    console.log("Mainsection count:"+mainsectioncount);
    const mainsectionTitle=await page.locator(".maintext").allTextContents();
    console.log("Mainsection Title:"+mainsectionTitle);
    if(mainsectioncount ===mainsectionTitle.length){
        console.log("All the main sections are present");
    }else{
        console.log("Error!")
    };
})

test('Banners check',async({page})=>{
    const shippingbanner=await page.locator(".promo_text h2").allInnerTexts();
    console.log(shippingbanner);

})

test('Category Navigation',async({page})=>{
    const arr=['APPAREL & ACCESSORIES','MAKEUP','SKINCARE','FRAGRANCE','HAIR CARE','BOOKS'];
    for(let i=0;i<arr.length;i++){
    console.log(arr[i]);
    const menuLink = page.getByRole('link', { name: arr[i]});
    await menuLink.hover();
    await page.waitForTimeout(500);
    const parentListItem = menuLink.locator('..');
    const subMenu = parentListItem.locator('.subcategories');
    const subItems = (await subMenu.allInnerTexts())
    .flatMap(txt => txt.split('\n')) // Split multiline entries
    .map(txt => txt.trim())          // Split multiline entries
    .filter(txt => txt.length > 0);   // Remove empty strings
    console.log(subItems);

    }
    
   

})