// import { ref } from 'vue';
import * as Flow from './flow.module.js';

const field_type_icons = [
    'ti ti-checkbox',       //boolean
    'ti ti-numbers',        //number
    'ti ti-alphabet-latin', //string
    'ti ti-braces',         //object
    'ti ti-list'            //array
];

export class FlowEditor {
    constructor(dom_element = 'flow', obj_vue = null) {
        Flow.Element.icons.unlink = 'ti ti-unlink';

        this.dom = null;
        this.fuid = null;
        this.objVue = obj_vue;
        this.domElement = dom_element;
        this.canvas = new Flow.Canvas();
        this.canvas.setSize(window.innerWidth, window.innerHeight);
        window.onresize = () => { this.canvas.setSize(window.innerWidth, window.innerHeight); };

        const menu = new Flow.CircleMenu();
        menu.setAlign('top left');
        menu.add(new Flow.ButtonInput()
            .setIcon('ti ti-apps')
            .setToolTip('Add a new node')
            .onClick(() => {
                console.log('floweditor: add_node');
                obj_vue.$emit('add_node', 50, 50);
            })
        );
        menu.add(new Flow.ButtonInput()
            .setIcon('ti ti-tournament')
            .setToolTip('process link rule')
            .onClick(() => {
                console.log('floweditor: submit_link_rule');
                obj_vue.$emit('submit_link_rule');
            })
        );
        menu.show();
        this.menu = menu;

        // if (obj_vue !== null && typeof obj_vue.$props.resource_path !== 'undefined') {
        //     console.log(obj_vue.$props.resource_path);
        //     {
        //         var link = document.createElement('link');
        //         link.href = obj_vue.$props.resource_path + '/fonts/open-sans/open-sans.css';
        //         link.rel = 'stylesheet';
        //         link.type = 'text/css';
        //         console.debug(link);
        //         document.head.appendChild(link);
        //     }
        //     {
        //         var link = document.createElement('link');
        //         link.href = obj_vue.$props.resource_path + '/fonts/tabler-icons/tabler-icons-filled.min.css';
        //         link.rel = 'stylesheet';
        //         link.type = 'text/css';
        //         console.debug(link);
        //         document.head.appendChild(link);
        //     }

        // }

        console.log('Constructed FlowEditor');
    }

    updateDom() {
        const dom = document.querySelector(this.domElement);
        const context_menu = new Flow.ContextMenu(dom);
        context_menu.add(new Flow.ButtonInput('Add Node').setIcon('ti ti-apps').onClick(() => {
            console.log('context Add Node @', context_menu.dom.style.left, context_menu.dom.style.top);
            this.objVue.$emit('add_node', context_menu.dom.style.left, context_menu.dom.style.top);
            context_menu.hide();
        }));

        dom.appendChild(this.canvas.dom);
        dom.appendChild(this.menu.dom);
        dom.appendChild(context_menu.dom);
        this.dom = dom;
    }

    addNode(fuid = '', name = '') {
        const node = new Flow.Node(fuid, name);
        node.add(
            new Flow.TitleElement(name).setStyle('blue').setIcon('ti ti-json')
                .addButton(new Flow.ButtonInput().setIcon('ti ti-circle-minus').onClick(() => {
                    if (confirm('Can I delete?')) this.canvas.remove(node);
                }))
                .addButton(new Flow.ButtonInput().setIcon('ti ti-playlist-add').onClick(() => {
                    console.log('floweditor: add_field -> ', node);
                    this.objVue.$emit('add_field', node);

                    //TODO: for now we directly call addField
                    this.addField(node, 'test-name-bool', 0);
                    this.addField(node, 'another long name [number]', 1);
                }))
        );
        console.log(node.dom);
        this.canvas.add(node);

        // now emit add_field signal to add the first one
        this.objVue.$emit('add_field', node);
        return node;
    }

    addNodeAt(fuid = '', name = '', x, y) {
        console.log('addNodeAt:', x, y);
        return this.addNode(fuid, name).setPosition(x, y);
    }

    addField(node, field_name = '', type = 0) {
        if (node !== null) {
            const tbttn = new Flow.ButtonInput().setIcon('ti ti-x').onClick(() => {
                if (confirm('Can I remove the field?')) node.remove(tmp);
            });
            // tbttn.dom.classList.add('auto-height');
            // tbttn.dom.classList.add('auto-width');
            // tbttn.dom.style['position'] = 'relative';
            tbttn.dom.style['width'] = 'fit-content';
            tbttn.dom.style['height'] = 'fit-content';
            tbttn.dom.style['margin-top'] = '3.25%';
            // tbttn.dom.style['padding-bottom'] = '10%';
            tbttn.dom.style['padding-left'] = '2.5%';
            console.log(tbttn.dom);
            const tmp = new Flow.LabelElement(field_name, 'left')
                .setStyle('large')
                .setRIO(1)
                .setLIO(1)
                .setIcon(field_type_icons[type])
                .add(tbttn);
            // tmp.dom.style['align-items'] = 'center';
            node.add(tmp);
            // node.dom.style['width'] = 'fit-content';
            console.log(node.dom);
            return tmp;
        }
        return null;
    }

    addField2(node, field_name = '', type = 0) {
        if (node !== null) {
            const tbttn = new Flow.ButtonInput().setIcon('ti ti-x');
            tbttn.dom.style.width = 'fit-content';
            const tmp = new Flow.TitleElement(field_name)
                .setRIO(1)
                .setLIO(1)
                .setIcon(field_type_icons[type])
                .addButton(new Flow.ButtonInput().setIcon('ti ti-x'));
            node.add(tmp);
        }
    }
};
