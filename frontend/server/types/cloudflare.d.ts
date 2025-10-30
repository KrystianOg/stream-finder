import type { KVNamespace } from '@cloudflare/workers-types'

export interface Env {
    KV: KVNamespace
}

declare module 'h3' {
    interface H3EventContext {
        cloudflare?: {
            env?: Env
            context?: ExecutionContext
        }
    }
}
