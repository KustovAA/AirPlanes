import React, { Component } from 'react';
import {Table, Container, Checkbox} from 'semantic-ui-react';
import InputDatalist from './../InputDatalist';
import RadioGroup from './../RadioGroup';
import * as flights from './../flights';

class App extends Component {
    constructor(props) {
        super(props);

        const data = [];
        for (let it in flights.default) {
            if (flights.default[it].length && flights.default[it].length >= 13) {
                const delayed = Boolean(Math.floor(Math.random() * 2));
                data.push({
                    scrAirport: {name: 'Вылет', value: flights.default[it][11]},
                    dstAirport: {name: 'Прилет', value: flights.default[it][12]},
                    type: {name: 'Направление', value: flights.default[it][12] === 'SVO' ? 'Прибывает' : 'Вылетает'},
                    delayed: {name: 'Статус', boolValue: delayed, value: delayed ? 'Задерживается' : 'Прибывает вовремя'},
                    flightNumber: {name: 'Номер рейса', value: flights.default[it][13]},
                });
            }
        }

        this.state = {
            flights: data,
            tableTypes: Object.keys(data[0]),
            chosenFlightNumber: '',
            chosenFlightType: 'Любые',
            showOnlyDelayed: false,
        }
    }

    handleOnChange(name, e, { value, checked }) {
        this.setState({
            [name]: value ? value : checked,
        })
    }

    render() {
    const { flights, tableTypes, chosenFlightNumber, chosenFlightType, showOnlyDelayed } = this.state;

    return (
        <Container>
            <InputDatalist onChange={this.handleOnChange.bind(this, 'chosenFlightNumber')} id={'flightNumber'} list={flights.map((it) => it.flightNumber.value)}  placeholder={'Номер рейса'}/>
            <RadioGroup value={chosenFlightType} onChange={this.handleOnChange.bind(this, 'chosenFlightType')} />
            <Checkbox
                label='Только задержанные'
                checked={showOnlyDelayed === true}
                onChange={this.handleOnChange.bind(this, 'showOnlyDelayed')}
            />
            <Table inverted>
                <Table.Header>
                    <Table.Row>
                        {tableTypes.map(it => (
                            <Table.HeaderCell key={flights[0][it].name}>{flights[0][it].name}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {flights
                        .filter((it) => showOnlyDelayed ? it.delayed.boolValue : true)
                        .filter((it) => {
                            if (!['Прибывает', 'Вылетает']
                                .includes(chosenFlightType) || chosenFlightType === ''
                            ) {
                                return true;
                            } else {
                                return it.type.value === chosenFlightType;
                            }
                        })
                        .filter((it) => {
                            if (!flights
                                .map((it) => it.flightNumber.value)
                                .includes(chosenFlightNumber) || chosenFlightNumber === ''
                            ) {
                                return true;
                            } else {
                                return it.flightNumber.value === chosenFlightNumber;
                            }
                        })
                        .map((it, ndx) => (
                            <Table.Row key={ndx}>
                                {Object.keys(it).map((type) => (
                                    <Table.Cell key={type}>{it[type].value}</Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </Container>
    );
  }
}

export default App;
