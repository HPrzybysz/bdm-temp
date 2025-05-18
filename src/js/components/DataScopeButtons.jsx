import React, { useRef } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../scss/DataScopeButtons.scss';
import DataGridControlPanel from './DataGridControlPanel';
import QuarterlyDataGrid from './quarterlyDataGrid';
import MonthlyDataGrid from './monthlyDataGrid';

const DataScopeButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const yearlyDataGridRef = useRef(null);
  const quarterlyDataGridRef = useRef(null);
  const monthlyDataGridRef = useRef(null);

  const currentView = location.pathname.split('/').pop() || '';

  const handleViewChange = (view) => {
    navigate(`/${view}`, { replace: true });
  };

  return (
    <Box className="data-scope-container">
      <ButtonGroup
        variant="contained"
        aria-label="data scope buttons"
        className="data-scope-buttons"
      >
        <Button
          onClick={() => handleViewChange('yearly')}
          className={currentView === 'yearly' ? 'active' : ''}
          variant="outlined"
        >
          Roczne
        </Button>
        <Button
          onClick={() => handleViewChange('quarterly')}
          className={currentView === 'quarterly' ? 'active' : ''}
          variant="outlined"
        >
          Kwartalne
        </Button>
        <Button
          onClick={() => handleViewChange('monthly')}
          className={currentView === 'monthly' ? 'active' : ''}
          variant="outlined"
        >
          Miesięczne
        </Button>
      </ButtonGroup>
      <Box className="view-content">
        {(currentView === 'yearly' || currentView === '') && (
          <DataGridControlPanel ref={yearlyDataGridRef} />
        )}
        {currentView === 'quarterly' && (
          <QuarterlyDataGrid ref={quarterlyDataGridRef} />
        )}
        {currentView === 'monthly' && <MonthlyDataGrid ref={monthlyDataGridRef} />}
      </Box>
    </Box>
  );
};

export default DataScopeButtons;