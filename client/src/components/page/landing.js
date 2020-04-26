import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';

const Landing = (props) => {
  return (
    <section className="hero is-fullheight-with-navbar is-primary is-bold">
      <div className="hero-body">
        {/* <div class="tile is-ancestor">
          <div class="tile is-vertical is-5 has-background-primary"></div>
        </div> */}
        <div className="container has-text-centered">
          <h1 className="title is-1">Emaily</h1>
          <h2 className="subtitle">Collect feedback from your users!</h2>
        </div>
      </div>
    </section>
  );
};

export default Landing;
