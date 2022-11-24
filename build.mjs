import { nwbuild } from "nw-builder";

let version="0.69.1";
let distNum=0;

let params={
    srcDir: "./src",
    cacheDir: "./.cache",
    version: version,
    flavour: "sdk"
};

switch(distNum){
    case 0:
        params.outDir="./dist/win64";
        params.platform="win";
        params.arch="x64";
        nwbuild(params);
        break;
    case 1:
        params.outDir="./dist/osx64";
        params.platform="osx";
        params.arch="x64";
        nwbuild(params);
        break;
    case 2:
        params.outDir="./dist/linux64";
        params.platform="linux";
        params.arch="x64";
        nwbuild(params);
        break;
}
