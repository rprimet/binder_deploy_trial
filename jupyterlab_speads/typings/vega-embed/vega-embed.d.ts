declare module 'vega-embed' {
    //function embed(el: any, opt: any, callback: any): any;
    function embed(el: any, spec: any, opt: any): Promise<void>;
    export = embed;
}
