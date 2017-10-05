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
     vgEmbed.innerHTML = "<i>Placeholder</i> -- conversation plot";
     this.node.appendChild(vgEmbed);
     let audio = document.createElement('audio');
     this.node.appendChild(audio);
  }

  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    let data = model.data[SPEADS_MIME_TYPE];
    console.log("speads data", data);

    return Promise.resolve(undefined);
  }
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
