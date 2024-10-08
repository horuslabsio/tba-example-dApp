export const ABI = [
  {
    "name": "core::integer::u256",
    "type": "struct",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "name": "get_current_count",
    "type": "function",
    "inputs": [],
    "outputs": [
      {
        "type": "core::integer::u256"
      }
    ],
    "state_mutability": "view"
  },
  {
    "name": "increment",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "name": "decrement",
    "type": "function",
    "inputs": [],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "kind": "enum",
    "name": "counter::counter::SimpleCounter::Event",
    "type": "event",
    "variants": []
  }
] as const