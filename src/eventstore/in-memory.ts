import { projectEvents } from './projector'
import { Event, EventStore, EventStream, StreamProjector } from './types'

class InMemoryEventStream<E extends Event> implements EventStream<E> {
    private readonly events: E[] = []

    public async addEvent(event: E): Promise<void> {
        this.events.push(event)
    }

    public async project<T>(initialValue: T, projector: StreamProjector<T, E>): Promise<T> {
        return projectEvents<E, T>(initialValue, this.events, projector)
    }
}

class InMemoryEventStore implements EventStore {
    private readonly streams = new Map<string, InMemoryEventStream<Event>>()

    public stream<E extends Event>(name: string): EventStream<E> {
        if (!this.streams.has(name)) {
            this.streams.set(name, new InMemoryEventStream<E>())
        }
        return this.streams.get(name) as unknown as EventStream<E>
    }
}

export const inMemoryEventStore = async (): Promise<EventStore> => {
    return new InMemoryEventStore()
}
