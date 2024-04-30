import os
from nicegui import ui, events
from nicegui.element import Element

import nicegui.dependencies

# import asyncio

os.environ.update({'MATPLOTLIB': 'false'})

class NodeEditor(Element, component='NodeEditor.js'):#, exposed_libraries=['./flow/FlowEditor.js']):
    """Initialize NodeEditor."""
    def __init__(self):
        super(NodeEditor, self).__init__()
        self.add_resource('flow')
        self.on('add_node', self.insert_node)

    def insert_node(self, e:events.GenericEventArguments):
        print(e)
        self.run_method('node_add_at', 'node-1', e.args[0], e.args[1])

    def create_n1(self):
        self.run_method('create_n1')

# ui.add_css("flow.css")
# TODO: fix accessing font woff2
# ui.add_css("fonts/open-sans/open-sans.css")
# ui.add_css("fonts/tabler-icons/tabler-icons.css")

objFlow = NodeEditor()
print(objFlow._props)
print(nicegui.dependencies.resources)

    # <link rel="stylesheet" href="{objFlow._props["resource_path"]}/flow.css" type="text/css"/>
# ui.add_head_html(f'''
#     <link rel="stylesheet" href="{objFlow._props["resource_path"]}/fonts/open-sans/open-sans.css" type="text/css"/>
#     <link rel="stylesheet" href="{objFlow._props["resource_path"]}/fonts/tabler-icons/tabler-icons.css" type="text/css"/>
# ''')

# ui.timer(2.0, objFlow.create_n1, once=True)
# ui.timer(2.0, lambda: objFlow.run_method('create_n2'), once=True)

ui.run(host='127.0.0.1', viewport="width=device-width, initial-scale=1, user-scalable=no", dark=True, uvicorn_logging_level='info', show=False, reload=True, uvicorn_reload_includes='*.js')
