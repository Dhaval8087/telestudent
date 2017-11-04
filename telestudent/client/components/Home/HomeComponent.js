/* eslint-disable global-require */
import React from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import DynamicHtmlTag from '../Common/DynamicHtmlTag';
export default class Feature extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Page heading='Blocks'>
          <Grid>
           <DynamicHtmlTag data={this.props.viewer.blocks} />
           
          </Grid>
        </Page>

      </div>
    );
  }
}
