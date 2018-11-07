import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

export default class RadioGroup extends Component {
    render() {
        const { onChange, value} = this.props;

        return (
            <Form>
                <Form.Field>
                    <Radio
                        label='Вылетает'
                        name='radioGroup'
                        value='Вылетает'
                        checked={value === 'Вылетает'}
                        onChange={onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Прибывает'
                        name='radioGroup'
                        value='Прибывает'
                        checked={value === 'Прибывает'}
                        onChange={onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Любые'
                        name='radioGroup'
                        value='Любые'
                        checked={value === 'Любые'}
                        onChange={onChange}
                    />
                </Form.Field>
            </Form>
        )
    }
}