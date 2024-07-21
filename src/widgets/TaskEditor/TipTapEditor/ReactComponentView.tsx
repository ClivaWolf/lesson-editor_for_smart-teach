import {NodeViewWrapper} from '@tiptap/react'
import {Question} from '../../../shared/types/LessonType'
import {MonoQuestion} from "./Questions/Mono/Mono.tsx";

export default function ReactComponentView(props) {
    const {node} = props
    const {content}: Question = node.attrs

    switch (content.type) {
        case 'mono':
            return (
                <NodeViewWrapper className="react-component">
                    <MonoQuestion question={content}/>
                </NodeViewWrapper>
            )
        default:
            return null
    }
}