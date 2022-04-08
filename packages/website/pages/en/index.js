const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock;
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a
          className="big-button"
          href={this.props.href}
          target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props =>
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">
        {props.children}
      </div>
    </div>
  </div>;

const Logo = ({src}) =>
  <div className="logo">
    <img
      src={src}
      onError={() => {
        this.onerror = null;
        this.src = imgUrl('logo.png');
      }}
      alt="React Ape Logo"
    />
  </div>;

const TagLine = () => <div className="tagline">Build apps using React Ape</div>;

const PromoSection = props =>
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">
        {props.children}
      </div>
    </div>
  </div>;

class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <Logo src={imgUrl('logo.svg')} />
          <TagLine />
          <PromoSection>
            <Button href={docUrl('getting-started.html', language)}>
              Get Started
            </Button>
            <Button href={docUrl('components-and-apis.html', language)}>
              Learn the Basics
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const DefinitionCallout = () =>
  <div className="paddingBottom">
    <Container>
      <div className="blockElement">
        <div className="blockContent">
          <h1>Build UI interfaces using HTML5 Canvas/WebGL and React</h1>
          <p>
            React Ape lets you build Canvas apps using React. React Ape uses the
            same design as React, letting you compose a rich UI from declarative
            components.
          </p>
          <MarkdownBlock>
            {`\`\`\`javascript
import React, { Component } from 'react';
import { Text, View } from 'react-ape';

class ReactApeComponent extends Component {
  render() {
    return (
      <View>
        <Text>
          Render this text on Canvas
        </Text>
        <Text>
          You just use React Ape components like 'View' and 'Text',
          just like React Native.
        </Text>
      </View>
    );
  }
}
\`\`\``}
          </MarkdownBlock>
          <br />
          <br />
        </div>
      </div>
    </Container>
  </div>;

const FirstFeatureCallout = () =>
  <div className="container paddingBottom paddingTop lightBackground">
    <div className="wrapper">
      <div className="blockElement imageAlignSide imageAlignLeft twoByGridBlock">
        <div className="blockImage">
          <img src={imgUrl('learn-once.png')} />
        </div>
        <div className="blockContent">
          <h2>Learn Once, Write Anywhere</h2>
          <p>
            React Ape follow React Native's concept of "Learn Once Write
            Anywhere". So, if you have even a little bit of React experience you
            should be able to create things faster.
          </p>
          <p>
            Each platform have a different environment and look, with that in
            mind React Ape try to allow engineers to build applications for
            whatever platform they choose, without needing to learn a
            fundamentally different set of technologies for each.
          </p>
        </div>
      </div>
    </div>
  </div>;

const SecondFeatureCallout = () =>
  <div className="container paddingBottom paddingTop">
    <div className="wrapper">
      <div className="blockElement imageAlignSide imageAlignRight twoByGridBlock">
        <div className="blockContent">
          <h2>
            Inspect and debug apps based on HTML5 Canvas using React Developer
            Tools
          </h2>
          <p>
            React Ape support in production and development environment you use
            the React Developer Tools, which is a tool that allows you to
            inspect a React tree, including the component hierarchy, props,
            state, and more.
          </p>
        </div>
        <div className="blockImage">
          <img src={imgUrl('developer-tools.png')} />
        </div>
      </div>
    </div>
  </div>;

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.users.filter(user => user.pinned).map(user =>
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  );

  return (
    <div className="productShowcaseSection paddingTop paddingBottom">
      <h2>Who is Using This?</h2>
      <p>This project is used by all these people and companies</p>
      <div className="logos">
        {showcase}
      </div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

const Examples = props =>
  <div className="examplesSection">
    <Container>
      <h1>Check some Examples using React Ape</h1>
      <p>
        Those are some examples of React Ape, but{' '}
        <a
          href="https://github.com/raphamorim/react-ape/issues/new"
          target="_blank">
          feel free to add an example.
        </a>
      </p>
      <h2>Hello World:</h2>
    </Container>
    <div className="blockElement">
      <div className="blockContent">
        <iframe
          src="https://codesandbox.io/embed/zrqy570pjp?hidenavigation=1"
          style={{
            width: '100%',
            height: '500px',
            border: 0,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      </div>
    </div>

    <Container>
      <h2>Netflix ListView:</h2>
    </Container>
    <div className="blockElement">
      <div className="blockContent">
        <iframe
          src="https://codesandbox.io/embed/2xzk61702r?hidenavigation=1"
          style={{
            width: '100%',
            height: '500px',
            border: 0,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      </div>
    </div>
  </div>;

class Index extends React.Component {
  render() {
    const language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <DefinitionCallout />
          <FirstFeatureCallout />
          <SecondFeatureCallout />
          <Examples language={language} />
          {/* <Showcase language={language} /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
