# SimpleFlow

Simple flow library to chain and run functions with asynchronous calls. WIP.

## Installation

Via npm on Node:

```
npm install simpleflow
```

## Usage

Reference in your program:

```js
var sf = require('simpleflow');
```

Create and run a sequence of synchronous functions:
```js
var seq = sf.sequence(
    function (data) {
        console.log(data);
        return data + 1;
    },
    function (data) {
        console.log(data);
        return data + 1;
    },
    function (data) {
        console.log(data);
        return data + 1;
    }
);

seq.run(1);
```
Output
```
1
2
3
```
In this way, you can define the sequence once, and run it many times with different initial data.

Create and run a sequence of asynchronous functions:
```js
var seq = sf.sequence(
    function (data, next) {
        console.log(data);
        next(null, data + 1);
    },
    function (data, next) {
        console.log(data);
        next(null, data + 1);
    },
    function (data, next) {
        console.log(data);
        next(null, data + 1);
    }
);

seq.run(1);
```
Output
```
1
2
3
```
You can mix both kind of functions:
```js
var seq = sf.sequence(
    function (data) {
        console.log(data);
        return data + 1;
    },
    function (data, next) {
        console.log(data);
        next(null, data + 1);
    },
    function (data, next) {
        console.log(data);
        next(null, data + 1);
    }
);

seq.run(1);
```
Output
```
1
2
3
```

The return of `run` is a future object with `success` and `fail` associated functions:
```js
var seq = sf.sequence(
    function (data, next) {
        next(null, data + 1;
    },
    function (data, next) {
        next(null, data + 1);
    },
    function (data, next) {
        next(null, data + 1);
    }
);

seq.run(1).success(
    function (data) {
        console.log('result:', data);
    }
).fail(
    function (err) {
        console.log('error:', err);
    }
);
```
Output
```
result: 4
```
So, you can define `success` and `fail` behaviour in your own scope. You can define the sequence once, and run
it many times, with different initial data and `success`, `fail` context. Partial example, an action in a controller:

```js
var seq = sf.sequence(step1, step2, step3);

// ...

function index(req, res) {
    seq.run(req.params.id)
        .success(function (data) {
            res.render('index', { model: data });
        })
        .fail(function (err) {
            res.render('error', { error: err });
        });
}
```

## Development

```
git clone git://github.com/ajlopez/SimpleFlow.git
cd SimpleFlow
npm install
npm test
```

## Samples

TBD

## Versions

- 0.0.1: Published
- 0.0.2: In progress

## License

MIT

## References
## Contribution

Feel free to [file issues](https://github.com/ajlopez/SimpleFlow) and submit
[pull requests](https://github.com/ajlopez/SimpleFlow/pulls) — contributions are
welcome<

If you submit a pull request, please be sure to add or update corresponding
test cases, and ensure that `npm test` continues to pass.

