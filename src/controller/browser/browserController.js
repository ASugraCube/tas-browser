let puppeteer=require("puppeteer");

class BrowserController{
    constructor(){
        this.init();
    }

    async init(){
        this.browser=await puppeteer.launch({
            headless: false,
            devtools: false,
            defaultViewport: null,
            args:[
                "--disable-background-timer-throttling",
                "--disable-backgrounding-occluded-windows",
                "--disable-renderer-backgrounding"
            ]
        });
    }

    async attach(){
        let page=(await this.browser.pages())[0];
        let frames=(await page.$$("iframe"));
        for(let i=0; i<frames.length; i++){
            frames[i]=await frames[i].contentFrame();
        }
        
        //evaluate not awaited
        page.evaluate(()=>{
            let old=performance.now;
            performance.now=()=>old.call(performance)*.1;
        });
        frames.forEach(frame=>{
            frame.evaluate(()=>{
                let old=performance.now;
                performance.now=()=>old.call(performance)*.1;
            });
        });

        await page.exposeFunction("onKeyDown", key=>{
            alert(key);
        });
        await page.evaluate(()=>{
            window.addEventListener("keydown", e=>onKeyDown(e.code));
        });
    }
}
module.exports=new BrowserController();
