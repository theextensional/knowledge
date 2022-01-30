---
tags: []
---
# Dotenv

### Rules

The parsing engine currently supports the following rules:

-   `BASIC=basic` becomes `{BASIC: 'basic'}`
-   empty lines are skipped
-   lines beginning with `#` are treated as comments
-   empty values become empty strings (`EMPTY=` becomes `{EMPTY: ''}`)
-   inner quotes are maintained (think JSON) (`JSON={"foo": "bar"}` becomes `{JSON:"{\"foo\": \"bar\"}"`)
-   whitespace is removed from both ends of unquoted values (see more on [`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)) (`FOO= some value` becomes `{FOO: 'some value'}`)
-   single and double quoted values are escaped (`SINGLE_QUOTE='quoted'` becomes `{SINGLE_QUOTE: "quoted"}`)
-   single and double quoted values maintain whitespace from both ends (`FOO=" some value "` becomes `{FOO: ' some value '}`)
-   double quoted values expand new lines (`MULTILINE="new\nline"` becomes

```
{MULTILINE: 'new
line'}
```

## Ссылки

* 