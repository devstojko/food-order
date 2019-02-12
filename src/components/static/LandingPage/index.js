import React from 'react';
import './LandingPage.scss';

const LandingPage = () => (
  <div className="container">
    <div className="landing">
      <h1 className="title-primary">food-order</h1>

      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </div>
  </div>
);

const LoremIpsum = () => (
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
    pariatur nam alias vero quae iste eveniet sit, recusandae earum
    necessitatibus dignissimos! Laudantium voluptatibus reiciendis voluptatem
    distinctio atque dolor id sint. Lorem ipsum dolor sit amet consectetur
    adipisicing elit. Blanditiis, pariatur nam alias vero quae iste eveniet sit,
    recusandae earum necessitatibus dignissimos! Laudantium voluptatibus
    reiciendis voluptatem distinctio atque dolor id sint.
  </p>
);

export default LandingPage;
