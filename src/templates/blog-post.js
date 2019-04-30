/* eslint-disable react/destructuring-assignment */
/* eslint react/prop-types: 0 */

// Components
import React, { Component } from 'react';
import { graphql } from 'gatsby';

import { parseChineseDate } from '../api';

import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import SEO from '../components/SEO';

import Header from '../components/Header';
// import TableOfContent from '../components/TableOfContent';
import ShareBox from '../components/ShareBox';
import Lmao from '../components/Lmao';

import { config } from '../../data';

// Styles
import './blog-post.scss';

const { name, iconUrl } = config;

const bgWhite = { padding: '10px 30px', background: 'white' };

// Prevent webpack window problem
// const isBrowser = typeof window !== 'undefined';
const { DiscussionEmbed } = require('disqus-react');

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.state = {
      isLmao: false
    }
  }

  componentDidMount() {
  }

  setLmao = e => {
    e.preventDefault();
    const { isLmao } = this.state;
    this.setState({ isLmao: !isLmao })
    console.log(this.state);
  }

  render() {
    const { node } = this.data.content.edges[0];

    const {
      html, frontmatter, fields, excerpt,
    } = node;

    const { slug } = fields;

    const {
      date, headerImage, title, id,
    } = frontmatter;

    const disqusShortname = 'https-japanese-toilets-netlify-com';
    const disqusConfig = {
      identifier: id,
      title,
    };

    return (
      <div className="row post order-2">
        <Header
          img={headerImage || 'https://i.imgur.com/M795H8A.jpg'}
          title={title}
          authorName={name}
          authorImage={iconUrl}
          subTitle={parseChineseDate(date)}
        />
        <Sidebar />
        <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 order-10 content">
          <Content post={html} />
          <div className="m-message" style={bgWhite}>
            Comment Below
          </div>
          <DiscussionEmbed id="comments" shortname={disqusShortname} config={disqusConfig} />
        </div>

        <ShareBox hasCommentBox handleClick={this.setLmao} />

        <SEO
          title={title}
          url={slug}
          siteTitleAlt="Miguel's blog"
          isPost={false}
          description={excerpt}
          image={headerImage || 'https://i.imgur.com/M795H8A.jpg'}
        />
      </div>
    );
  }
}

export const pageQuery = graphql`
  fragment post on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      id
      title
      slug
      date
      headerImage
    }
  }

  query BlogPostQuery($index: Int) {
    content: allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      skip: $index
      limit: 1
    ) {
      edges {
        node {
          id
          html
          tableOfContents
          excerpt
          ...post
        }

        previous {
          ...post
        }

        next {
          ...post
        }
      }
    }
  }
`;

export default BlogPost;
