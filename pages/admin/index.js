import { Input, MenuItem } from "@material-ui/core";
import { GraphQLClient, gql  } from 'graphql-request';
import Link from "next/link";
import { useState } from "react";

  import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

export const getStaticProps = async () => {
  const endpoint = process.env.PREVIEW_CH_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint);
  graphQLClient.setHeader("Authorization", "Apikey 8626cf56-e364-4fd1-4fe0-311e23ac6355")
  


  const query = gql`{
      admin {
   accesses{
      edges {
        node {
          accessData {
            name
            isActive
            code
          }
          error {
            code
            type
            description
          }
        }
      }
    }
  }
 }`
  
  const data = await graphQLClient.request(query)
  return {
    props: {   
      data
    }
  }
}

const filterData = "";
const filter = "";

const Admin = ({ data }) => {
  console.log("from admin", data)
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
  setInput(e.target.value)
  }
  
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

   return (
     <>
        <p>Admin List of Access</p>
       <Button> <Link href="/">← Back</Link></Button>
       
        <div>
         <Input style={{border: "1px solid grey"}}
            defaultValue={input}
            onChange={(e) => {
              handleChange(e)
            }} 
           name="Input" />
         <Button>Submit</Button>
       </div>
        <hr />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
             <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="right">Code&nbsp;()</StyledTableCell>
            <StyledTableCell align="right">Active&nbsp;()</StyledTableCell>
                    </TableRow>
        </TableHead>
        <TableBody>
          {data.admin.accesses.edges.map((row) => (
            <StyledTableRow key={row.node.accessData.name}>
             <StyledTableCell align="left">{row.node.accessData.name}</StyledTableCell>
              <StyledTableCell align="right">{row.node.accessData.code}</StyledTableCell>
              <StyledTableCell align="right">{row.node && row.node.accessData.isActive ? "Yes" : "No"}</StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}

export default Admin;