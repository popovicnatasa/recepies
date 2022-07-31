import '../App.css';
import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import PaginationMui from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Pagination(props){
    const {
        onPageChange,
        totalCount,
        currentPage
      } = props;

    return (
        <Stack spacing={2}>
          <PaginationMui count={totalCount} page={currentPage} onChange={(e, value) => onPageChange(value)} variant="outlined" shape="rounded" />
        </Stack>
      );

}

export default Pagination;