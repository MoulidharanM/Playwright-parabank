const{test,expect,chromium}=require('@playwright/test')

test('qaplayground_verifyaccount',async()=>{

    const browser=await chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://qaplayground.dev/apps/verify-account/");
    const box=page.locator(".code-container");
    const input=box.getByPlaceholder("0");
    const count=await input.count();
    console.log(count);
    for(let i=0;i<count;i++){
    await input.nth(i).fill("9");
    if (i === count - 1) {
    await input.nth(i).press('Enter');
    }
    }
    
    await page.waitForSelector(".info.success");
    await expect(page.getByText("Success")).toHaveText("Success");
    
    await context.close();
    await browser.close();

}
)

test('qaplayground_multileveldropdown',async({page})=>{

    await page.goto("https://qaplayground.dev/apps/multi-level-dropdown/#home");
    const drop=page.locator(".nav-item");
    await drop.nth(3).click();

    //click settings dropdown:

    await page.getByText("Settings").click();
    await expect(page).toHaveURL("https://qaplayground.dev/apps/multi-level-dropdown/#settings");
    const settingslist=await page.locator(".menu-item").allTextContents();
    //console.log(settingslist);
    await page.getByText("My Tutorial").click();
    await expect(page).toHaveURL("https://qaplayground.dev/apps/multi-level-dropdown/#main");
    await page.getByText("Animals").click();
    await expect(page).toHaveURL("https://qaplayground.dev/apps/multi-level-dropdown/#animals");
    await page.locator(".icon-button").nth(4).click();
    page.locator(".nav-item").nth(3).click();
    await page.waitForTimeout(5000);
})

test.only("qaplayground_dynamictable",async({page})=>{
    await page.goto("https://qaplayground.dev/apps/dynamic-table/");
    const namelocate=page.locator(".ml-4");
    const count=await namelocate.count();
    console.log(count);
    for(let i=0;i<count;i++){
        let crctname=page.locator(".font-medium").nth(i);
        const text=await crctname.textContent();
        if(text === "Spider-Man"){
            const realname=page.locator(".font-medium").nth(i+1);
            console.log(await realname.textContent());

        }
    }
})