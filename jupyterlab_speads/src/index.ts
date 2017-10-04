import {
  JupyterLabPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_speads extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_speads',
  autoStart: true,
  activate: (app) => {
    console.log('JupyterLab extension jupyterlab_speads is activated!');
  }
};

export default extension;
