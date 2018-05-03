def make_data_url(filename):
    import base64
    import mimetypes
    with open(filename, 'rb') as f:
        return "data:{};base64,{}".format(mimetypes.guess_type(filename)[0], base64.b64encode(f.read()).decode('ascii'))
    
def make_vis_spec(dataframe):
    import json
    return {
    "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
    "layer": [
        {
            "description": "Conversation timeline",
            "data": {
                "values": json.loads(dataframe.to_json(orient='records'))
            },
            "mark": "bar",
            "encoding": {
                "y": {
                    "field": "ID",
                    "type": "nominal"
                },
                "x": {
                    "field": "Start",
                    "type": "quantitative"
                },
                "x2": {
                    "field": "End",
                    "type": "quantitative"
                },
                "color": {
                    "field": "Gender",
                    "type": "nominal",
                    "scale": {
                        "domain": [
                            "F",
                            "M"
                        ],
                        "range": [
                            "#ff99ff",
                            "#4169e1"
                        ]
                    }
                }
            }
        },
        {
            "description": "Tape head",
            "data": {
                "name": "timeposDataSource",
            },
            "mark": "rule",
            "encoding": {
                "x": {
                    "field": "timepos",
                    "type": "quantitative"
                },
                "size": {
                    "value": 2
                },
                "color": {
                    "value": "#22aa12"
                }
            }
        }
    ]
}

def interactive_conversation(soundfile_path, dataframe):
    from IPython.display import display
    bundle_contents = {
        "audio_data": make_data_url(soundfile_path),
        "vis_spec": make_vis_spec(dataframe)
    }
    bundle = {"application/vnd.speads+json": bundle_contents}
    display(bundle, raw=True)
