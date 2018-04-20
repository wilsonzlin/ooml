# Normalised DOM updates

From = Current state (even if still queued)

To = New state

## Attachment

|To ►<br>From ▼|Detached|Attached without anchor|Attached with anchor|
|---|---|---|---|
|<strong>Detached</strong>|-|No change|cancel REMOVE<br>add MOVE|
|<strong>Attached without anchor</strong>|No change|-|-|
|<strong>Attached with anchor</strong>|if MOVE<br>then cancel MOVE<br>else add REMOVE|-|-|

[ARRAY ONLY] When add MOVE or REMOVE, also add to array reinsertion queue. For all other times, remove from array reinsertion queue.
