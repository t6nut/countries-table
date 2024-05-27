import React, { useState, useRef, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
    }
  }
`;

const App: React.FC = () => {
  const [filter, setFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    } 
  }, []);

  const { loading, error, data } = useQuery(GET_COUNTRIES);


  const filteredCountries = data?.countries?.filter((country) =>
    country.code.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Countries Table
      </Typography>

      <TextField 
        label="Filter by Country Code"
        placeholder="Filter by country code"
        value={filter}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
      />

      <TableContainer component={Paper}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8",
              zIndex: 1,
            }}
            >
            <CircularProgress />
          </div>
        )}
        {!loading && data && data.countries && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Country Name</TableCell>
                <TableCell>Country Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCountries?.map((country: any) => (
                <TableRow key={country.code}>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>{country.code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!loading && !data?.countries && ( // Data loaded, but no countries
          <Typography>No countries found.</Typography>
        )}

        {error && (
          <Typography color="error">Error: {error.message}</Typography>
        )}
      </TableContainer>
    </div>
  );
};


export default App;