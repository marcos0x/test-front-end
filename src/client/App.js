import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Row, Col } from 'react-bootstrap';

import Routes from './routes';
import SearchBox from './components/molecules/SearchBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navbar collapseOnSelect fixedTop>
            <Row>
              <Col md={1} xs={2} mdOffset={1}>
                <Navbar.Brand>
                  <Link to="/">
                    <img
                      id="logo"
                      src={`${process.env.PUBLIC_URL}/images/Logo_ML.png`}
                      alt="MercadoLibre"
                    />
                  </Link>
                </Navbar.Brand>
              </Col>
              <Col md={9} xs={9}>
                <SearchBox id="searchBox" />
              </Col>
            </Row>
          </Navbar>
        </header>
        <main className="container">
          <Row>
            <Col md={10} mdOffset={1}>
              <Routes />
            </Col>
          </Row>
        </main>
        <footer />
      </div>
    );
  }
}

export default App;
