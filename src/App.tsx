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

  interface Country {
    name: string;
    code: string;
  }

  const { loading, error, data } = useQuery<
  { countries: Country[]}
  >(GET_COUNTRIES);


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
        InputProps={{
          inputRef: inputRef
        }}
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
        {!loading && data?.countries && filteredCountries?.length! > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Country Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Country Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCountries?.map((country: any, index: number) => (
                <TableRow key={country.code} sx={{ bgcolor: index % 2 === 0 ? '#f5f5f5' : 'transparent' }}>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>{country.code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!loading && data?.countries && filteredCountries?.length! === 0 && ( // Data loaded, but no countries
          <TableRow>
            <TableCell>
              <Typography>No countries found.</Typography>
            </TableCell>
          </TableRow>
        )}

        {error && (
          <TableRow>
            <TableCell>
              <Typography color="error">Error: {error.message}</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableContainer>
    </div>
  );
};


export default App;