let puppeteer=require("puppeteer");

class BrowserController{
    constructor(){
        this.init();
    }

    async init(){
        this.browser=await puppeteer.launch({
            headless: false,
            devtools: false
        });

    }

    async attach(){
        let page=(await this.browser.pages())[0];
        //let frame=page.frames()[0];
        await page.evaluate(()=>{
            document.title = 'New Title';
        });
        /*
        page.evaluate(()=>{
            let old=performance.now;
            performance.now=()=>old.call(performance)*.1;
        });
        */
        /*
        frame.evaluate(()=>{
            console.log("hello");
        });
        */
    }
}
module.exports=new BrowserController();
