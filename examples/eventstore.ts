import {Event, StreamProjector, inMemoryEventStore} from "../src/eventstore";

type AddEvent = Event<'add', { addend: number }>
type SubstractEvent = Event<'substract', { subtrahend: number }>
type MultiplyEvent = Event<'multiply', { multiplicant: number }>

type OperatorEvent = AddEvent | SubstractEvent | MultiplyEvent

const operatorProjector: StreamProjector<number, OperatorEvent> = {
    add: (eventData, current) => current + eventData.addend,
    substract: (eventData, current) => current - eventData.subtrahend,
    multiply: (eventData, current) => current * eventData.multiplicant
}

////

const main = async () => {
    const store = await inMemoryEventStore()
    const stream = store.stream<OperatorEvent>('test-stream');
    await stream.addEvent({ type: 'add', data: { addend: 2 } })
    await stream.addEvent({ type: 'multiply', data: { multiplicant: 3 } })
    await stream.addEvent({ type: 'substract', data: { subtrahend: 1 } })
    const result = await stream.project(0, operatorProjector)
    console.log({ result })
}

void main()
