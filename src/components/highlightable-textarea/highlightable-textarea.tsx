import { ChangeEvent, FC, useRef, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { MarkableText } from '../markable-text/markable-text';

import classes from './highlightable-textarea.module.scss';

interface IProps{
    name: string,
    text?: string,
    register: UseFormRegister<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
    onChange: (e : ChangeEvent<HTMLTextAreaElement>) => void,
    tagList: string,
}

export const HighlightableTextarea : FC<IProps> = ({name, text='', register, onChange, tagList} : IProps) => {
    const refTextarea = useRef<HTMLTextAreaElement | null>(null);
    const refUnderlay = useRef<HTMLPreElement>(null);
    const { ref, ...rest } = register(name, {onChange: onChangeHandler});
    const [underlayText, setUnderlayText] = useState<string>(text);

    function onChangeHandler(e : ChangeEvent<HTMLTextAreaElement>) : void {
        let textSample = e.target.value;

        if(textSample.endsWith('\n')){
            textSample+=' ';
        }
        setUnderlayText(textSample);
        onChange(e);
    }

    const onScrollHandler = () : void => {
        if(refUnderlay && refUnderlay.current && refTextarea && refTextarea.current){
            refUnderlay.current.scrollTop = refTextarea.current.scrollTop;
        }
    };

    return (
        <div className={classes.input}>
            <textarea className={classes.textarea} placeholder='Enter note text' {...rest} ref={(e) => {
                ref(e);
                refTextarea.current = e;
            }} onScroll={onScrollHandler}/>
            <pre className={classes.underlay} ref={refUnderlay}>
                <MarkableText string={underlayText} searchString={tagList}/>
            </pre>
        </div>
    );
};
