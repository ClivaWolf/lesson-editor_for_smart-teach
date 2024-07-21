import {Node} from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ReactComponentView from './ReactComponentView'

export default Node.create({
    name: 'reactComponent',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            content: {
                default: '{}',
                parseHTML: element => {
                    const jsonString = element.getAttribute('data-content')
                    let content = {}
                    try {
                        content = JSON.parse(jsonString)
                    } catch (error) {
                        console.error('Failed to parse JSON', error)
                    }
                    return content
                },
                renderHTML: attributes => {
                    return {'data-content': JSON.stringify(attributes.content)}
                },
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'react-component',
            },
        ]
    },

    renderHTML({HTMLAttributes}) {
        return ['react-component', {'data-content': JSON.stringify(HTMLAttributes.content)}]
    },

    addNodeView() {
        return ReactNodeViewRenderer(ReactComponentView)
    },
})
