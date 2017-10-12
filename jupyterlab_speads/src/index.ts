import {
  Widget
} from '@phosphor/widgets';

import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

//import embed = require('vega-embed');
import {compile} from 'vega-lite';
import {View, parse} from 'vega';

export
const SPEADS_MIME_TYPE = 'application/vnd.speads+json';

const SPEADS_CLASS = 'jp-RenderedSpeads';

export
class RenderedSpeads extends Widget implements IRenderMime.IRenderer {
 
  constructor(options: IRenderMime.IRendererOptions) {
     super();

     this.addClass(SPEADS_CLASS);
     this._vgEmbed = document.createElement('div');
     this._vgEmbed.innerHTML = '<i>Placeholder</i> -- conversation plot';
     this.node.appendChild(this._vgEmbed);
     this._audio = document.createElement('audio');
     this._audio.controls = true;
     this.node.appendChild(this._audio);

     //set up update callback: audio position -> plot position
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    let data:any = model.data[SPEADS_MIME_TYPE]; 
    console.log("speads data", data);
    this._audio.src = data['audio_data'];

    var vgSpec = compile(data['vis_spec']);
    console.log("compiled spec", vgSpec);

    let view = new View(parse(vgSpec))
    .renderer('svg')
    .initialize(this._vgEmbed)
    .width(600)
    .height(300)
    .run();

    console.log("view", view);

    return Promise.resolve(undefined);

   // return embed(this._vgEmbed, data['vis_spec'], {/*'mode': 'vega-lite',*/ 'onBeforeParse': (spec:any) => {console.log('before parse!'); console.log("spec", spec); return spec;}, 'renderer': 'svg', 'logLevel': 'vega.Debug'});
  }

  _audio: HTMLAudioElement;
  _vgEmbed: HTMLElement;
}

export
const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [SPEADS_MIME_TYPE],
  createRenderer: options => new RenderedSpeads(options)
};

const extension: IRenderMime.IExtension = {
  name: 'speads',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  documentWidgetFactoryOptions: [{
    name: 'Spads',
    modelName: 'text',
    primaryFileType: 'speads',
    fileTypes: ['speads', 'json'],
    defaultFor: ['speads']
  }],
  fileTypes: [{
    mimeTypes: [SPEADS_MIME_TYPE],
    name: 'speads',
    fileFormat: 'text',
    extensions: ['.speads', '.speads.json'],
    iconClass: 'jp-MaterialIcon jp-VegaIcon',
  }]
};

export default extension;
