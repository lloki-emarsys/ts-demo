import { Event, StreamProjector } from './types'

export const projectEvents =
    <E extends Event, T>(
        initialValue: T,
        events: readonly E[],
        projector: StreamProjector<T, E>
    ): T => {
        let current = initialValue
        for (const event of events) {
            current = projector[event.type as E['type']](event.data as unknown as never, current)
        }
        return current
    }
