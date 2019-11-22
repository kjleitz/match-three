import invert from './invert';

const foo: string = 'wait, dude'; // eslint-disable-line @typescript-eslint/no-inferrable-types

console.log(`${foo}... is that ${invert(false)}?`);
