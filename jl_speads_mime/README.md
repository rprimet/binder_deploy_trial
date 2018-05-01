# jl_speads_mime

A JupyterLab MIME renderer extension.


## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install jl_speads_mime
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

