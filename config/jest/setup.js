import 'regenerator-runtime';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorageMock from './mocks/localStorage';

configure({ adapter: new Adapter() });

global.localStorage = localStorageMock;
