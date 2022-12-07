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

        this._paused=false;
    }

    async attach(){
        let page=(await this.browser.pages())[0];
        let frames=page.frames();

        let onKeyDown=key=>{
            (async ()=>{
                switch(key){
                    case "Numpad0":
                        await this._pause();
                        break;
                    case "NumpadDecimal":
                        await this._advance();
                }
            })();
        };
        try{await page.exposeFunction("onKeyDown", onKeyDown);}catch(e){}
        let parentOrigin=await page.evaluate(()=>{
            if(!window.isTasAttached){
                window.isTasAttached=true;

                addEventListener("keydown", e=>onKeyDown(e.code));
                
                let onMessage=e=>{
                    if(e.data.message==="keydown") onKeyDown(e.data.key);
                }
                addEventListener("message", onMessage, false);
            }

            return origin;
        });
        for(let i=0; i<frames.length; i++){
            await frames[i].evaluate(parentOrigin=>{
                if(!window.isTasAttached){
                    window.isTasAttached=true;

                    addEventListener("keydown", e=>{
                        parent.postMessage({
                            message: "keydown",
                            key: e.code
                        }, parentOrigin);
                    });
                }
            }, parentOrigin);
        }
    }

    async _pause(){
        let page=(await this.browser.pages())[0];
        let frames=page.frames();

        if(!this._paused){
            this._paused=true;

            let dateFunc=()=>{
                if(!window.realDateNow) window.realDateNow=Date.now;
                let old=Date.now();
                Date.now=()=>old;
            };
            let performanceFunc=()=>{
                if(!window.realPerformanceNow) window.realPerformanceNow=performance.now;
                let old=performance.now();
                performance.now=()=>old;
            };

            await page.evaluate(dateFunc);
            await page.evaluate(performanceFunc);

            frames.forEach(frame=>{
                frame.evaluate(dateFunc);
                frame.evaluate(performanceFunc);
            });
        }
        else{
            this._paused=false;

            let dateFunc=()=>{
                let offset=Date.now()-window.realDateNow.call(Date);
                Date.now=()=>window.realDateNow.call(Date)+offset;
            };
            let performanceFunc=()=>{
                let offset=performance.now()-window.realPerformanceNow.call(performance);
                performance.now=()=>window.realPerformanceNow.call(performance)+offset;
            };

            await page.evaluate(dateFunc);
            await page.evaluate(performanceFunc);

            frames.forEach(frame=>{
                frame.evaluate(dateFunc);
                frame.evaluate(performanceFunc);
            });
        }
    }

    async _advance(){
        if(this._paused){
            let page=(await this.browser.pages())[0];
            let frames=page.frames();

            let dateFunc=()=>{
                let offset=Date.now()+1000/60;
                Date.now=()=>offset;
            };
            let performanceFunc=()=>{
                let offset=performance.now()+1000/60;
                performance.now=()=>offset;
            };

            await page.evaluate(dateFunc);
            await page.evaluate(performanceFunc);

            frames.forEach(frame=>{
                frame.evaluate(dateFunc);
                frame.evaluate(performanceFunc);
            });
        }
    }
}
module.exports=new BrowserController();
