import React, { Component } from 'react';
import axios from 'axios';

const TITLE = 'React GraphQL GitHub Client';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ca43968afc198e8146242db6f333fb2b46b12676`,
  },
});

const GET_ORGANIZATION = `
  {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;



class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null
  };

  componentDidMount() {
    this.onFetchFromGitHub();
  }

  onChange = e => {
    this.setState({ path: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
  };

  onFetchFromGitHub = async () => {
    try {

      const result = await axiosGitHubGraphQL
        .post('', { query: GET_ORGANIZATION });
      this.setState(() => ({
        organization: result.data.data.organization,
        errors: result.data.errors
      }));
      console.log('organization', this.organization)
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { path, organization } = this.state;

    return (
      <div>
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
        </label>
          <input
            id="url"
            type="text"
            onChange={this.onChange}
            style={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>

        <hr />
        {organization ? (
          <Organization organization={organization} />
        ) : (
            <p>No information yet ...</p>
          )
        }
      </div>
    );
  }
}

const Organization = ({ organization }) => (
  < div >
    <p>
      <strong>Issues from Organization: </strong>
      <a href={organization.url}>{organization.name}</a>
    </p>
  </div >
);

export default App;