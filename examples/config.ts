const config = () => ({
    port: Number.parseInt(process.env['PORT'] ?? '1234'),
    pubsubTopic: process.env['PUBSUB_TOPIC'] ?? 'default-topic',
    usePubsubEmulator: process.env['USE_PUBSUB_EMULATOR'] === 'true'
})

type Config = ReturnType<typeof config>

const testConfig: Config = {
    port: 6666,
    pubsubTopic: 'test',
    usePubsubEmulator: false
}

console.log({ testConfig })
