import React from 'react';
import styles from './Page.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Layout, Header, Navigation, Drawer, Footer, FooterSection, FooterLinkList, Content, MenuItem } from 'react-mdl';
export default class Feature extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    heading: PropTypes.string.isRequired
  };
  constructor() {
    super()
    this.state = {
      left: false
    }
  }

  render() {
    var isLogout = 'none';
    if (typeof this.props.isLogout != "undefined") {
      isLogout = 'block'
    }
    let items = [];
    let title = 'Index will be loaded here';
    if (typeof this.props.index != "undefined" && typeof this.props.index.content != "undefined") {
      title = 'Index';
      items = this.props.index.content;
    }

    return (
      <div className="demo-big-content">
        <Layout fixedHeader>
          <Header
            title={<span style={{ color: '#ddd' }}><strong>Telestudent, Powered by Venture Things LLC.</strong></span>}>
            {typeof this.props.isLogout != "undefined" ?
              <Navigation>
                <Link to="/books">Home</Link>
                <Link to="/">Logout</Link>
              </Navigation> : null
            }
          </Header>
          <Drawer fixedDrawer title={title} open={this.props.left} onRequestClose={this.props.toggleDrawer}>
            <Navigation>
              {items.map((item) =>
                <MenuItem key={item.id} id={item.page} onClick={this.props.handleIndex} title={item.blocks}>{item.blocks}</MenuItem>
              )}
            </Navigation>
          </Drawer>
          <Content >
            {this.props.children}
          </Content>
          <Footer size="mini">
            <p>&copy; 2017 ,Venture Things LLC.</p>
          </Footer>
        </Layout>
      </div>
    );
  }
}
