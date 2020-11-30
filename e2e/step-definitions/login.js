const { Given, When, Then } = require('cucumber');
const { env } = process;
const Page = require('../page-objects/page');

const page = new Page();

Given(/^I am on the login page$/, async () => {
    page.open('/wp-login.php')
})

When(/^I login as an admin$/, async () => {
    await page.fill_in_form([
        {field: '#user_login', value: env.LOGIN_USER},
        {field: '#user_pass', value: env.LOGIN_PASS}
    ]);
})

When(/^I login with ([^"]*) and ([^"]*)$/, async (username, password) => {
    const usernameToUse = username === "empty_string" ? "" : username
    const passwordToUse = password === "empty_string" ? "" : password
    // await page.login(usernameToUse, passwordToUse);
    // await page.login(env.LOGIN_USER, env.LOGIN_PASS);
    await page.fill_in_form([
        {field: '#user_login', value: usernameToUse},
        {field: '#user_pass', value: passwordToUse}
    ]);
})

Then(/^I should see an error message saying ([^"]*)$/, async (message) => {
    await page.exists("#login_error")
    await page.containsText('#login_error', message);
})

Then(/^I should be on the admin dashboard page$/, async() => {
    await page.exists("#wp-admin-bar-logout")
    await page.logout()
})