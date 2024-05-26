import React, { useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';

const COUNTRIES_QUERY = gql`
  query Countries {
    countries {
      code
      name
    }
  }
`;

const App: React.FC = () => {
  const [filter, setFilter] = useState('');
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }

  const filteredCountries = data?.countries?.filter((country) => 
    country.code.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Countries Table</h1>
      <input 
        type="text"
        placeholder="Filter by country code"
        value={filter}
        onChange={handleFilterChange} 
      />
      <table>
        <thead>
          <tr>
            <th>Country Name</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          {filteredCountries?.map((country) => (
            <tr key={country.code}>
              <td>{country.name}</td>
              <td>{country.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;