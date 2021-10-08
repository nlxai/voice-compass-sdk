The package API has been largely the same in pre-1.0.0 versions.

## 1.0.0 (draft)

* Creating a client (`create`)
  * `language` has been renamed to `languageOverride`, as deployed assistants define their own language. Overriding the language is now an advanced use case.
  * `voice` has been renamed to `voiceOverride`, as deployed assistants define their own voice. Overriding the voice is now an advanced use case.
* Step updates (`client.updateStep`)
  * updating steps now returns a promise resolving in `{ end?: boolean; escalate?: boolean; error?: string }`. You can change frontend state accordingly.
  * the `end` parameter has been renamed to `forceEnd`, as `end` nodes are defined by the deployed assistant. Forcing an `end` is an advanced use case, or it might be useful as a debugging tool.
  * the `escalate` parameter has been renamed to `forceEscalate`, as `escalate` nodes are defined by the deployed assistant. Forcing an `escalate` is an advanced use case, or it might be useful as a debugging tool.
