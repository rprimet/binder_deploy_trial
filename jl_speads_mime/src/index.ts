import {
  IRenderMime
} from '@jupyterlab/rendermime-interfaces';

import {
  Widget
} from '@phosphor/widgets';

import embed from 'vega-embed';

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'application/vnd.speads+json';


/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'jp-OutputWidgetJSON';


/**
 * A widget for rendering JSON.
 */
export
class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
    this._plot = document.createElement('div');
    this.node.appendChild(this._plot);
    this._audio = document.createElement('audio');
    this._audio.controls = true;
    this.node.appendChild(this._audio);
  }

  /**
   * Render JSON into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    let data:any = model.data[this._mimeType];
    embed(this._plot, data['vis_spec'], {"actions": false, "width": 800, "height": 600})
    .then((viewSpec) => {
      let view = viewSpec.view as any; //typescript typings missing insert/remove ?
      view.insert("timeposDataSource", [{"timepos": 0}]).run();
      this._audio.ontimeupdate = () => {
        view.remove("timeposDataSource", () => true).run();
        view.insert("timeposDataSource", [{"timepos": this._audio.currentTime}]).run();
      }

    });
    this._audio.src = data['audio_data'];
    return Promise.resolve(void 0);
  }

  private _mimeType: string;
  private _plot: HTMLElement;
  private _audio: HTMLAudioElement;
}


/**
 * A mime renderer factory for JSON data.
 */
export
const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};


const extension: IRenderMime.IExtension = {
  id: 'jl_speads_mime:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'string'
};

export default extension;

