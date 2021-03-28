import { helper } from '@ember/component/helper';

function wrap(args) {
  console.log("this is a test");
}

export default helper(wrap);
