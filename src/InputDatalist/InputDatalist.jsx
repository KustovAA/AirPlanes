import React, { Fragment } from 'react'
import { Input } from 'semantic-ui-react'

const InputDatalist = ({ list, placeholder, id, onChange }) => (
    <Fragment>
        <Input list={id} placeholder={placeholder} onChange={onChange} />
        <datalist id={id}>
            {list.map((el, ndx) => (
                <option key={ndx} value={el} />
            ))}
        </datalist>
    </Fragment>
);

export default InputDatalist;