# `@christianjuth/ts-cli-generator`

### Create a new CLI project

```bash
npx @christianjuth/ts-cli-generator
```


### Demo
![demo video](https://s10.gifyu.com/images/ezgif-2-2d9459aa6c.gif)

### How it works

The following `index.ts` file:

```typescript
/**
 * Add two numbers
 */
function add(x: number, y: number) {
  return x + y;
}

/**
 * Get the length of a string
 */
function lengthOfString(str: string) {
  return str.length;
}

export const cli = {
  add,
  lengthOfString,
};
```

Will generate the following CLI:

```bash
name-of-cli CLI 0.0.0

Powered by @christianjuth/ts-cli-generator

Commands:
  add             	Add two numbers
  length-of-string	Get the length of a string
```

```bash
name-of-cli add
✔ param: x … 5
✔ param: y … 6
11
```

```bash
name-of-cli length-of-string
✔ param: str … hello world
11
```