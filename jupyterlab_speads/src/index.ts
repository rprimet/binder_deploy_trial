import {
  Widget
} from '@phosphor/widgets';

import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

export
const SPEADS_MIME_TYPE = 'application/vnd.speads+json';

const SPEADS_CLASS = 'jp-RenderedSpeads';

export
class RenderedSpeads extends Widget implements IRenderMime.IRenderer {
 
  constructor(options: IRenderMime.IRendererOptions) {
     super();

     this.addClass(SPEADS_CLASS);
     let vgEmbed = document.createElement('div');
     vgEmbed.innerHTML = '<i>Placeholder</i> -- conversation plot';
     this.node.appendChild(vgEmbed);
     this._audio = document.createElement('audio');
     this._audio.controls = true;
     this.node.appendChild(this._audio);
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    let data:any = model.data[SPEADS_MIME_TYPE]; //TODO change typing
    console.log("speads data", data);
    this._audio.src = data['audio_data'];

    return Promise.resolve(undefined);
  }

  _audio: HTMLAudioElement;
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
