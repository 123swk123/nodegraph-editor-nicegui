
const isNiceGui = true;
let modFlowEditor;

if (!isNiceGui) {
    console.log('importing for npm env');
    modFlowEditor = await import('./flow/FlowEditor.js');
    // await import('./flow/fonts/open-sans/open-sans.css');
    // await import('./flow/fonts/tabler-icons/tabler-icons.min.css');
} else {
    console.log('importing for nicegui env');

    // const elmFlow = document.querySelector('flow');
    // console.log(elmFlow);
    // const attrResPath = elmFlow.getAttribute('resource_path');
    const attrResPath = '../../resources/3b21278178ed3463f3bde3a35f088caf';

    modFlowEditor = await import(attrResPath + '/FlowEditor.js');
    // await import(attrResPath + '/fonts/open-sans/open-sans.css');
    // await import(attrResPath + '/fonts/tabler-icons/tabler-icons.min.css');
}

// import { FlowEditor } from "FlowEditor";
// import './fonts/open-sans/open-sans.css';
// import './fonts/tabler-icons/tabler-icons.min.css';

// import { FlowEditor } from "./flow/FlowEditor.js";
// import './flow/fonts/open-sans/open-sans.css';
// import './flow/fonts/tabler-icons/tabler-icons.min.css';

export default {
    name: 'NodeEditor',

    template: `
    <div>
        <flow></flow>
    </div>
    `,

    emits: ['add_node', 'add_field', 'submit_link_rule', 'notify'],

    created() {
        var canExit = false;
        console.log('node-editor created callback!');
        console.log(this.$props, this.$props.resource_path);

        // while (canExit === false) {
        //     console.log('waiting....');
        // }

        {
            var link = document.createElement('link');
            link.href = this.$props.resource_path + '/fonts/open-sans/open-sans.css';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            console.debug(link);
            document.head.appendChild(link);
        }
        {
            var link = document.createElement('link');
            link.href = this.$props.resource_path + '/fonts/tabler-icons/tabler-icons.min.css';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            console.debug(link);
            document.head.appendChild(link);
        }
    },

    mounted() {
        // const node_editor = new modFlowEditor.FlowEditor('flow', this);
        // this.node_editor = node_editor;
        // this.$data.then((v) => v.node_editor.updateDom());
        this.node_editor.updateDom();
    },

    data() {
        console.log('node-editor data callback!');

        if (typeof this.$props.resource_path === 'undefined') {
            this.$props.resource_path = './flow';
        }

        // if (typeof this.$props.resource_path !== 'undefined') {
        //     import(/* @vite-ignore */this.$props.resource_path + '/FlowEditor.js').then((module) => {
        //         modFlowEditor = module;
        //         console.log('import succeeded!');
        //         return {
        //             node_editor: new modFlowEditor.FlowEditor('flow', this)
        //         }
        //     }).catch((err) => {
        //         console.log(err);
        //         return {
        //             node_editor: null
        //         }
        //     });
        // } else {
        // }
        return {
            node_editor: new modFlowEditor.FlowEditor('flow', this)
        }
    },

    methods: {
        node_add(title) {
            console.log('Adding new node -> ', title);
            this.node_editor.addNode('1234', title);
        },

        node_add_at(title, x, y) {
            console.log('Adding new node @ ', title, x, y);
            this.node_editor.addNodeAt('ab1cef', title, x, y);
        },

        field_add(node, name) {
            console.log('Adding field -> ', node, name);
            this.node_editor.addField(node, name);
        }
    },

    props: {
        resource_path: String
    }
};