'use strict';
const assert = require('node:assert/strict');
const http = require('node:http');
const { chromium } = require('playwright');

const origin = 'http://127.0.0.1:4321';
const routes = ['/', '/getBestRoute/', '/getBestTunnel/', '/getPathTo/',
  '/getPathToPose/', '/outside/', '/svg/'];
const sizes = [
  [320,568],[360,800],[390,844],[430,932],[844,390],[600,960],
  [768,1024],[820,1180],[1180,820],[1280,800],[1366,768],
  [1440,900],[1920,1080],[2560,1440],[3840,2160],[4096,2160],
];
async function online() {
  for(let i=0;i<40;i++) {
    const ok = await new Promise(resolve => {
      const req=http.get(origin, res=>{res.resume();resolve(res.statusCode === 200)});
      req.once('error',()=>resolve(false));
    });
    if(ok)return;
    await new Promise(resolve=>setTimeout(resolve,500));
  }
  throw new Error('servidor demo nao iniciou');
}
async function run() {
  await online();
  const browser=await chromium.launch({headless:true});
  const failures=[];
  try {
    for(const [width,height] of sizes) {
      const context=await browser.newContext({viewport:{width,height}, reducedMotion:'reduce'});
      await context.route('**/*',route=>{
        const url=new URL(route.request().url());
        return url.origin===origin ? route.continue() : route.abort();
      });
      const page=await context.newPage();
      for(const route of routes) {
        try {
          const res=await page.goto(origin+route.slice(1),{waitUntil:'domcontentloaded'});
          assert.equal(res?.status(),200,'rota inexistente: '+route);
          assert.equal(await page.locator('html body').count(),1);
          await page.waitForTimeout(100);
          const size=await page.evaluate(()=>({
            page:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),
            window:innerWidth,
          }));
          assert.ok(size.page<=size.window+2,JSON.stringify(size));
        }catch(e){failures.push(width+'x'+height+' '+route+' '+e.message)}
      }
      await context.close();
    }
  }finally{await browser.close()}
  assert.equal(failures.length,0,failures.join('\n'));
  console.log('OK '+sizes.length*routes.length+' demos responsivas');
}
run().catch(e=>{console.error(e);process.exitCode=1});
