import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert, CardGroup, CardTitle, CardText } from '../../common/components/web';

class CancelSubscriptionView extends React.Component {
  state = {
    cancelling: false,
    errors: null
  };

  onClick = async () => {
    this.setState({ cancelling: true });
    const { errors } = await this.props.cancel();
    if (errors) {
      this.setState({
        cancelling: false,
        errors
      });
    }
  };

  render() {
    const { loading, active } = this.props;
    const { errors } = this.state;

    if (loading) return <p>Loading...</p>;

    return (
      <CardGroup>
        <CardTitle>Subscription</CardTitle>
        <CardText>
          {active && (
            <Button color="danger" onClick={this.onClick} disabled={this.state.cancelling}>
              Cancel Subscription
            </Button>
          )}
          {!active && <span>You do not have a subscription.</span>}
          {errors && <Alert color="error">{errors}</Alert>}
        </CardText>
      </CardGroup>
    );
  }
}

CancelSubscriptionView.propTypes = {
  cancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  active: PropTypes.bool
};

export default CancelSubscriptionView;
