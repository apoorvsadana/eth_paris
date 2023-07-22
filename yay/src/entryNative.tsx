/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from '../app.json';
import Wrapper from './bootstrap/Wrapper/Wrapper';

AppRegistry.registerComponent(appName, () => Wrapper);
