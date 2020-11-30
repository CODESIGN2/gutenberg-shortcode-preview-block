class Page {
    open(path) {
        return browser.url(path)
    }

    refresh() {
        return browser.refresh()
    }

    // async login(username, password) {
    //     await (await $('#user_login')).setValue(username)
    //     await (await $('#user_pass')).setValue(password)
    //     await (await $('[type="submit"]')).click()
    // }

    async fill_in_form(fields) {
        await Promise.all(
            fields.map(async (fieldData) => {
                const {field, value, options} = fieldData;
                await (await $(field)).setValue(value, options);
            })
        );
        await this.click('[type="submit"]')
    }

    async click(selector) {
        await (await $(selector)).click()
    }

    async exists(selector) {
        return await expect(await $(selector)).toExist()
    }

    async containsText(selector, text) {
        return await expect(await $(selector)).toHaveTextContaining(text)
    }

    async logout() {
        this.open('/wp-login.php?action=logout')
        await this.click('a')
    }
}

module.exports = Page;