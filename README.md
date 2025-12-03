## print-err

A small utility for printing the **Err** object in Node CLI.

`Err` (from the [https://github.com/benpptung/err](https://github.com/benpptung/err) package) is an enriched error type that keeps:

* `original` — context variables captured at the moment an error happened
* `msgs` — accumulated messages when errors are re-thrown
* custom props — safe properties merged by `OnErr`

`print-err` makes these information **easy to read** during Node development.

It prints:

1. message
2. full stack (with recursive `.cause()`)
3. all extra properties (`original`, `msgs`, custom props)
4. colorized output (chalk)
5. deep objects via `util.inspect`

This is especially useful when throwing `Err` with context, and re-throwing it with more context using `OnErr`.

---

## Install

```sh
pnpm add print-err
```

---

## Usage

```js
import { Err, OnErr } from "err"

function loadData(file) {
  try {
    const payload = JSON.parse(fs.readFileSync(file, "utf8"))
    if (Object(payload) !== payload) {
      throw Err('invalid payload', { payload }) // what the payload did we got???
    }
    return payload

  } catch (e) {
    printErr(OnErr(e, { file })) // always append context before rethrow
  }
}
```

Works with both:

* `Err` / `OnErr`

---

## API

### `printErr(err)`

Pretty-print the error, including all custom props.


---


## License

MIT

