/* eslint-disable global-require */
import React from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import Page from '../Page/PageComponent';
import DynamicHtmlTag from '../Common/DynamicHtmlTag';
import { LoadData, InsertData } from './LocalDb';
import Switch from 'react-toggle-switch'
import "react-toggle-switch/dist/css/switch.min.css"
export default class Home extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      switchOn: false
    }
    this.toggle = this.toggle.bind(this);
    this.insertData = this.insertData.bind(this);
  }
  componentDidMount() {
    LoadData((data) => {
      this.state.data = data;
      this.setState({ data: this.state.data });
    })
  }

  toggle() {
    if (this.state.switchOn) {
      this.state.switchOn = false;
      LoadData((data) => {
        this.state.data = data;
        this.setState({ switchOn: this.state.switchOn, data: this.state.data });
      })
    } else {
      this.state.switchOn = true;
      this.state.data = this.props.viewer.blocks;
      this.setState({ switchOn: this.state.switchOn, data: this.state.data });
    }

  }
  insertData() {
    InsertData(data => {
      this.state.data = data;
      this.setState({ data: this.state.data });
    });
  }
  render() {
    var switchtext;
    if (this.state.switchOn) {
      switchtext = 'Online';
    }
    else {
      switchtext = 'Offline';
    }
    console.log(this.state.data);
    return (
      <div>
        <Page heading='Blocks'>
          <Grid>
            <Cell col={2}>
              <Switch onClick={this.toggle}
                on={this.state.switchOn}
              /><span>{switchtext}</span>
            </Cell>
            <Cell col={2}>
              <Button primary raised accent onClick={this.insertData}>Add DefautlData</Button>
            </Cell>
            <Cell col={12}>
              <DynamicHtmlTag data={this.state.data} />
            </Cell>
          </Grid>
        </Page>

      </div>
    );
  }
}
