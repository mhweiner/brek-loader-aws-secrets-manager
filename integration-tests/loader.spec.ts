import {test} from 'kizu';
import {awsSecret} from '../src/index';

test('awsSecret loader is defined and callable', (assert) => {

    assert.equal(typeof awsSecret, 'function', 'awsSecret should be a function');

});
