import { Client, Configuration } from 'streaming-availability'

export const sdk = new Client(
    new Configuration({
        basePath: 'http://localhost:3000/api/streaming-api',
    })
)
