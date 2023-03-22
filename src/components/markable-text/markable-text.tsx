import { FC, Fragment, ReactElement, useCallback } from 'react';
import  { v4 } from 'uuid';

import classes from './markable-text.module.scss'

interface IProps{
    string: string,
    searchString: string,
}

const MarkableText : FC<IProps> = ({ string, searchString } : IProps) => {

    const makeMarkableText = useCallback((str : string) : string | ReactElement[] => {
        if(searchString === '') return str;
        const regexString = searchString.split(' ').join('|');

        const search = new RegExp(`(${regexString})`, 'gi');

        const sequence : ReactElement[] = str.split(search)
                                            .filter(seqStr => seqStr !== '')
                                            .map(element => search.test(element)
                                                ? <mark key={v4()} className={classes.mark}>{element}</mark>
                                                : <Fragment key={v4()}>{element}</Fragment>
                                            )

        return sequence;
    }, [searchString])

    return <Fragment>{makeMarkableText(string)}</Fragment>;
};

export { MarkableText };
