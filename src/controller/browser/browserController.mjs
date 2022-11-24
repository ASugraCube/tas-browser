let puppeteer=require("puppeteer");

class BrowserController{
    constructor(){
        this.init();
    }

    init(){
        this.browser=puppeteer.launch({
            headless: false,
            devtools: false
        });
    }
}
export default new BrowserController();
