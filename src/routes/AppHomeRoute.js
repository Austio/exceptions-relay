// @flow

import Relay from 'react-relay';

export default {
  developers: () => Relay.QL`query { developers(first: 10) }`,
};
